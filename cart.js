/**
 * OptiVision – Gestion du panier
 * Stockage via localStorage pour persistence entre pages
 */

// ── Charger le panier depuis localStorage ──────────────────────
function getCart() {
  return JSON.parse(localStorage.getItem('optivision_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('optivision_cart', JSON.stringify(cart));
  updateCartBadge();
}

// ── Badge du panier ────────────────────────────────────────────
function updateCartBadge() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('#cartBadge, #cartBadge2').forEach(el => {
    if (el) {
      el.textContent = count;
      el.style.display = count > 0 ? 'inline-flex' : 'none';
    }
  });
}

// ── Ajouter au panier ──────────────────────────────────────────
function addToCart(productId, couleur, qty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const key = `${productId}_${couleur}`;
  const existing = cart.find(item => item.key === key);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      key,
      id: productId,
      nom: product.nom,
      marque: product.marque,
      couleur: couleur || product.couleurs[0],
      prix: product.prixPromo || product.prix,
      prixOriginal: product.prix,
      qty
    });
  }

  saveCart(cart);
  showToast(`"${product.nom}" ajouté au panier !`);
}

// ── Supprimer un article ───────────────────────────────────────
function removeFromCart(key) {
  let cart = getCart();
  cart = cart.filter(item => item.key !== key);
  saveCart(cart);
  if (typeof renderCart === 'function') renderCart();
}

// ── Modifier la quantité ───────────────────────────────────────
function updateQty(key, delta) {
  const cart = getCart();
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
  if (typeof renderCart === 'function') renderCart();
}

// ── Vider le panier ────────────────────────────────────────────
function clearCart() {
  if (confirm('Vider tout le panier ?')) {
    localStorage.removeItem('optivision_cart');
    updateCartBadge();
    if (typeof renderCart === 'function') renderCart();
  }
}

// ── Totaux ─────────────────────────────────────────────────────
function getCartTotals(discount = 0) {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + item.prix * item.qty, 0);
  const discountAmount = discount;
  const total = Math.max(0, subtotal - discountAmount);
  return { subtotal, discountAmount, total, count: cart.reduce((s, i) => s + i.qty, 0) };
}

// ── Toast notification ──────────────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (!toast) return;
  toastMsg.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Initialiser badge au chargement ───────────────────────────
document.addEventListener('DOMContentLoaded', updateCartBadge);
