import json
import os
import sqlite3
import smtplib
from contextlib import closing
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from pathlib import Path
from typing import Any, Dict, List, Optional

from flask import Flask, jsonify, request, send_from_directory

try:
    from dotenv import load_dotenv  # type: ignore
except Exception:
    load_dotenv = None

try:
    import stripe  # type: ignore
except Exception:
    stripe = None

try:
    from twilio.rest import Client as TwilioClient  # type: ignore
except Exception:
    TwilioClient = None


BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "restaurant.db"

if load_dotenv:
    load_dotenv(BASE_DIR / ".env")

TAKEAWAY_CAPACITY_PER_SLOT = 6
SLOT_INTERVAL_MINUTES = 15
OPEN_HOUR = 11
CLOSE_HOUR = 22
MAX_SLOTS_AHEAD = 14

ORDER_STATUSES = {
    "pending_payment",
    "paid",
    "preparing",
    "ready",
    "collected",
    "cancelled",
}

MENU_SEED = [
    ("p01", "Pad Thai Poulet", "Nudeln", 8, 19.5),
    ("p02", "Green Curry Rind", "Curry", 10, 22.0),
    ("p03", "Red Curry Tofu", "Curry", 9, 20.0),
    ("p04", "Cashew Chicken", "Wok", 7, 21.0),
    ("p05", "Basilic Beef", "Wok", 8, 23.5),
    ("p06", "Tom Kha Suppe", "Suppe", 6, 12.5),
    ("p07", "Mango Sticky Rice", "Dessert", 4, 9.5),
    ("p08", "Fruehlingsrollen", "Starter", 5, 10.0),
]


def env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


def db_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with closing(db_conn()) as conn:
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS menu_items (
              id TEXT PRIMARY KEY,
              name TEXT NOT NULL,
              category TEXT NOT NULL,
              prep_minutes INTEGER NOT NULL,
              price REAL NOT NULL,
              active INTEGER NOT NULL DEFAULT 1
            )
            """
        )
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS orders (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              customer_name TEXT NOT NULL,
              customer_phone TEXT NOT NULL,
              customer_email TEXT NOT NULL,
              pickup_slot TEXT NOT NULL,
              status TEXT NOT NULL,
              subtotal REAL NOT NULL,
              load INTEGER NOT NULL,
              stripe_session_id TEXT,
              stripe_payment_intent TEXT,
              created_at TEXT NOT NULL DEFAULT (datetime('now')),
              updated_at TEXT NOT NULL DEFAULT (datetime('now'))
            )
            """
        )
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS order_items (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              order_id INTEGER NOT NULL,
              item_id TEXT NOT NULL,
              item_name TEXT NOT NULL,
              unit_price REAL NOT NULL,
              prep_minutes INTEGER NOT NULL,
              quantity INTEGER NOT NULL,
              note TEXT NOT NULL DEFAULT '',
              FOREIGN KEY(order_id) REFERENCES orders(id)
            )
            """
        )
        cur.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_orders_pickup_status
            ON orders(pickup_slot, status)
            """
        )

        cur.executemany(
            """
            INSERT OR IGNORE INTO menu_items (id, name, category, prep_minutes, price, active)
            VALUES (?, ?, ?, ?, ?, 1)
            """,
            MENU_SEED,
        )
        conn.commit()


def is_within_opening_hours(dt: datetime) -> bool:
    return OPEN_HOUR <= dt.hour < CLOSE_HOUR


def round_to_next_slot(dt: datetime) -> datetime:
    base = dt.replace(second=0, microsecond=0)
    remainder = base.minute % SLOT_INTERVAL_MINUTES
    delta = SLOT_INTERVAL_MINUTES - remainder if remainder else SLOT_INTERVAL_MINUTES
    return base + timedelta(minutes=delta)


def parse_iso_slot(value: str) -> Optional[datetime]:
    try:
        dt = datetime.fromisoformat(value)
    except ValueError:
        return None
    return dt.replace(second=0, microsecond=0)


def get_menu_map(conn: sqlite3.Connection) -> Dict[str, Dict[str, Any]]:
    cur = conn.cursor()
    rows = cur.execute(
        "SELECT id, name, category, prep_minutes, price FROM menu_items WHERE active = 1 ORDER BY category, name"
    ).fetchall()
    out: Dict[str, Dict[str, Any]] = {}
    for r in rows:
        out[r["id"]] = dict(r)
    return out


def line_load(prep_minutes: int) -> int:
    return max(1, (prep_minutes + 3) // 4)


def compute_order_from_cart(conn: sqlite3.Connection, cart: List[Dict[str, Any]]) -> Dict[str, Any]:
    menu = get_menu_map(conn)
    normalized_items = []
    subtotal = 0.0
    total_load = 0

    for raw in cart:
        item_id = str(raw.get("itemId", "")).strip()
        quantity = int(raw.get("quantity", 0))
        note = str(raw.get("note", "")).strip()
        if quantity <= 0:
            continue
        item = menu.get(item_id)
        if not item:
            raise ValueError(f"Ungultiges Gericht: {item_id}")
        line_total = item["price"] * quantity
        subtotal += line_total
        total_load += line_load(item["prep_minutes"]) * quantity
        normalized_items.append(
            {
                "item_id": item["id"],
                "item_name": item["name"],
                "unit_price": item["price"],
                "prep_minutes": item["prep_minutes"],
                "quantity": quantity,
                "note": note,
            }
        )

    if not normalized_items:
        raise ValueError("Warenkorb ist leer.")

    return {"items": normalized_items, "subtotal": round(subtotal, 2), "load": total_load}


def slot_load_map(conn: sqlite3.Connection, from_dt: datetime, until_dt: datetime) -> Dict[str, int]:
    cur = conn.cursor()
    rows = cur.execute(
        """
        SELECT pickup_slot, SUM(load) AS total_load
        FROM orders
        WHERE status IN ('pending_payment', 'paid', 'preparing', 'ready')
          AND pickup_slot >= ?
          AND pickup_slot <= ?
        GROUP BY pickup_slot
        """,
        (from_dt.isoformat(), until_dt.isoformat()),
    ).fetchall()
    return {r["pickup_slot"]: int(r["total_load"] or 0) for r in rows}


def next_available_slots(conn: sqlite3.Connection, needed_load: int) -> List[Dict[str, Any]]:
    if needed_load <= 0:
        return []

    now = datetime.now()
    probe = round_to_next_slot(now)
    if not is_within_opening_hours(probe):
        probe = probe.replace(hour=OPEN_HOUR, minute=0)
        if probe < now:
            probe += timedelta(days=1)

    end = probe + timedelta(hours=12)
    load_map = slot_load_map(conn, probe, end)
    slots = []

    for _ in range(96):
        if len(slots) >= MAX_SLOTS_AHEAD:
            break
        if is_within_opening_hours(probe):
            used = load_map.get(probe.isoformat(), 0)
            free = TAKEAWAY_CAPACITY_PER_SLOT - used
            if free >= needed_load:
                slots.append(
                    {
                        "value": probe.isoformat(),
                        "label": f"{probe.strftime('%H:%M')} ({free - needed_load} frei nach Bestellung)",
                        "freeAfterBooking": free - needed_load,
                    }
                )
        probe += timedelta(minutes=SLOT_INTERVAL_MINUTES)

    return slots


def require_admin() -> Optional[Any]:
    expected = env("ADMIN_TOKEN")
    if not expected:
        return None
    received = request.headers.get("X-Admin-Token", "")
    if received != expected:
        return jsonify({"error": "Unauthorized"}), 401
    return None


def send_email(subject: str, body: str, to_email: str) -> None:
    smtp_host = env("SMTP_HOST")
    smtp_port = int(env("SMTP_PORT", "587"))
    smtp_user = env("SMTP_USER")
    smtp_pass = env("SMTP_PASS")
    mail_from = env("MAIL_FROM")
    if not (smtp_host and smtp_user and smtp_pass and mail_from and to_email):
        return
    msg = MIMEText(body, "plain", "utf-8")
    msg["Subject"] = subject
    msg["From"] = mail_from
    msg["To"] = to_email
    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)


def send_sms(body: str, to_phone: str) -> None:
    sid = env("TWILIO_ACCOUNT_SID")
    token = env("TWILIO_AUTH_TOKEN")
    from_number = env("TWILIO_FROM_NUMBER")
    if not (sid and token and from_number and to_phone and TwilioClient):
        return
    client = TwilioClient(sid, token)
    client.messages.create(body=body, from_=from_number, to=to_phone)


def notify_customer(order: sqlite3.Row, status_label: str) -> None:
    slot_dt = parse_iso_slot(order["pickup_slot"]) or datetime.now()
    text = (
        f"Thai Express: Bestellung #{order['id']} ist {status_label}. "
        f"Abholung um {slot_dt.strftime('%H:%M')}. Total CHF {order['subtotal']:.2f}."
    )
    send_email(
        subject=f"Thai Express Bestellung #{order['id']} {status_label}",
        body=text,
        to_email=order["customer_email"],
    )
    send_sms(text, order["customer_phone"])


app = Flask(__name__, static_folder=str(BASE_DIR))


@app.route("/")
def home() -> Any:
    return send_from_directory(BASE_DIR, "index.html")


# Static asset routes so CSS/JS are served correctly by Flask
@app.route("/styles.css")
def styles() -> Any:
    return send_from_directory(BASE_DIR, "styles.css")


@app.route("/app.js")
@app.route("/admin.js")
def scripts(path: str = "") -> Any:
    # Determine which script was requested based on the current path
    script_name = request.path.lstrip("/")
    return send_from_directory(BASE_DIR, script_name)


@app.route("/success")
def success_page() -> Any:
    return send_from_directory(BASE_DIR, "success.html")


@app.route("/favicon.ico")
def favicon() -> Any:
    # Optional favicon handling; will 404 cleanly if file is missing
    if (BASE_DIR / "favicon.ico").exists():
        return send_from_directory(BASE_DIR, "favicon.ico")
    return ("", 404)


@app.route("/admin")
def admin_page() -> Any:
    return send_from_directory(BASE_DIR, "admin.html")


@app.route("/api/menu")
def api_menu() -> Any:
    with closing(db_conn()) as conn:
        rows = conn.execute(
            "SELECT id, name, category, prep_minutes, price FROM menu_items WHERE active = 1 ORDER BY category, name"
        ).fetchall()
    return jsonify([dict(r) for r in rows])


@app.route("/api/availability", methods=["POST"])
def api_availability() -> Any:
    payload = request.get_json(silent=True) or {}
    cart = payload.get("cart", [])
    with closing(db_conn()) as conn:
        try:
            computed = compute_order_from_cart(conn, cart)
        except ValueError as exc:
            return jsonify({"error": str(exc)}), 400
        slots = next_available_slots(conn, computed["load"])
    return jsonify({"neededLoad": computed["load"], "slots": slots})


@app.route("/api/public/live-orders")
def api_live_orders() -> Any:
    now = datetime.now().isoformat()
    with closing(db_conn()) as conn:
        rows = conn.execute(
            """
            SELECT pickup_slot, SUM(load) AS total_load, COUNT(*) AS total_orders
            FROM orders
            WHERE status IN ('pending_payment', 'paid', 'preparing', 'ready')
              AND pickup_slot >= ?
            GROUP BY pickup_slot
            ORDER BY pickup_slot ASC
            LIMIT 12
            """,
            (now,),
        ).fetchall()
    out = []
    for r in rows:
        slot = parse_iso_slot(r["pickup_slot"])
        out.append(
            {
                "pickupSlot": r["pickup_slot"],
                "slotLabel": slot.strftime("%H:%M") if slot else r["pickup_slot"],
                "load": int(r["total_load"] or 0),
                "orders": int(r["total_orders"] or 0),
            }
        )
    return jsonify(out)


@app.route("/api/orders/create-checkout-session", methods=["POST"])
def create_checkout_session() -> Any:
    payload = request.get_json(silent=True) or {}
    customer_name = str(payload.get("customerName", "")).strip()
    customer_phone = str(payload.get("customerPhone", "")).strip()
    customer_email = str(payload.get("customerEmail", "")).strip()
    pickup_slot_raw = str(payload.get("pickupSlot", "")).strip()
    cart = payload.get("cart", [])

    if not all([customer_name, customer_phone, customer_email, pickup_slot_raw]):
        return jsonify({"error": "Bitte alle Kundendaten und Abholfenster angeben."}), 400

    pickup_slot = parse_iso_slot(pickup_slot_raw)
    if not pickup_slot or not is_within_opening_hours(pickup_slot):
        return jsonify({"error": "Ungultiges Abholfenster."}), 400

    with closing(db_conn()) as conn:
        try:
            computed = compute_order_from_cart(conn, cart)
        except ValueError as exc:
            return jsonify({"error": str(exc)}), 400

        loads = slot_load_map(conn, pickup_slot, pickup_slot)
        used = loads.get(pickup_slot.isoformat(), 0)
        if used + computed["load"] > TAKEAWAY_CAPACITY_PER_SLOT:
            return jsonify({"error": "Dieses Zeitfenster ist inzwischen ausgebucht."}), 409

        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO orders (customer_name, customer_phone, customer_email, pickup_slot, status, subtotal, load)
            VALUES (?, ?, ?, ?, 'pending_payment', ?, ?)
            """,
            (
                customer_name,
                customer_phone,
                customer_email,
                pickup_slot.isoformat(),
                computed["subtotal"],
                computed["load"],
            ),
        )
        order_id = cur.lastrowid

        for item in computed["items"]:
            cur.execute(
                """
                INSERT INTO order_items (order_id, item_id, item_name, unit_price, prep_minutes, quantity, note)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    order_id,
                    item["item_id"],
                    item["item_name"],
                    item["unit_price"],
                    item["prep_minutes"],
                    item["quantity"],
                    item["note"],
                ),
            )
        conn.commit()

    stripe_secret = env("STRIPE_SECRET_KEY")
    public_url = env("PUBLIC_BASE_URL", "http://localhost:8000")

    if stripe and stripe_secret:
        stripe.api_key = stripe_secret
        line_items = []
        for item in computed["items"]:
            line_items.append(
                {
                    "quantity": item["quantity"],
                    "price_data": {
                        "currency": "chf",
                        "unit_amount": int(round(item["unit_price"] * 100)),
                        "product_data": {"name": item["item_name"]},
                    },
                }
            )

        session = stripe.checkout.Session.create(
            mode="payment",
            payment_method_types=["card", "twint"],
            line_items=line_items,
            customer_email=customer_email,
            metadata={"order_id": str(order_id)},
            success_url=f"{public_url}/success?order_id={order_id}",
            cancel_url=f"{public_url}/?cancelled=1",
        )

        with closing(db_conn()) as conn:
            conn.execute(
                """
                UPDATE orders
                SET stripe_session_id = ?, updated_at = datetime('now')
                WHERE id = ?
                """,
                (session["id"], order_id),
            )
            conn.commit()

        return jsonify(
            {
                "orderId": order_id,
                "checkoutUrl": session["url"],
                "paymentMode": "stripe",
            }
        )

    with closing(db_conn()) as conn:
        conn.execute(
            """
            UPDATE orders
            SET status = 'paid', updated_at = datetime('now')
            WHERE id = ?
            """,
            (order_id,),
        )
        order = conn.execute("SELECT * FROM orders WHERE id = ?", (order_id,)).fetchone()
        conn.commit()
    if order:
        notify_customer(order, "bezahlt")
    return jsonify(
        {
            "orderId": order_id,
            "paymentMode": "mock",
            "message": "Stripe nicht konfiguriert. Bestellung wurde als bezahlt markiert.",
        }
    )


@app.route("/api/payments/stripe/webhook", methods=["POST"])
def stripe_webhook() -> Any:
    if not stripe:
        return jsonify({"ok": True, "ignored": "stripe package missing"})

    endpoint_secret = env("STRIPE_WEBHOOK_SECRET")
    payload = request.get_data(as_text=True)
    sig_header = request.headers.get("Stripe-Signature", "")

    try:
        if endpoint_secret:
            event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
        else:
            event = json.loads(payload)
    except Exception as exc:
        return jsonify({"error": str(exc)}), 400

    event_type = event.get("type")
    if event_type == "checkout.session.completed":
        session = event["data"]["object"]
        metadata = session.get("metadata", {}) or {}
        order_id = metadata.get("order_id")
        if order_id:
            with closing(db_conn()) as conn:
                conn.execute(
                    """
                    UPDATE orders
                    SET status = 'paid',
                        stripe_payment_intent = ?,
                        updated_at = datetime('now')
                    WHERE id = ?
                    """,
                    (session.get("payment_intent"), int(order_id)),
                )
                order = conn.execute("SELECT * FROM orders WHERE id = ?", (int(order_id),)).fetchone()
                conn.commit()
            if order:
                notify_customer(order, "bezahlt")
    return jsonify({"received": True})


@app.route("/api/orders/<int:order_id>")
def get_order(order_id: int) -> Any:
    with closing(db_conn()) as conn:
        order = conn.execute("SELECT * FROM orders WHERE id = ?", (order_id,)).fetchone()
        if not order:
            return jsonify({"error": "Order not found"}), 404
        items = conn.execute(
            """
            SELECT item_name, unit_price, quantity, note
            FROM order_items
            WHERE order_id = ?
            """,
            (order_id,),
        ).fetchall()
    data = dict(order)
    data["items"] = [dict(i) for i in items]
    return jsonify(data)


@app.route("/api/admin/orders")
def admin_orders() -> Any:
    denied = require_admin()
    if denied:
        return denied
    status = request.args.get("status", "").strip()
    query = """
      SELECT id, customer_name, customer_phone, customer_email, pickup_slot, status, subtotal, load, created_at
      FROM orders
    """
    params: tuple = ()
    if status:
        query += " WHERE status = ?"
        params = (status,)
    query += " ORDER BY pickup_slot ASC, id ASC LIMIT 200"
    with closing(db_conn()) as conn:
        rows = conn.execute(query, params).fetchall()
    return jsonify([dict(r) for r in rows])


@app.route("/api/admin/orders/<int:order_id>/status", methods=["PATCH"])
def admin_update_status(order_id: int) -> Any:
    denied = require_admin()
    if denied:
        return denied
    payload = request.get_json(silent=True) or {}
    status = str(payload.get("status", "")).strip()
    if status not in ORDER_STATUSES:
        return jsonify({"error": "Ungultiger Status"}), 400
    with closing(db_conn()) as conn:
        conn.execute(
            """
            UPDATE orders
            SET status = ?, updated_at = datetime('now')
            WHERE id = ?
            """,
            (status, order_id),
        )
        order = conn.execute("SELECT * FROM orders WHERE id = ?", (order_id,)).fetchone()
        conn.commit()
    if not order:
        return jsonify({"error": "Order not found"}), 404
    notify_customer(order, status)
    return jsonify({"ok": True})


@app.route("/api/admin/slots")
def admin_slots() -> Any:
    denied = require_admin()
    if denied:
        return denied
    date_str = request.args.get("date", "").strip()
    if not date_str:
        date_str = datetime.now().strftime("%Y-%m-%d")
    with closing(db_conn()) as conn:
        rows = conn.execute(
            """
            SELECT pickup_slot, SUM(load) AS total_load, COUNT(*) AS total_orders
            FROM orders
            WHERE pickup_slot LIKE ?
              AND status IN ('pending_payment', 'paid', 'preparing', 'ready')
            GROUP BY pickup_slot
            ORDER BY pickup_slot ASC
            """,
            (f"{date_str}%",),
        ).fetchall()
    out = []
    for r in rows:
        dt = parse_iso_slot(r["pickup_slot"])
        out.append(
            {
                "pickupSlot": r["pickup_slot"],
                "time": dt.strftime("%H:%M") if dt else r["pickup_slot"],
                "load": int(r["total_load"] or 0),
                "capacity": TAKEAWAY_CAPACITY_PER_SLOT,
                "orders": int(r["total_orders"] or 0),
            }
        )
    return jsonify(out)


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=int(env("PORT", "8000")), debug=True)
