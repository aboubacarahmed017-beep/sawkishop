/**
 * OptiVision – Script principal
 * Gestion UI, rendu des produits, filtres, animations
 */

// ── NAVBAR scroll effect ──────────────────────────────────────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
});

// ── Hamburger menu ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.innerHTML = navLinks.classList.contains('open')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }
});

// ── PARTICLES hero ────────────────────────────────────────────
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${Math.random() * 6 + 2}px;
      height: ${Math.random() * 6 + 2}px;
      animation-delay: ${Math.random() * 6}s;
      animation-duration: ${Math.random() * 10 + 8}s;
    `;
    container.appendChild(p);
  }
}

// ── 3D Glasses mouse parallax ─────────────────────────────────
function initGlassesParallax() {
  const wrapper = document.getElementById('glasses3d');
  if (!wrapper) return;
  document.addEventListener('mousemove', (e) => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    wrapper.style.transform = `rotateY(${dx * 18}deg) rotateX(${-dy * 10}deg)`;
  });
}

// ── FORMAT PRIX ───────────────────────────────────────────────
function formatPrice(price) {
  return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
}

// ── RENDER PRODUCT CARD ────────────────────────────────────────
function renderProductCard(product, container) {
  const hasPromo = product.prixPromo !== null && product.prixPromo !== undefined;
  const discount = hasPromo
    ? Math.round((1 - product.prixPromo / product.prix) * 100)
    : 0;

  const couleurOptions = product.couleurs.map((c, i) => `
    <button class="color-dot ${i === 0 ? 'active' : ''}" 
            data-color="${c}" 
            title="${c}"
            onclick="selectColor(this)"></button>
  `).join('');

  const imageHTML = product.image
    ? `<img src="${product.image}" alt="${product.nom}" loading="lazy"/>`
    : `<div class="product-icon-placeholder"><i class="fas fa-glasses"></i></div>`;

  const badgeHTML = product.badge
    ? `<span class="product-badge badge-${product.badge.includes('%') ? 'promo' : product.badge === 'Nouveau' ? 'new' : 'special'}">${product.badge}</span>`
    : '';

  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-img-wrap">
      ${imageHTML}
      ${badgeHTML}
      <div class="product-overlay">
        <button class="quick-view-btn" onclick="openModal(${product.id})">
          <i class="fas fa-eye"></i> Aperçu rapide
        </button>
      </div>
      <button class="wishlist-btn" title="Favoris"><i class="fas fa-heart"></i></button>
    </div>
    <div class="product-info">
      <p class="product-brand">${product.marque}</p>
      <h3 class="product-name">${product.nom}</h3>
      <div class="product-colors">${couleurOptions}</div>
      <div class="product-price-row">
        <div class="product-prices">
          ${hasPromo
            ? `<span class="price-current">${formatPrice(product.prixPromo)}</span>
               <span class="price-original">${formatPrice(product.prix)}</span>
               <span class="price-discount">-${discount}%</span>`
            : `<span class="price-current">${formatPrice(product.prix)}</span>`
          }
        </div>
        <button class="add-cart-btn" onclick="handleAddToCart(${product.id}, this)">
          <i class="fas fa-shopping-bag"></i>
        </button>
      </div>
    </div>
  `;
  container.appendChild(card);
}

function selectColor(btn) {
  const siblings = btn.closest('.product-colors').querySelectorAll('.color-dot');
  siblings.forEach(s => s.classList.remove('active'));
  btn.classList.add('active');
}

function handleAddToCart(productId, btn) {
  const card = btn.closest('.product-card');
  const activeColor = card.querySelector('.color-dot.active');
  const couleur = activeColor ? activeColor.dataset.color : '';
  addToCart(productId, couleur);
  btn.innerHTML = '<i class="fas fa-check"></i>';
  btn.classList.add('added');
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-shopping-bag"></i>';
    btn.classList.remove('added');
  }, 1500);
}

// ── FEATURED PRODUCTS (accueil) ────────────────────────────────
function renderFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;
  const featured = products.filter(p => p.vedette).slice(0, 6);
  featured.forEach(p => renderProductCard(p, container));
}

// ── SHOP PAGE ──────────────────────────────────────────────────
let currentCategory = 'all';

function setCategory(btn) {
  currentCategory = btn.dataset.cat;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  filterProducts();
}

function filterProducts() {
  const container = document.getElementById('shopProducts');
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');
  if (!container) return;

  const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const sort = document.getElementById('sortSelect')?.value || 'default';

  // Check URL params for category
  if (currentCategory === 'all') {
    const urlCat = new URLSearchParams(window.location.search).get('cat');
    if (urlCat) currentCategory = urlCat;
  }

  let filtered = products.filter(p => {
    const matchCat = currentCategory === 'all' || p.categorie === currentCategory;
    const matchSearch = !search || p.nom.toLowerCase().includes(search) || p.marque.toLowerCase().includes(search) || p.categorie.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  // Sort
  if (sort === 'price-asc') filtered.sort((a, b) => (a.prixPromo || a.prix) - (b.prixPromo || b.prix));
  else if (sort === 'price-desc') filtered.sort((a, b) => (b.prixPromo || b.prix) - (a.prixPromo || a.prix));
  else if (sort === 'name') filtered.sort((a, b) => a.nom.localeCompare(b.nom));
  else if (sort === 'promo') filtered = filtered.filter(p => p.prixPromo);

  container.innerHTML = '';
  filtered.forEach(p => renderProductCard(p, container));

  if (emptyState) emptyState.style.display = filtered.length === 0 ? 'block' : 'none';
  if (resultsCount) {
    resultsCount.textContent = filtered.length === products.length
      ? `Affichage de tous les produits (${products.length})`
      : `${filtered.length} produit${filtered.length > 1 ? 's' : ''} trouvé${filtered.length > 1 ? 's' : ''}`;
  }
}

// ── MODAL PRODUIT ─────────────────────────────────────────────
function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('productModal');
  const content = document.getElementById('modalContent');
  if (!modal || !content) return;

  const hasPromo = product.prixPromo !== null && product.prixPromo !== undefined;
  const discount = hasPromo ? Math.round((1 - product.prixPromo / product.prix) * 100) : 0;

  const imageHTML = product.image
    ? `<img src="${product.image}" alt="${product.nom}" style="width:100%;border-radius:12px"/>`
    : `<div class="modal-img-placeholder"><i class="fas fa-glasses"></i></div>`;

  content.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img">${imageHTML}</div>
      <div class="modal-details">
        <p class="product-brand">${product.marque}</p>
        <h2>${product.nom}</h2>
        <p class="modal-desc">${product.description}</p>
        <div class="modal-price">
          ${hasPromo
            ? `<span class="price-current large">${formatPrice(product.prixPromo)}</span>
               <span class="price-original">${formatPrice(product.prix)}</span>
               <span class="price-discount">-${discount}%</span>`
            : `<span class="price-current large">${formatPrice(product.prix)}</span>`
          }
        </div>
        <div class="modal-colors">
          <p><strong>Couleur :</strong></p>
          <div class="modal-color-list" id="modalColors">
            ${product.couleurs.map((c, i) => `
              <button class="color-option ${i === 0 ? 'active' : ''}" 
                      onclick="selectModalColor(this)" 
                      data-color="${c}">${c}</button>
            `).join('')}
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-primary" onclick="addToCartFromModal(${product.id})">
            <i class="fas fa-shopping-bag"></i> Ajouter au panier
          </button>
          <a href="panier.html" class="btn-ghost">Voir le panier</a>
        </div>
        <div class="modal-features">
          <span><i class="fas fa-truck"></i> Livraison rapide</span>
          <span><i class="fas fa-shield-alt"></i> Garantie 2 ans</span>
          <span><i class="fas fa-undo"></i> Retour 30 jours</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function selectModalColor(btn) {
  document.querySelectorAll('.color-option').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function addToCartFromModal(productId) {
  const activeColor = document.querySelector('.color-option.active');
  const couleur = activeColor ? activeColor.dataset.color : '';
  addToCart(productId, couleur);
  closeModalBtn();
}

function closeModal(e) {
  if (e.target === document.getElementById('productModal')) closeModalBtn();
}

function closeModalBtn() {
  const modal = document.getElementById('productModal');
  if (modal) modal.classList.remove('show');
  document.body.style.overflow = '';
}

// ── CART PAGE ─────────────────────────────────────────────────
let appliedDiscount = 0;

function renderCart() {
  const cart = getCart();
  const cartItems = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const cartLayout = document.getElementById('cartLayout');
  const cartItemCount = document.getElementById('cartItemCount');
  if (!cartItems) return;

  if (cart.length === 0) {
    if (emptyCart) emptyCart.style.display = 'block';
    if (cartLayout) cartLayout.style.display = 'none';
    return;
  }

  if (emptyCart) emptyCart.style.display = 'none';
  if (cartLayout) cartLayout.style.display = 'grid';
  if (cartItemCount) cartItemCount.textContent = cart.reduce((s, i) => s + i.qty, 0);

  cartItems.innerHTML = '';
  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-img">
        <div class="cart-item-icon"><i class="fas fa-glasses"></i></div>
      </div>
      <div class="cart-item-info">
        <h4>${item.nom}</h4>
        <p class="cart-item-details">${item.marque} · ${item.couleur}</p>
        <div class="cart-item-price">
          ${formatPrice(item.prix)}
          ${item.prix < item.prixOriginal ? `<span class="cart-original-price">${formatPrice(item.prixOriginal)}</span>` : ''}
        </div>
      </div>
      <div class="cart-item-qty">
        <button onclick="updateQty('${item.key}', -1)"><i class="fas fa-minus"></i></button>
        <span>${item.qty}</span>
        <button onclick="updateQty('${item.key}', 1)"><i class="fas fa-plus"></i></button>
      </div>
      <div class="cart-item-total">${formatPrice(item.prix * item.qty)}</div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.key}')"><i class="fas fa-trash"></i></button>
    `;
    cartItems.appendChild(row);
  });

  updateSummary();
}

function updateSummary() {
  const totals = getCartTotals(appliedDiscount);
  const subEl = document.getElementById('summarySubtotal');
  const totalEl = document.getElementById('summaryTotal');
  const shippingEl = document.getElementById('summaryShipping');
  if (subEl) subEl.textContent = formatPrice(totals.subtotal);
  if (totalEl) totalEl.innerHTML = `<strong>${formatPrice(totals.total)}</strong>`;
  if (shippingEl) shippingEl.textContent = 'Gratuite';
}

function applyPromo() {
  const input = document.getElementById('promoInput');
  const hint = document.getElementById('promoHint');
  const promoLine = document.getElementById('promoLine');
  const promoCodeEl = document.getElementById('promoCode');
  const promoAmountEl = document.getElementById('promoAmount');
  if (!input || !hint) return;

  const code = input.value.trim().toUpperCase();
  const promo = promoCodes[code];

  if (!promo) {
    hint.textContent = 'Code invalide ou expiré.';
    hint.style.color = '#e74c3c';
    appliedDiscount = 0;
    if (promoLine) promoLine.style.display = 'none';
    updateSummary();
    return;
  }

  const totals = getCartTotals(0);
  if (promo.type === 'percent') {
    appliedDiscount = Math.round(totals.subtotal * promo.value / 100);
  } else {
    appliedDiscount = promo.value;
  }

  hint.textContent = `✓ Code appliqué : ${promo.label}`;
  hint.style.color = '#27ae60';
  if (promoLine) promoLine.style.display = 'flex';
  if (promoCodeEl) promoCodeEl.textContent = code;
  if (promoAmountEl) promoAmountEl.textContent = `-${formatPrice(appliedDiscount)}`;
  updateSummary();
}

function goToCheckout() {
  const cart = getCart();
  if (cart.length === 0) { showToast('Votre panier est vide !'); return; }
  const overlay = document.getElementById('checkoutOverlay');
  const recap = document.getElementById('orderRecap');
  if (!overlay) return;

  if (recap) {
    const totals = getCartTotals(appliedDiscount);
    recap.innerHTML = `
      <div class="recap-title">Résumé de votre commande</div>
      ${cart.map(i => `<div class="recap-line"><span>${i.nom} (${i.couleur}) x${i.qty}</span><span>${formatPrice(i.prix * i.qty)}</span></div>`).join('')}
      ${appliedDiscount > 0 ? `<div class="recap-line promo"><span>Réduction</span><span>-${formatPrice(appliedDiscount)}</span></div>` : ''}
      <div class="recap-line total"><strong>Total</strong><strong>${formatPrice(totals.total)}</strong></div>
    `;
  }

  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCheckout() {
  const overlay = document.getElementById('checkoutOverlay');
  if (overlay) overlay.classList.remove('show');
  document.body.style.overflow = '';
}

async function submitOrder(e) {
  e.preventDefault();

  // ── Récupérer les données du formulaire ──────────────────────
  const firstName = document.getElementById('firstName')?.value.trim();
  const lastName  = document.getElementById('lastName')?.value.trim();
  const phone     = document.getElementById('phone')?.value.trim();
  const email     = document.getElementById('email')?.value.trim();
  const address   = document.getElementById('address')?.value.trim();
  const city      = document.getElementById('city')?.value.trim();
  const district  = document.getElementById('district')?.value.trim();
  const note      = document.getElementById('orderNote')?.value.trim();
  const payment   = document.querySelector('input[name="payment"]:checked')?.value;

  const cart   = getCart();
  const totals = getCartTotals(appliedDiscount);
  const orderNum = '#OV' + Date.now().toString().slice(-6);

  // ── Construire le résumé des articles ────────────────────────
  const articlesTexte = cart.map(i =>
    `${i.nom} (${i.couleur}) x${i.qty} = ${formatPrice(i.prix * i.qty)}`
  ).join('\n');

  const promoTexte = appliedDiscount > 0
    ? `Réduction : -${formatPrice(appliedDiscount)}\n`
    : '';

  // ── Bouton : état chargement ─────────────────────────────────
  const submitBtn = e.target.querySelector('[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
  submitBtn.disabled = true;

  // ── Envoi à Formspree ────────────────────────────────────────
  // ⚠️  IMPORTANT : remplace l'URL ci-dessous par ton vrai endpoint Formspree
  //    Étapes :
  //    1. Va sur https://formspree.io et crée un compte gratuit
  //    2. Crée un nouveau formulaire → copie l'endpoint (ex: https://formspree.io/f/xxxxxabc)
  //    3. Colle-le à la place de "https://formspree.io/f/VOTRE_ID_ICI"
  const FORMSPREE_COMMANDE = 'https://formspree.io/f/VOTRE_ID_ICI';

  const payload = {
    '🧾 Numéro de commande': orderNum,
    '👤 Nom complet'       : `${firstName} ${lastName}`,
    '📞 Téléphone'         : phone,
    '📧 Email'             : email || 'Non fourni',
    '📍 Adresse'           : address,
    '🏙️ Ville'             : city,
    '📌 Quartier'          : district || 'Non précisé',
    '💳 Paiement'          : payment,
    '📦 Articles commandés': articlesTexte,
    '🏷️ Réduction'         : promoTexte || 'Aucune',
    '💰 Total à payer'     : formatPrice(totals.total),
    '📝 Note client'       : note || 'Aucune',
    '_subject'             : `🛍️ Nouvelle commande ${orderNum} – ${firstName} ${lastName}`
  };

  try {
    const res = await fetch(FORMSPREE_COMMANDE, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body   : JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Erreur réseau');

    // ── Succès : afficher la confirmation ──────────────────────
    closeCheckout();

    const overlay = document.getElementById('confirmationOverlay');
    const details = document.getElementById('confirmationDetails');
    const msg     = document.getElementById('confirmationMsg');

    if (details) {
      details.innerHTML = `
        <p><strong>Nom :</strong> ${firstName} ${lastName}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Ville :</strong> ${city}</p>
        <p><strong>Paiement :</strong> ${payment}</p>
        <p><strong>Numéro de commande :</strong> ${orderNum}</p>
      `;
    }

    if (msg) {
      msg.textContent = `Merci ${firstName} ! Nous vous contacterons au ${phone} pour organiser la livraison à ${city}.`;
    }

    // Vider le panier après confirmation
    localStorage.removeItem('optivision_cart');
    updateCartBadge();
    if (overlay) overlay.classList.add('show');

  } catch (err) {
    // ── Erreur : remettre le bouton et prévenir ────────────────
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    showToast('❌ Erreur lors de l\'envoi. Vérifiez votre connexion et réessayez.');
  }
}

// ── FAQ TOGGLE ─────────────────────────────────────────────────
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const answer = item.querySelector('.faq-answer');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-answer').style.maxHeight = '0';
  });
  if (!isOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ── QUIZ CONSEILS ─────────────────────────────────────────────
const quizSteps = [
  {
    question: "Quelle est la forme de votre visage ?",
    options: [
      { label: "Ovale", icon: "⬭", value: "oval" },
      { label: "Rond", icon: "⬤", value: "round" },
      { label: "Carré", icon: "■", value: "square" },
      { label: "Cœur", icon: "♥", value: "heart" },
      { label: "Long", icon: "▬", value: "long" }
    ]
  },
  {
    question: "Quel est votre usage principal ?",
    options: [
      { label: "Quotidien", icon: "☀️", value: "daily" },
      { label: "Sport", icon: "🏃", value: "sport" },
      { label: "Travail", icon: "💼", value: "work" },
      { label: "Sortie / soirée", icon: "✨", value: "night" }
    ]
  },
  {
    question: "Quel style vous correspond ?",
    options: [
      { label: "Classique", icon: "🎩", value: "classic" },
      { label: "Moderne", icon: "🔷", value: "modern" },
      { label: "Tendance", icon: "🌟", value: "trendy" },
      { label: "Discret", icon: "🔸", value: "minimal" }
    ]
  }
];

const quizAnswers = {};
let quizStep = 0;

function renderQuiz() {
  const content = document.getElementById('quizContent');
  const bar = document.getElementById('quizProgressBar');
  if (!content) return;

  if (quizStep >= quizSteps.length) {
    showQuizResult();
    return;
  }

  const step = quizSteps[quizStep];
  if (bar) bar.style.width = `${((quizStep) / quizSteps.length) * 100}%`;

  content.innerHTML = `
    <div class="quiz-step">
      <p class="quiz-step-label">Question ${quizStep + 1} / ${quizSteps.length}</p>
      <h3 class="quiz-question">${step.question}</h3>
      <div class="quiz-options">
        ${step.options.map(opt => `
          <button class="quiz-option" onclick="answerQuiz('${opt.value}', this)">
            <span class="quiz-opt-icon">${opt.icon}</span>
            <span>${opt.label}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

function answerQuiz(value, btn) {
  quizAnswers[quizStep] = value;
  document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  setTimeout(() => {
    quizStep++;
    renderQuiz();
  }, 400);
}

function showQuizResult() {
  const content = document.getElementById('quizContent');
  const bar = document.getElementById('quizProgressBar');
  if (!content) return;
  if (bar) bar.style.width = '100%';

  const recommendations = {
    oval: "Visage ovale — toutes les formes vous vont ! Essayez nos <strong>Aviateur</strong> ou <strong>Wayfarer</strong>.",
    round: "Visage rond — optez pour nos <strong>montures rectangulaires</strong> pour allonger votre visage.",
    square: "Visage carré — les <strong>montures rondes</strong> adouciront vos angles. Notre <strong>Round Vintage</strong> est parfait.",
    heart: "Visage cœur — l'<strong>Aviateur</strong> est votre allié ! Léger en haut, il équilibre votre silhouette.",
    long: "Visage long — les <strong>montures larges</strong> et le <strong>Butterfly Glam</strong> équilibreront vos proportions."
  };

  const face = quizAnswers[0];
  const recommendation = recommendations[face] || "Venez nous rendre visite en boutique pour un conseil personnalisé !";

  content.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-icon">✓</div>
      <h3>Votre recommandation personnalisée</h3>
      <p>${recommendation}</p>
      <a href="shop.html" class="btn-primary">Voir les produits recommandés <i class="fas fa-arrow-right"></i></a>
      <button class="btn-ghost" onclick="resetQuiz()">Recommencer le quiz</button>
    </div>
  `;
}

function resetQuiz() {
  quizStep = 0;
  renderQuiz();
}

// ── CONTACT FORM ───────────────────────────────────────────────
async function sendContact(e) {
  e.preventDefault();

  const form = e.target;
  const inputs = form.querySelectorAll('input, select, textarea');

  // ⚠️  IMPORTANT : remplace l'URL ci-dessous par ton vrai endpoint Formspree
  //    (tu peux créer un 2ème formulaire séparé sur formspree.io pour les contacts)
  const FORMSPREE_CONTACT = 'https://formspree.io/f/VOTRE_ID_ICI';

  const payload = {};
  inputs.forEach(input => {
    if (input.name) payload[input.name] = input.value;
  });

  // Récupère les champs dans l'ordre du formulaire
  const allInputs = [...inputs];
  payload['Prénom']    = allInputs[0]?.value || '';
  payload['Nom']       = allInputs[1]?.value || '';
  payload['Email']     = allInputs[2]?.value || '';
  payload['Téléphone'] = allInputs[3]?.value || '';
  payload['Sujet']     = allInputs[4]?.value || '';
  payload['Message']   = allInputs[5]?.value || '';
  payload['_subject']  = `📩 Nouveau message : ${payload['Sujet']} – ${payload['Prénom']} ${payload['Nom']}`;

  const submitBtn = form.querySelector('[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
  submitBtn.disabled = true;

  try {
    const res = await fetch(FORMSPREE_CONTACT, {
      method : 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body   : JSON.stringify(payload)
    });

    if (!res.ok) throw new Error();

    showToast('✅ Message envoyé ! Nous vous répondrons dans les 24h.');
    form.reset();
  } catch {
    showToast('❌ Erreur lors de l\'envoi. Réessayez ou contactez-nous par téléphone.');
  } finally {
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
}

// ── NEWSLETTER ─────────────────────────────────────────────────
function subscribeNewsletter(e) {
  e.preventDefault();
  showToast('Merci ! Vous êtes bien inscrit à notre newsletter.');
  e.target.reset();
}

// ── SCROLL ANIMATIONS ──────────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .category-card, .tip-card, .face-card, .testimonial-card').forEach(el => {
    el.classList.add('animate-ready');
    observer.observe(el);
  });
}

// ── INIT ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initGlassesParallax();
  renderFeaturedProducts();
  filterProducts();
  renderCart();
  renderQuiz();
  initScrollAnimations();

  // URL params pour catégorie shop
  const urlCat = new URLSearchParams(window.location.search).get('cat');
  if (urlCat) {
    currentCategory = urlCat;
    const tabBtn = document.querySelector(`[data-cat="${urlCat}"]`);
    if (tabBtn) {
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      tabBtn.classList.add('active');
    }
  }
});
