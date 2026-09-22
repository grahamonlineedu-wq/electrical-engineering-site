/* =========================================================
   VOLT-TECH ENTERPRISE INTERACTIVE LOGIC
   Catalog rendering, filtering, shopping cart, and WhatsApp order checkout
   ========================================================= */

// Catalog Inventory
const products = [
  {
    id: "vt-01",
    name: "5KVA Hybrid Solar Inverter System",
    category: "inverters",
    price: 450000,
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=500&q=80",
    specs: "Pure Sine Wave, 48V DC Input, Pure Copper Transformer, Integrated MPPT Solar Charge Controller."
  },
  {
    id: "vt-02",
    name: "3-Phase Automatic Transfer Switch (ATS)",
    category: "switchgear",
    price: 185000,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80",
    specs: "250A Rating, Dual Power Line Controller, Mechanical Interlock, LED Fault Indicators."
  },
  {
    id: "vt-03",
    name: "16mm Core Copper Armoured Cable (100m)",
    category: "cables",
    price: 320000,
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=500&q=80",
    specs: "4-Core XLPE Insulated, Steel Wire Armoured, Flame Retardant Heavy Duty Grade."
  },
  {
    id: "vt-04",
    name: "Industrial MCCB Circuit Breaker (100A)",
    category: "switchgear",
    price: 65000,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80",
    specs: "3-Pole Molded Case Circuit Breaker, Thermal-Magnetic Adjustable Trip Unit."
  }
];

let cart = [];

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartOverlay = document.getElementById('cart-overlay');
const cartDrawer = document.getElementById('cart-drawer');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsList = document.getElementById('cart-items-list');
const cartBadgeCount = document.getElementById('cart-badge-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutWhatsAppBtn = document.getElementById('checkout-whatsapp-btn');

const specModalOverlay = document.getElementById('spec-modal-overlay');
const specModal = document.getElementById('spec-modal');
const specModalBody = document.getElementById('spec-modal-body');
const closeSpecModal = document.getElementById('close-spec-modal');

// Format Price
function formatCurrency(amount) {
  return '₦' + amount.toLocaleString('en-NG', { minimumFractionDigits: 2 });
}

// Render Products
function renderProducts(filter = 'all') {
  productsContainer.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-img">
      <div class="product-info">
        <h4 class="product-title">${p.name}</h4>
        <div class="product-price">${formatCurrency(p.price)}</div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart('${p.id}')"><i class="fas fa-cart-plus"></i> Add</button>
          <button class="btn-spec" onclick="openSpecModal('${p.id}')"><i class="fas fa-info-circle"></i> Specs</button>
        </div>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

// Category Filtering
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderProducts(e.target.getAttribute('data-filter'));
  });
});

// Add to Cart
window.addToCart = function(productId) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty += 1;
  } else {
    const prod = products.find(p => p.id === productId);
    cart.push({ ...prod, qty: 1 });
  }
  updateCartUI();
  toggleCart(true);
};

// Update Cart Drawer UI
function updateCartUI() {
  cartItemsList.innerHTML = '';
  let total = 0;
  let itemCount = 0;

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<p class="text-muted">Your order cart is currently empty.</p>';
  } else {
    cart.forEach(item => {
      total += item.price * item.qty;
      itemCount += item.qty;

      const itemRow = document.createElement('div');
      itemRow.className = 'cart-item';
      itemRow.innerHTML = `
        <div>
          <strong>${item.name}</strong><br>
          <small>${formatCurrency(item.price)} x ${item.qty}</small>
        </div>
        <div>
          <strong>${formatCurrency(item.price * item.qty)}</strong>
        </div>
      `;
      cartItemsList.appendChild(itemRow);
    });
  }

  cartBadgeCount.textContent = itemCount;
  cartTotalPrice.textContent = formatCurrency(total);
}

// Toggle Cart Drawer
function toggleCart(open) {
  if (open) {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  } else {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }
}

openCartBtn.addEventListener('click', () => toggleCart(true));
closeCartBtn.addEventListener('click', () => toggleCart(false));
cartOverlay.addEventListener('click', () => toggleCart(false));

// Product Specifications Modal
window.openSpecModal = function(productId) {
  const p = products.find(prod => prod.id === productId);
  if (p) {
    specModalBody.innerHTML = `
      <h3>${p.name}</h3>
      <p style="margin-top: 10px;"><strong>Price:</strong> ${formatCurrency(p.price)}</p>
      <hr style="margin: 15px 0;">
      <h4>Technical Specifications:</h4>
      <p style="margin-top: 5px;">${p.specs}</p>
    `;
    specModal.classList.add('open');
    specModalOverlay.classList.add('open');
  }
};

closeSpecModal.addEventListener('click', () => {
  specModal.classList.remove('open');
  specModalOverlay.classList.remove('open');
});

specModalOverlay.addEventListener('click', () => {
  specModal.classList.remove('open');
  specModalOverlay.classList.remove('open');
});

// Checkout via Structured WhatsApp Message
checkoutWhatsAppBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add electrical products before checking out.");
    return;
  }

  let message = "Hello Engr. Ebenezer Ukpo (CEO Volt-Tech Enterprise),\n\nI would like to place an order for the following electrical equipment:\n\n";
  let grandTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    grandTotal += itemTotal;
    message += `${index + 1}. ${item.name} (Qty: ${item.qty}) - ₦${itemTotal.toLocaleString()}\n`;
  });

  message += `\n*Estimated Total Order Price:* ₦${grandTotal.toLocaleString()}\n\nPlease confirm availability and delivery terms. Thank you!`;

  const whatsappUrl = `https://wa.me/234706819438?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});

// Initial Setup
renderProducts();

