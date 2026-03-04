const authForm    = document.getElementById("admin-auth");
const tokenInput  = document.getElementById("admin-token");
const slotForm    = document.getElementById("slot-form");
const slotDateInput = document.getElementById("slot-date");
const slotList    = document.getElementById("slot-list");
const adminOrders = document.getElementById("admin-orders");
const dashboard   = document.getElementById("dashboard");

let adminToken = localStorage.getItem("adminToken") || "";
if (adminToken) tokenInput.value = adminToken;
slotDateInput.value = new Date().toISOString().slice(0, 10);

async function adminApi(path, options = {}) {
  const res = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Token": adminToken,
    },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

// ── Status label map ──────────────────────────────────────
const STATUS_LABELS = {
  pending_payment: "⏳ Ausstehend",
  paid:            "✅ Bezahlt",
  preparing:       "👨‍🍳 In Zubereitung",
  ready:           "🔔 Abholbereit",
  collected:       "📦 Abgeholt",
  cancelled:       "❌ Storniert",
};

function statusBadge(status) {
  const label = STATUS_LABELS[status] || status;
  const color = {
    pending_payment: "#b09f8a",
    paid:            "#c9963a",
    preparing:       "#e8b96a",
    ready:           "#3a9a5c",
    collected:       "#7a6a58",
    cancelled:       "#c0392b",
  }[status] || "var(--muted)";
  return `<span style="font-size:0.75rem;font-weight:600;color:${color};letter-spacing:0.03em;">${label}</span>`;
}

function statusButtons(orderId, current) {
  const statuses = ["paid", "preparing", "ready", "collected", "cancelled"];
  return statuses
    .map((s) => {
      const active = current === s;
      return `<button
        type="button"
        class="status-btn"
        data-order-id="${orderId}"
        data-status="${s}"
        ${active ? "disabled" : ""}
        style="${active ? "opacity:1;background:var(--gold-pale);border-color:var(--gold);color:var(--ink);" : ""}"
      >${STATUS_LABELS[s] || s}</button>`;
    })
    .join("");
}

// ── Load Orders ───────────────────────────────────────────
async function loadOrders() {
  try {
    const orders = await adminApi("/api/admin/orders");
    if (!orders.length) {
      adminOrders.innerHTML = `
        <div class="live-order">
          <span>Keine Bestellungen vorhanden</span>
        </div>`;
      return;
    }
    adminOrders.innerHTML = orders
      .map((o) => {
        const slotTime = o.pickup_slot.replace("T", " ").slice(0, 16);
        return `
          <article class="order-card">
            <div class="order-card__header">
              <span class="order-card__id">#${o.id} · ${o.customer_name}</span>
              <span class="order-card__total">CHF ${Number(o.subtotal).toFixed(2)}</span>
            </div>
            <div class="order-card__meta">
              🕐 ${slotTime} · Last ${o.load}/6 · ${statusBadge(o.status)}<br>
              📞 ${o.customer_phone} · ✉️ ${o.customer_email}
            </div>
            <div class="order-card__actions">${statusButtons(o.id, o.status)}</div>
          </article>`;
      })
      .join("");
  } catch (err) {
    adminOrders.innerHTML = `
      <div class="live-order">
        <span style="color:var(--ember)">${err.message}</span>
      </div>`;
  }
}

// ── Load Slots ────────────────────────────────────────────
async function loadSlots() {
  try {
    const date = slotDateInput.value;
    const slots = await adminApi(`/api/admin/slots?date=${encodeURIComponent(date)}`);
    if (!slots.length) {
      slotList.innerHTML = `
        <div class="live-order">
          <span>Keine Slots mit aktiven Orders</span>
        </div>`;
      return;
    }
    slotList.innerHTML = slots
      .map((s) => {
        const pct = Math.min(100, Math.round((s.load / s.capacity) * 100));
        const color = pct >= 80 ? "var(--ember)" : pct >= 50 ? "var(--gold)" : "#3a9a5c";
        return `
          <div class="slot-bar">
            <div style="flex:1">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.35rem;">
                <span style="font-weight:600;color:var(--ink)">${s.time}</span>
                <span style="font-size:0.78rem;color:var(--muted)">${s.orders} ${s.orders === 1 ? "Bestellung" : "Bestellungen"} · ${s.load}/${s.capacity}</span>
              </div>
              <div class="slot-bar__fill">
                <div class="slot-bar__fill-inner" style="width:${pct}%;background:${color};"></div>
              </div>
            </div>
          </div>`;
      })
      .join("");
  } catch (err) {
    slotList.innerHTML = `
      <div class="live-order">
        <span style="color:var(--ember)">${err.message}</span>
      </div>`;
  }
}

// ── Show Dashboard ────────────────────────────────────────
function showDashboard() {
  if (dashboard) {
    dashboard.hidden = false;
    dashboard.removeAttribute("hidden");
  }
}

// ── Events ────────────────────────────────────────────────
authForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  adminToken = tokenInput.value.trim();
  localStorage.setItem("adminToken", adminToken);
  showDashboard();
  await Promise.all([loadOrders(), loadSlots()]);
});

slotForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await loadSlots();
});

adminOrders.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-order-id][data-status]");
  if (!btn || btn.disabled) return;
  const { orderId, status } = btn.dataset;
  try {
    btn.disabled = true;
    btn.textContent = "…";
    await adminApi(`/api/admin/orders/${orderId}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await Promise.all([loadOrders(), loadSlots()]);
  } catch (err) {
    alert(err.message);
    await loadOrders();
  }
});

// Auto-refresh every 30 s
setInterval(() => {
  if (adminToken) Promise.all([loadOrders(), loadSlots()]);
}, 30_000);

// ── Auto-connect if token stored ──────────────────────────
if (adminToken) {
  showDashboard();
  Promise.all([loadOrders(), loadSlots()]);
}
