/** Numéro WhatsApp (indicatif 225 + numéro sans le 0 initial, chiffres uniquement). */
const WHATSAPP_NUMBER = "2250701678342";
window.WHATSAPP_NUMBER = WHATSAPP_NUMBER;

/** E-mail utilisé par le formulaire contact (mailto). */
const CONTACT_EMAIL = "onchiche225f@gmail.com";

const LANG_STORAGE_KEY = "site_lang";
const I18N = {
  fr: {
    nav_home: "Accueil",
    nav_products: "Produits",
    nav_cart: "Panier",
    nav_contact: "Contact",
    nav_admin: "Admin",
    lang_fr: "FR",
    lang_en: "EN",
    buy: "Acheter",
    added_to_cart: "ajouté au panier",
    remove: "Supprimer",
    cart_empty_alert: "Votre panier est vide",
    order_title: "Commande Onchiche225",
    order_total: "Total",
    wa_hello: "Bonjour Onchiche225, ",
    open_menu: "Ouvrir le menu",
    close_menu: "Fermer le menu",
    contact_missing_fields: "Merci de remplir au moins le nom, l’e-mail et le message.",
    contact_mail_subject: "Message depuis le site Onchiche225",
    label_name: "Nom",
    label_email: "E-mail",
    label_subject: "Objet",
    wa_missing_fields: "Indiquez au moins votre nom et votre message pour WhatsApp.",
    wa_subject: "Objet"
    ,
    home_badge: "Boutique · Toute la Côte d'Ivoire",
    home_title: "Bienvenue chez Onchiche225",
    home_lead_hero: "Accessoires et consommables pour chicha avec une experience d'achat fluide, des conseils sur mesure et une commande rapide via WhatsApp.",
    home_chip_trending: "Produits tendances",
    home_chip_prices: "Prix transparents",
    home_chip_delivery: "Livraison Cote d'Ivoire",
    promo_title: "Offre Flash -10% cette semaine",
    promo_countdown_label: "Se termine dans",
    product_badge_available: "Disponible",
    product_badge_new: "Nouveau",
    product_badge_best: "Best seller",
    home_lead_1: "Accessoires et consommables pour chicha — commande rapide par WhatsApp et conseils sur mesure.",
    home_lead_2: "Livraison disponible dans toute la Côte d'Ivoire.",
    home_cta: "Voir le catalogue",
    popular_products: "Produits populaires",
    all_products: "Tous les produits",
    search_label: "Rechercher",
    search_placeholder: "Nom du produit…",
    cart_title: "Votre panier",
    cart_empty_text: "Votre panier est vide pour le moment.",
    cart_total: "Total",
    cart_checkout: "Commander via WhatsApp",
    cart_clear: "Vider le panier",
    contact_title: "Contact",
    contact_intro: "Une question ou une commande personnalisée ? Utilisez le formulaire, WhatsApp ou l’e-mail.",
    contact_subject_optional: "Objet (optionnel)",
    contact_message: "Message",
    contact_email_send: "Envoyer par e-mail",
    contact_wa_send: "Envoyer sur WhatsApp",
    contact_open_chat: "Ouvrir la discussion",
    contact_phone_wa: "Téléphone / WhatsApp",
    contact_note: "Le numéro affiché est le même que pour les commandes et messages WhatsApp.",
    not_found_title: "Page introuvable",
    not_found_text: "Le lien est peut-être incorrect ou la page a été déplacée.",
    not_found_back: "Retour à l’accueil",
    footer_line: "© 2026 Onchiche225 - Boutique de chicha · Livraison dans toute la Cote d'Ivoire"
  },
  en: {
    nav_home: "Home",
    nav_products: "Products",
    nav_cart: "Cart",
    nav_contact: "Contact",
    nav_admin: "Admin",
    lang_fr: "FR",
    lang_en: "EN",
    buy: "Buy",
    added_to_cart: "added to cart",
    remove: "Remove",
    cart_empty_alert: "Your cart is empty",
    order_title: "Onchiche225 Order",
    order_total: "Total",
    wa_hello: "Hello Onchiche225, ",
    open_menu: "Open menu",
    close_menu: "Close menu",
    contact_missing_fields: "Please fill in at least name, email, and message.",
    contact_mail_subject: "Message from Onchiche225 website",
    label_name: "Name",
    label_email: "Email",
    label_subject: "Subject",
    wa_missing_fields: "Please provide at least your name and message for WhatsApp.",
    wa_subject: "Subject",
    home_badge: "Store · All Côte d'Ivoire",
    home_title: "Welcome to Onchiche225",
    home_lead_hero: "Hookah accessories and consumables with a smooth shopping experience, tailored guidance, and fast WhatsApp ordering.",
    home_chip_trending: "Trending products",
    home_chip_prices: "Transparent pricing",
    home_chip_delivery: "Delivery across Cote d'Ivoire",
    promo_title: "Flash Deal -10% this week",
    promo_countdown_label: "Ends in",
    product_badge_available: "Available",
    product_badge_new: "New",
    product_badge_best: "Best seller",
    home_lead_1: "Hookah accessories and consumables — fast WhatsApp ordering and tailored support.",
    home_lead_2: "Delivery available across all Côte d'Ivoire.",
    home_cta: "View catalog",
    popular_products: "Popular products",
    all_products: "All products",
    search_label: "Search",
    search_placeholder: "Product name…",
    cart_title: "Your cart",
    cart_empty_text: "Your cart is currently empty.",
    cart_total: "Total",
    cart_checkout: "Order via WhatsApp",
    cart_clear: "Clear cart",
    contact_title: "Contact",
    contact_intro: "Need help or a custom order? Use the form, WhatsApp, or email.",
    contact_subject_optional: "Subject (optional)",
    contact_message: "Message",
    contact_email_send: "Send by email",
    contact_wa_send: "Send on WhatsApp",
    contact_open_chat: "Open chat",
    contact_phone_wa: "Phone / WhatsApp",
    contact_note: "The displayed number is the same one used for WhatsApp orders and messages.",
    not_found_title: "Page not found",
    not_found_text: "The link may be incorrect or the page has moved.",
    not_found_back: "Back to home",
    footer_line: "© 2026 Onchiche225 - Hookah shop · Delivery across all Côte d'Ivoire"
  }
};

function getCurrentLanguage() {
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if (saved === "fr" || saved === "en") return saved;
  return "fr";
}

let currentLanguage = getCurrentLanguage();

function t(key) {
  const table = I18N[currentLanguage] || I18N.fr;
  return table[key] || I18N.fr[key] || key;
}

function applyTranslations() {
  document.documentElement.setAttribute("lang", currentLanguage);
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key) el.setAttribute("placeholder", t(key));
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria-label");
    if (key) el.setAttribute("aria-label", t(key));
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === currentLanguage;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function setLanguage(lang) {
  if (lang !== "fr" && lang !== "en") return;
  currentLanguage = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyTranslations();
  const promoTitle = document.querySelector(".promo-strip .promo-title");
  if (promoTitle && promoConfig) {
    const title = lang === "en" ? promoConfig.titleEn : promoConfig.titleFr;
    if (title && String(title).trim()) promoTitle.textContent = String(title).trim();
  }
  if (typeof window.renderAdminList === "function") {
    window.renderAdminList();
  }
}

function initLanguageSwitcher() {
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", function () {
      setLanguage(String(btn.getAttribute("data-lang")));
    });
  });
}

let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (!Array.isArray(cart)) cart = [];
} catch {
  cart = [];
}

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");
const search = document.getElementById("search");
const productList = document.getElementById("product-list");
const popularProducts = document.getElementById("popular-products");
let promoConfig = {
  enabled: true,
  titleFr: null,
  titleEn: null,
  endAt: null
};

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  return response;
}

async function isAdminAuthenticated() {
  try {
    const response = await apiRequest("/api/auth/status");
    if (!response.ok) return false;
    const data = await response.json();
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
}

async function loginAdmin(id, password) {
  const response = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ id, password })
  });
  return response.ok;
}

async function logoutAdmin() {
  await apiRequest("/api/auth/logout", { method: "POST" });
}

async function initAdminNavVisibility() {
  const adminLinks = document.querySelectorAll('a[href="admin.html"]');
  if (adminLinks.length === 0) return;
  const onAdminPage = window.location.pathname.endsWith("/admin.html") || window.location.pathname.endsWith("\\admin.html");
  const show = onAdminPage || (await isAdminAuthenticated());
  adminLinks.forEach((link) => {
    link.style.display = show ? "" : "none";
  });
}

function getProductBadge(index, isPopular) {
  if (isPopular || index === 0) return t("product_badge_best");
  if (index < 3) return t("product_badge_new");
  return t("product_badge_available");
}

function renderProductCard(product, index, isPopular = false) {
  const div = document.createElement("div");
  div.className = "product reveal-on-scroll";

  const badge = document.createElement("span");
  badge.className = "product-badge";
  badge.textContent = getProductBadge(index, isPopular);

  const media = document.createElement("div");
  media.className = "product-media";

  const img = document.createElement("img");
  img.src = product.img;
  img.alt = product.name;
  img.loading = "lazy";
  media.appendChild(img);

  const h3 = document.createElement("h3");
  h3.textContent = product.name;

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = product.price + " FCFA";

  const btn = document.createElement("button");
  btn.className = "buy";
  btn.type = "button";
  btn.textContent = t("buy");
  btn.dataset.name = product.name;
  btn.dataset.price = String(product.price);

  div.appendChild(badge);
  div.appendChild(media);
  div.appendChild(h3);
  div.appendChild(price);
  div.appendChild(btn);

  return div;
}

function initProductTilt() {
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const cards = document.querySelectorAll(".product");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * 6;
      const ry = (x - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initRevealOnScroll() {
  const els = document.querySelectorAll(".reveal-on-scroll");
  if (els.length === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => observer.observe(el));
}

function initPromoCountdown() {
  const promoStrip = document.querySelector(".promo-strip");
  if (!promoStrip) return;
  if (!promoConfig.enabled) {
    promoStrip.classList.add("is-hidden");
    return;
  }

  const promoTitle = promoStrip.querySelector(".promo-title");
  if (promoTitle) {
    const title = currentLanguage === "en" ? promoConfig.titleEn : promoConfig.titleFr;
    if (title && String(title).trim()) promoTitle.textContent = String(title).trim();
  }

  const el = document.getElementById("promo-countdown");
  if (!el) return;

  let target;
  if (promoConfig.endAt) {
    target = new Date(promoConfig.endAt);
    localStorage.removeItem("promoEndAt");
  } else {
    const stored = localStorage.getItem("promoEndAt");
    if (stored) {
      target = new Date(Number(stored));
    } else {
      target = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000));
      localStorage.setItem("promoEndAt", String(target.getTime()));
    }
  }

  if (Number.isNaN(target.getTime())) {
    el.textContent = "--:--:--";
    return;
  }

  function tick() {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) {
      el.textContent = "00:00:00";
      return;
    }
    const totalSec = Math.floor(diff / 1000);
    const h = String(Math.floor((totalSec % 86400) / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const s = String(totalSec % 60).padStart(2, "0");
    el.textContent = `${h}:${m}:${s}`;
  }

  tick();
  if (window._promoInterval) clearInterval(window._promoInterval);
  window._promoInterval = setInterval(tick, 1000);
}

async function loadPublicConfig() {
  try {
    const response = await apiRequest("/api/public-config");
    if (!response.ok) return;
    const data = await response.json();
    const promo = data && data.promo ? data.promo : {};
    promoConfig = {
      enabled: promo.enabled !== false,
      titleFr: typeof promo.titleFr === "string" ? promo.titleFr : null,
      titleEn: typeof promo.titleEn === "string" ? promo.titleEn : null,
      endAt: typeof promo.endAt === "string" ? promo.endAt : null
    };
  } catch {
    // Keep defaults when config endpoint is unavailable.
  }
}

if (cartCount) {
  const count = cart.reduce((n, item) => n + (item.qty || 1), 0);
  cartCount.textContent = count;
}

async function loadProductsFromApi() {
  try {
    const response = await apiRequest("/api/products");
    if (!response.ok) throw new Error("API products unavailable");
    const data = await response.json();
    return Array.isArray(data.products) ? data.products : [];
  } catch {
    return Array.isArray(window.CATALOG) ? window.CATALOG : [];
  }
}

let allProducts = [];

function renderProductList(filter) {
  if (!productList) return;
  const filtered = filter ? allProducts.filter(p => p.category === filter) : allProducts;
  productList.innerHTML = "";
  if (filtered.length === 0) {
    productList.innerHTML = '<p class="loading-hint">Aucun produit dans cette catégorie.</p>';
  } else {
    filtered.forEach((product, index) => {
      productList.appendChild(renderProductCard(product, index, false));
    });
  }
  initRevealOnScroll();
  initProductTilt();
}

async function initProductViews() {
  if (popularProducts) popularProducts.innerHTML = '<p class="loading-hint">Chargement…</p>';
  if (productList) productList.innerHTML = '<p class="loading-hint">Chargement…</p>';
  allProducts = await loadProductsFromApi();
  if (popularProducts) {
    popularProducts.innerHTML = "";
    allProducts.slice(0, 3).forEach((product, index) => {
      popularProducts.appendChild(renderProductCard(product, index, true));
    });
  }
  if (productList) {
    renderProductList("");
  }

  const catBtns = document.querySelectorAll(".cat-btn");
  catBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      catBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      renderProductList(this.dataset.cat);
      if (search) search.value = "";
    });
  });
}

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".buy");
  if (!btn) return;

  const name = btn.dataset.name;
  const price = parseInt(btn.dataset.price, 10);
  if (!name || !Number.isFinite(price)) return;

  const existing = cart.find((item) => item.name === name && item.price === price);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (cartCount) {
    cartCount.textContent = cart.reduce((n, item) => n + (item.qty || 1), 0);
  }

  showToast(name + " " + t("added_to_cart"), "success");
});

function renderCartItems() {
  if (!cartItems) return;
  const cartEmptyEl = document.getElementById("cart-empty");
  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach((item, index) => {
    const qty = Math.max(1, Math.floor(item.qty || 1));
    const lineTotal = item.price * qty;
    sum += lineTotal;

    const li = document.createElement("li");
    li.className = "cart-line";

    const span = document.createElement("span");
    span.className = "cart-line-text";
    span.textContent = item.name + " × " + qty + " — " + lineTotal + " FCFA";

    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "btn-remove";
    rm.dataset.index = String(index);
    rm.textContent = t("remove");

    li.appendChild(span);
    li.appendChild(rm);
    cartItems.appendChild(li);
  });

  if (total) total.textContent = sum;
  if (cartEmptyEl) cartEmptyEl.style.display = cart.length === 0 ? "" : "none";
  if (cartCount) cartCount.textContent = cart.reduce((n, item) => n + (item.qty || 1), 0);
}

if (cartItems) {
  renderCartItems();
  cartItems.addEventListener("click", function (e) {
    const removeBtn = e.target.closest(".btn-remove");
    if (!removeBtn) return;
    const index = parseInt(removeBtn.dataset.index, 10);
    if (Number.isFinite(index)) removeItem(index);
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
}

function clearCart() {
  cart = [];
  localStorage.removeItem("cart");
  renderCartItems();
}

function checkout() {
  if (cart.length === 0) {
    showToast(t("cart_empty_alert"), "error");
    return;
  }

  const lines = [t("order_title"), ""];
  let sum = 0;

  cart.forEach((item) => {
    const qty = item.qty || 1;
    const line = item.price * qty;
    sum += line;
    lines.push(`${item.name} × ${qty} — ${line} FCFA`);
  });

  lines.push("");
  lines.push(t("order_total") + " : " + sum + " FCFA");

  const phone = String(WHATSAPP_NUMBER).replace(/\D/g, "");
  const text = lines.join("\n");
  window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(text));
}

if (search) {
  let searchTimer = null;
  search.addEventListener("keyup", function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      const filter = search.value.toLowerCase();
      const items = document.querySelectorAll("#product-list .product");
      items.forEach((product) => {
        const text = product.innerText.toLowerCase();
        product.style.display = text.includes(filter) ? "" : "none";
      });
    }, 250);
  });
}

function formatPhoneDisplay(digits) {
  const d = String(digits).replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("225") && d.length === 13) {
    const rest = d.slice(3);
    const pairs = [];
    for (let i = 0; i < rest.length; i += 2) {
      pairs.push(rest.slice(i, i + 2));
    }
    return "+225 " + pairs.join(" ");
  }
  if (d.startsWith("225") && d.length === 12) {
    const rest = d.slice(3);
    const national = "0" + rest;
    const pairs = [];
    for (let i = 0; i < national.length; i += 2) {
      pairs.push(national.slice(i, i + 2));
    }
    return "+225 " + pairs.join(" ");
  }
  return "+" + d;
}

(function initContactLinks() {
  const wa = document.getElementById("contact-wa");
  const tel = document.getElementById("contact-tel");
  const phone = String(WHATSAPP_NUMBER).replace(/\D/g, "");
  if (!phone) return;
  if (wa) {
    wa.href =
      "https://wa.me/" + phone + "?text=" + encodeURIComponent(t("wa_hello"));
  }
  if (tel) {
    tel.href = "tel:+" + phone;
    const label = formatPhoneDisplay(phone);
    if (label) tel.textContent = label;
  }
  const mail = document.getElementById("contact-mailto");
  if (mail && CONTACT_EMAIL) {
    mail.href = "mailto:" + CONTACT_EMAIL;
    mail.textContent = CONTACT_EMAIL;
  }
})();

(function updateCartEmptyState() {
  const emptyEl = document.getElementById("cart-empty");
  if (!emptyEl || !cartItems) return;
  emptyEl.style.display = cart.length === 0 ? "block" : "none";
})();

function initNavToggle() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("main-nav");
  if (!btn || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? t("close_menu") : t("open_menu"));
  }

  btn.addEventListener("click", function () {
    setOpen(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 720px)").matches) {
        setOpen(false);
      }
    });
  });

  window.addEventListener("resize", function () {
    if (!window.matchMedia("(max-width: 720px)").matches) {
      setOpen(false);
    }
  });
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const subject = String(fd.get("subject") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) {
      alert(t("contact_missing_fields"));
      return;
    }
    const body =
      t("label_name") + " : " +
      name +
      "\n" + t("label_email") + " : " +
      email +
      "\n\n" +
      message;
    const subj = subject || t("contact_mail_subject");
    window.location.href =
      "mailto:" +
      CONTACT_EMAIL +
      "?subject=" +
      encodeURIComponent(subj) +
      "&body=" +
      encodeURIComponent(body);
  });

  const waBtn = document.getElementById("contact-form-whatsapp");
  if (waBtn) {
    waBtn.addEventListener("click", function () {
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const email = String(fd.get("email") || "").trim();
      const subject = String(fd.get("subject") || "").trim();
      const message = String(fd.get("message") || "").trim();
      if (!name || !message) {
        alert(t("wa_missing_fields"));
        return;
      }
      const lines = [
        t("wa_hello").trim(),
        "",
        subject ? t("wa_subject") + " : " + subject : "",
        "",
        t("label_name") + " : " + name,
        email ? t("label_email") + " : " + email : "",
        "",
        message
      ].filter(Boolean);
      const phone = String(WHATSAPP_NUMBER).replace(/\D/g, "");
      window.open(
        "https://wa.me/" + phone + "?text=" + encodeURIComponent(lines.join("\n"))
      );
    });
  }
}

function showToast(message, type) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast" + (type ? " toast--" + type : "");
  toast.textContent = message;
  container.appendChild(toast);
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { toast.classList.add("toast--show"); });
  });
  setTimeout(function () {
    toast.classList.remove("toast--show");
    setTimeout(function () { toast.remove(); }, 300);
  }, 3000);
}

function initSecretAdminAccess() {
  const seq = "gestion";
  let buf = "";
  document.addEventListener("keydown", function (e) {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) return;
    if (e.key.length !== 1) return;
    buf += e.key.toLowerCase();
    if (buf.length > seq.length) buf = buf.slice(-seq.length);
    if (buf === seq) {
      buf = "";
      window.location.href = "/espace-admin-225";
    }
  });
}

initNavToggle();
initContactForm();
initAdminNavVisibility();
initSecretAdminAccess();
initLanguageSwitcher();
applyTranslations();
(async function initPage() {
  await loadPublicConfig();
  initPromoCountdown();
  await initProductViews();
})();

window.isAdminAuthenticated = isAdminAuthenticated;
window.loginAdmin = loginAdmin;
window.logoutAdmin = logoutAdmin;
window.apiRequest = apiRequest;
window.t = t;
window.setLanguage = setLanguage;

// ── Popup vérification d'âge 18+ ─────────────────────────────────────────────
(function initAgePopup() {
  if (sessionStorage.getItem("ageVerified") === "true") return;

  const style = document.createElement("style");
  style.textContent = `
    .age-popup-overlay {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.88);
      display: flex; justify-content: center; align-items: center;
      z-index: 99999;
    }
    .age-popup-content {
      background: #fff; padding: 32px 24px; border-radius: 14px;
      text-align: center; max-width: 380px; width: 90%; box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }
    .age-popup-content h2 { margin-bottom: 14px; font-size: 1.4rem; }
    .age-popup-content p { font-size: 14px; margin-bottom: 22px; line-height: 1.6; color: #444; }
    .age-popup-buttons button {
      margin: 8px; padding: 11px 22px;
      border: none; border-radius: 8px; cursor: pointer;
      font-size: 15px; font-weight: 600;
    }
    .age-popup-buttons .btn-accept { background: #16a34a; color: #fff; }
    .age-popup-buttons .btn-refuse { background: #dc2626; color: #fff; }
  `;
  document.head.appendChild(style);

  const overlay = document.createElement("div");
  overlay.className = "age-popup-overlay";
  overlay.innerHTML = `
    <div class="age-popup-content">
      <h2>🔞 Accès réservé</h2>
      <p>
        Ce site est destiné uniquement aux personnes majeures.<br><br>
        ⚠️ La consommation abusive de chicha est dangereuse pour la santé.<br>
        À consommer avec modération.<br>
        🚫 Interdit aux moins de 18 ans.
      </p>
      <div class="age-popup-buttons">
        <button class="btn-accept" id="age-accept">J'ai 18 ans ou plus</button>
        <button class="btn-refuse" id="age-refuse">Je suis mineur</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("age-accept").addEventListener("click", function () {
    sessionStorage.setItem("ageVerified", "true");
    overlay.remove();
  });

  document.getElementById("age-refuse").addEventListener("click", function () {
    window.location.href = "https://www.google.com";
  });
})();
