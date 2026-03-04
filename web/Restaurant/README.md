# Thai Express Takeaway System

Mobile-first Restaurant-Website mit:
- Echtzeit-Bestellsystem (SQLite statt Simulation)
- automatische Slot-/Kapazitaetsberechnung
- Spezialwuensche pro Gericht
- Admin-Ansicht fuer Kueche/Auslastung
- Stripe Checkout mit Card + TWINT
- E-Mail/SMS-Bestaetigungen

## Projektstruktur
- `server.py`: Flask API + DB + Stripe/Webhook + Notifications
- `index.html`, `app.js`, `styles.css`: Kundenseite
- `admin.html`, `admin.js`: Admin/Kuechenpanel
- `success.html`: Rueckkehr nach erfolgreicher Zahlung
- `restaurant.db`: wird automatisch erzeugt

## Setup
1. Virtuelle Umgebung erstellen
```bash
cd "/Users/khadijaokbi/Documents/New project"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Umgebungsvariablen setzen
```bash
cp .env.example .env
# Danach Werte in .env anpassen
```

3. Server starten
```bash
export $(grep -v '^#' .env | xargs)
python3 server.py
```

Die App ist dann auf `http://localhost:8000` erreichbar.

## Stripe + TWINT
1. In Stripe Dashboard TWINT fuer dein CH-Konto aktivieren.
2. `STRIPE_SECRET_KEY` in `.env` eintragen.
3. Webhook einrichten:
```bash
stripe listen --forward-to localhost:8000/api/payments/stripe/webhook
```
4. `STRIPE_WEBHOOK_SECRET` aus der CLI in `.env` setzen.

Checkout nutzt `payment_method_types=["card", "twint"]`.

## E-Mail/SMS
- SMTP fuer E-Mail ausfuellen (`SMTP_*`, `MAIL_FROM`)
- Twilio fuer SMS ausfuellen (`TWILIO_*`)

Benachrichtigungen werden gesendet bei:
- erfolgreicher Zahlung (Webhook)
- Statuswechsel in Admin (preparing/ready/collected/cancelled)

## Admin
- URL: `http://localhost:8000/admin`
- Auth: Header-Token via Eingabefeld (`ADMIN_TOKEN`)
- Funktionen:
  - offene Orders anzeigen
  - Orderstatus aktualisieren
  - Slot-Auslastung pro Tag anzeigen
