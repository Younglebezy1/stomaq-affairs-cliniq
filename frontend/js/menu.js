// ===========================
// STOMAQ AFFAIRS CLINIQ
// menu.js — Menu Data & Logic
// ===========================

const dishes = [
  { name: "Egusi Soup",      desc: "Ground melon seed soup with assorted meat & stockfish, served with pounded yam or eba.", price: 2500, unit: "plate",    cat: "soups",  emoji: "🥘" },
  { name: "Jollof Rice",     desc: "Classic Nigerian party jollof, smoky and perfectly spiced, served with fried plantain.", price: 1800, unit: "plate",    cat: "rice",   emoji: "🍚" },
  { name: "Ofe Onugbu",      desc: "Bitter-leaf soup with goat meat and cocoyam, a southeast Nigerian treasure.",            price: 2800, unit: "plate",    cat: "soups",  emoji: "🍲" },
  { name: "Fried Rice",      desc: "Golden fried rice with mixed vegetables, prawn, and liver. Nigerian style.",             price: 2000, unit: "plate",    cat: "rice",   emoji: "🍳" },
  { name: "Suya",            desc: "Spiced skewered beef grilled over open flame. Comes with sliced onions & tomatoes.",    price: 1500, unit: "stick×5",  cat: "grills", emoji: "🍢" },
  { name: "Banga Soup",      desc: "Palm nut soup with catfish and beletete spice, a Delta region delicacy.",               price: 2600, unit: "plate",    cat: "soups",  emoji: "🥘" },
  { name: "Pepper Soup",     desc: "Light but fiery catfish pepper soup with uziza leaves. Great for cold nights.",         price: 2200, unit: "bowl",     cat: "soups",  emoji: "🫕" },
  { name: "Grilled Chicken", desc: "Full leg quarter marinated in suya spices and slow-grilled to perfection.",             price: 3000, unit: "piece",    cat: "grills", emoji: "🍗" },
  { name: "Pounded Yam",     desc: "Smooth hand-pounded yam — the perfect swallow for any soup.",                          price: 600,  unit: "wrap",     cat: "sides",  emoji: "⚪" },
  { name: "Moi Moi",         desc: "Steamed bean pudding with fish, egg, and crayfish. A Nigerian classic.",               price: 700,  unit: "wrap",     cat: "sides",  emoji: "🫘" },
  { name: "Ofada Rice",      desc: "Local brown rice served with spicy ofada ayamase stew. Authentic & bold.",             price: 2300, unit: "plate",    cat: "rice",   emoji: "🍛" },
  { name: "Fried Plantain",  desc: "Sweet ripe plantain sliced and fried golden — the perfect side.",                      price: 500,  unit: "portion",  cat: "sides",  emoji: "🍌" },
];

// Track quantities per dish index
const quantities = {};
dishes.forEach((_, i) => (quantities[i] = 1));

function formatPrice(p) {
  return "₦" + p.toLocaleString();
}

function renderMenu(cat = "all") {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;
  grid.innerHTML = "";

  dishes.forEach((d, i) => {
    if (cat !== "all" && d.cat !== cat) return;

    const card = document.createElement("div");
    card.className = "dish-card";
    card.innerHTML = `
      <div class="dish-img">${d.emoji}</div>
      <div class="dish-body">
        <div class="dish-name">${d.name}</div>
        <div class="dish-desc">${d.desc}</div>
        <div class="dish-order">
          <div class="dish-price">
            ${formatPrice(d.price)}
            <small>/${d.unit}</small>
          </div>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
            <span class="qty-num" id="qty-${i}">${quantities[i]}</span>
            <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
          </div>
        </div>
        <button class="add-btn" id="addBtn-${i}" onclick="addToOrder(${i})">
          Add ${quantities[i]} — ${formatPrice(d.price * quantities[i])}
        </button>
      </div>`;
    grid.appendChild(card);
  });
}

function changeQty(i, delta) {
  quantities[i] = Math.max(1, quantities[i] + delta);
  const qEl = document.getElementById("qty-" + i);
  const btn  = document.getElementById("addBtn-" + i);
  if (qEl) qEl.textContent = quantities[i];
  if (btn) btn.textContent = `Add ${quantities[i]} — ${formatPrice(dishes[i].price * quantities[i])}`;
}

function addToOrder(i) {
  showToast(`🍽 ${quantities[i]}× ${dishes[i].name} added!`);
}

function filterMenu(cat, btn) {
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderMenu(cat);
}

// Init
renderMenu();
