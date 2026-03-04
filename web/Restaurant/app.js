// ── State ────────────────────────────────────────────────
const state = {
  menu: [],
  cart: [],
  slots: [],
  activeCategory: "alle",
};

// ── DOM refs ─────────────────────────────────────────────
const menuGrid       = document.getElementById("menu-grid");
const cartList       = document.getElementById("cart-list");
const cartEmpty      = document.getElementById("cart-empty");
const subtotalEl     = document.getElementById("subtotal");
const totalEl        = document.getElementById("total");
const pickupSlot     = document.getElementById("pickup-slot");
const capacityNote   = document.getElementById("capacity-note");
const orderForm      = document.getElementById("order-form");
const submitOrderBtn = document.getElementById("submit-order");
const liveOrdersEl   = document.getElementById("live-orders");
const successDialog  = document.getElementById("success-dialog");
const successText    = document.getElementById("success-text");
const closeDialogBtn = document.getElementById("close-dialog");
const categoryBar    = document.getElementById("category-bar");
const cartBadge      = document.getElementById("cart-badge");

// ── Dish meta: emoji + description ───────────────────────
const DISH_META = {
  p01: { emoji: "🍜", desc: "Klassische Reisnudeln mit Poulet, Erdnüssen & Tamarinden-Sauce.", badge: "Bestseller" },
  p02: { emoji: "🍛", desc: "Zartes Rind in cremiger grüner Curry-Kokosmilch mit Thai-Basilikum.", badge: "Signature" },
  p03: { emoji: "🥘", desc: "Knuspriger Tofu in aromatischer roter Curry-Paste mit Gemüse.", badge: "Vegetarisch" },
  p04: { emoji: "🐓", desc: "Saftiges Poulet mit Cashewnüssen, Paprika & Austernsauce.", badge: null },
  p05: { emoji: "🥩", desc: "Zartes Rindfleisch mit frischem Thai-Basilikum & roter Chili.", badge: "Scharf" },
  p06: { emoji: "🍲", desc: "Traditionelle Kokosmilch-Suppe mit Galangal, Zitronengras & Pilzen.", badge: null },
  p07: { emoji: "🥭", desc: "Klebreis mit frischer Mango & gesüsster Kokosmilch.", badge: "Dessert" },
  p08: { emoji: "🥢", desc: "Knusprige Frühlingsrollen mit Gemüse, serviert mit süss-saurer Sauce.", badge: null },
};

// ── Helpers ───────────────────────────────────────────────
function formatMoney(value) {
  return `CHF ${Number(value).toFixed(2)}`;
}

async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

function cartSubtotal() {
  return state.cart.reduce((acc, line) => {
    const item = state.menu.find((m) => m.id === line.itemId);
    return item ? acc + item.price * line.quantity : acc;
  }, 0);
}

function totalCartItems() {
  return state.cart.reduce((acc, line) => acc + line.quantity, 0);
}

function updateCartBadge() {
  if (!cartBadge) return;
  const count = totalCartItems();
  cartBadge.textContent = count;
  cartBadge.classList.toggle("visible", count > 0);
}

// ── Category Filter ───────────────────────────────────────
function buildCategoryBar() {
  if (!categoryBar) return;
  const cats = ["alle", ...new Set(state.menu.map((m) => m.category))];
  categoryBar.innerHTML = cats
    .map(
      (cat) =>
        `<button class="cat-btn${cat === state.activeCategory ? " active" : ""}" data-cat="${cat}">
          ${cat === "alle" ? "Alle" : cat}
        </button>`
    )
    .join("");
}

// ── Render Menu ───────────────────────────────────────────
function renderMenu() {
  buildCategoryBar();

  const filtered =
    state.activeCategory === "alle"
      ? state.menu
      : state.menu.filter((m) => m.category === state.activeCategory);

  if (!filtered.length) {
    menuGrid.innerHTML = `<div class="empty-state">Keine Gerichte in dieser Kategorie.</div>`;
    return;
  }

  menuGrid.innerHTML = filtered
    .map((item) => {
      const meta = DISH_META[item.id] || { emoji: "🍽", desc: "", badge: null };
      const chf = item.price.toFixed(2).replace(".", ".");
      const [franken, rappen] = chf.split(".");
      return `
        <article class="dish-card">
          <span class="dish-card__emoji">${meta.emoji}</span>
          ${meta.badge ? `<span class="dish-card__badge">◆ ${meta.badge}</span>` : ""}
          <h3>${item.name}</h3>
          <p class="dish-card__desc">${meta.desc}</p>
          <div class="dish-meta">
            <span class="dish-meta__time">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="8" cy="8" r="6.5"/>
                <path d="M8 4.5V8l2.5 2"/>
              </svg>
              ${item.prep_minutes} Min.
            </span>
            <span class="price"><sup>CHF</sup>${franken}<sup>.${rappen}</sup></span>
          </div>
          <button class="btn-primary" data-action="add-item" data-id="${item.id}">
            + In den Warenkorb
          </button>
        </article>`;
    })
    .join("");
}

// ── Render Cart ───────────────────────────────────────────
function renderCart() {
  updateCartBadge();

  if (!state.cart.length) {
    cartEmpty.style.display = "block";
    cartList.innerHTML = "";
    subtotalEl.textContent = formatMoney(0);
    totalEl.textContent = formatMoney(0);
    updateSlots();
    return;
  }

  cartEmpty.style.display = "none";
  cartList.innerHTML = state.cart
    .map((line) => {
      const item = state.menu.find((m) => m.id === line.itemId);
      if (!item) return "";
      const meta = DISH_META[item.id] || { emoji: "🍽" };
      return `
        <article class="cart-item" data-cart-id="${line.cartId}">
          <div class="cart-item__top">
            <strong>${meta.emoji} ${item.name}</strong>
            <strong>${formatMoney(item.price * line.quantity)}</strong>
          </div>
          <div>${line.quantity} × ${formatMoney(item.price)}</div>
          <textarea
            data-action="note"
            data-cart-id="${line.cartId}"
            placeholder="Spezialwunsch (z.B. ohne Chili, extra Gemüse)"
          >${line.note}</textarea>
          <div class="cart-item__actions">
            <button type="button" data-action="minus" data-cart-id="${line.cartId}">−</button>
            <button type="button" data-action="plus"  data-cart-id="${line.cartId}">+</button>
            <button type="button" data-action="remove" data-cart-id="${line.cartId}">Entfernen</button>
          </div>
        </article>`;
    })
    .join("");

  const subtotal = cartSubtotal();
  subtotalEl.textContent = formatMoney(subtotal);
  totalEl.textContent    = formatMoney(subtotal);
  updateSlots();
}

// ── Live Orders ───────────────────────────────────────────
async function renderLiveOrders() {
  try {
    const rows = await api("/api/public/live-orders");
    if (!rows.length) {
      liveOrdersEl.innerHTML = `<div class="live-order"><span>Keine offenen Bestellungen</span><strong>—</strong></div>`;
      return;
    }
    liveOrdersEl.innerHTML = rows
      .map((r) => {
        const pct = Math.round((r.load / 6) * 100);
        return `
          <div class="live-order">
            <span>${r.slotLabel} · ${r.orders} ${r.orders === 1 ? "Bestellung" : "Bestellungen"}</span>
            <strong>${r.load}/6</strong>
          </div>`;
      })
      .join("");
  } catch {
    liveOrdersEl.innerHTML = `<div class="live-order"><span>Auslastung nicht verfügbar</span></div>`;
  }
}

// ── Slot Picker ───────────────────────────────────────────
async function updateSlots() {
  pickupSlot.innerHTML = "";
  if (!state.cart.length) {
    pickupSlot.innerHTML = `<option value="">Bitte zuerst Gerichte wählen</option>`;
    pickupSlot.disabled = true;
    submitOrderBtn.disabled = true;
    capacityNote.textContent = "Zeitfenster erscheinen nach Auswahl der Gerichte.";
    return;
  }
  try {
    const data = await api("/api/availability", {
      method: "POST",
      body: JSON.stringify({
        cart: state.cart.map(({ itemId, quantity, note }) => ({ itemId, quantity, note })),
      }),
    });
    state.slots = data.slots || [];
    if (!state.slots.length) {
      pickupSlot.innerHTML = `<option value="">Heute keine freien Slots mehr</option>`;
      pickupSlot.disabled = true;
      submitOrderBtn.disabled = true;
      capacityNote.textContent = "Bitte versuche es später erneut.";
      return;
    }
    pickupSlot.innerHTML = state.slots
      .map((s) => `<option value="${s.value}">${s.label}</option>`)
      .join("");
    pickupSlot.disabled = false;
    submitOrderBtn.disabled = false;
    capacityNote.textContent = `Benötigte Kapazität: ${data.neededLoad} Einheiten.`;
  } catch (err) {
    pickupSlot.innerHTML = `<option value="">Slots nicht verfügbar</option>`;
    pickupSlot.disabled = true;
    submitOrderBtn.disabled = true;
    capacityNote.textContent = err.message;
  }
}

// ── Cart Actions ──────────────────────────────────────────
function addItem(itemId) {
  const existing = state.cart.find((l) => l.itemId === itemId && !l.note);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({
      cartId: `${itemId}-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
      itemId,
      quantity: 1,
      note: "",
    });
  }
  renderCart();
}

function updateCartItem(cartId, action) {
  const line = state.cart.find((e) => e.cartId === cartId);
  if (!line) return;
  if (action === "plus")  line.quantity += 1;
  if (action === "minus") line.quantity -= 1;
  if (action === "remove" || line.quantity <= 0) {
    state.cart = state.cart.filter((e) => e.cartId !== cartId);
  }
  renderCart();
}

// ── Submit ────────────────────────────────────────────────
async function submitOrder(event) {
  event.preventDefault();
  if (!state.cart.length) return;

  const formData = new FormData(orderForm);
  const payload = {
    customerName:  String(formData.get("customerName")  || "").trim(),
    customerPhone: String(formData.get("customerPhone") || "").trim(),
    customerEmail: String(formData.get("customerEmail") || "").trim(),
    pickupSlot:    String(formData.get("pickupSlot")    || "").trim(),
    cart: state.cart.map(({ itemId, quantity, note }) => ({ itemId, quantity, note })),
  };

  submitOrderBtn.disabled = true;
  submitOrderBtn.textContent = "⏳ Wird verarbeitet…";

  try {
    const result = await api("/api/orders/create-checkout-session", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (result.checkoutUrl) {
      window.location.href = result.checkoutUrl;
      return;
    }

    state.cart = [];
    orderForm.reset();
    renderCart();
    await renderLiveOrders();

    successText.textContent =
      result.message || `Bestellung #${result.orderId} wurde entgegengenommen.`;

    if (typeof successDialog.showModal === "function") {
      successDialog.showModal();
    } else {
      alert(successText.textContent);
    }
  } catch (err) {
    alert(err.message);
  } finally {
    submitOrderBtn.disabled = false;
    submitOrderBtn.innerHTML = "🔒 Jetzt bezahlen";
  }
}

// ── Event Listeners ───────────────────────────────────────
menuGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-action='add-item']");
  if (btn) addItem(btn.dataset.id);
});

cartList.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (btn) updateCartItem(btn.dataset.cartId, btn.dataset.action);
});

cartList.addEventListener("input", (e) => {
  if (e.target.matches("textarea[data-action='note']")) {
    const line = state.cart.find((entry) => entry.cartId === e.target.dataset.cartId);
    if (line) line.note = e.target.value;
  }
});

if (categoryBar) {
  categoryBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".cat-btn");
    if (!btn) return;
    state.activeCategory = btn.dataset.cat;
    categoryBar.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderMenu();
  });
}

orderForm.addEventListener("submit", submitOrder);
closeDialogBtn.addEventListener("click", () => successDialog.close());

// Refresh live orders every 30 s
setInterval(renderLiveOrders, 30_000);

// ── Init ──────────────────────────────────────────────────
async function init() {
  state.menu = await api("/api/menu");
  renderMenu();
  renderCart();
  await renderLiveOrders();
}

init().catch((err) => {
  menuGrid.innerHTML = `
    <div class="empty-state">
      <strong>Backend nicht erreichbar</strong><br>
      <span style="font-size:0.82rem">${err.message}</span>
    </div>`;
});
