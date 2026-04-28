const fs = require("fs");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const ADMIN_ID = process.env.ADMIN_ID || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "change-me";
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);
const JWT_SECRET = process.env.JWT_SECRET || "change-this-super-secret-key";
const ADMIN_PAGE_PATH = String(process.env.ADMIN_PAGE_PATH || "/espace-admin-225");
const ADMIN_PAGE_KEY = String(process.env.ADMIN_PAGE_KEY || "");
const PROMO_ENABLED = String(process.env.PROMO_ENABLED || "true").toLowerCase() !== "false";
const PROMO_TITLE_FR = String(process.env.PROMO_TITLE_FR || "Offre Flash -10% cette semaine");
const PROMO_TITLE_EN = String(process.env.PROMO_TITLE_EN || "Flash Deal -10% this week");
const PROMO_END_AT = String(process.env.PROMO_END_AT || "");
const TOKEN_COOKIE = "admin_token";

function resolveProductsPath() {
  const custom = process.env.PRODUCTS_FILE;
  if (custom && String(custom).trim()) {
    const p = String(custom).trim();
    return path.isAbsolute(p) ? p : path.join(__dirname, p);
  }
  return path.join(__dirname, "data", "products.json");
}

const PRODUCTS_PATH = resolveProductsPath();
const SEED_PRODUCTS = path.join(__dirname, "data", "products.json");

function initProductsStore() {
  const dir = path.dirname(PRODUCTS_PATH);
  fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(PRODUCTS_PATH)) {
    if (fs.existsSync(SEED_PRODUCTS) && path.resolve(PRODUCTS_PATH) !== path.resolve(SEED_PRODUCTS)) {
      fs.copyFileSync(SEED_PRODUCTS, PRODUCTS_PATH);
    } else {
      fs.writeFileSync(PRODUCTS_PATH, "[]", "utf8");
    }
  }
}

initProductsStore();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(cookieParser());

function readProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeProducts(products) {
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2), "utf8");
}

function createAdminToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "8h" });
}

function authRequired(req, res, next) {
  const token = req.cookies[TOKEN_COOKIE];
  if (!token) {
    return res.status(401).json({ error: "Non authentifie" });
  }
  try {
    jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: "Session invalide" });
  }
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/products", (req, res) => {
  res.json({ products: readProducts() });
});

app.get("/api/public-config", (req, res) => {
  res.json({
    promo: {
      enabled: PROMO_ENABLED,
      titleFr: PROMO_TITLE_FR,
      titleEn: PROMO_TITLE_EN,
      endAt: PROMO_END_AT || null
    }
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { id, password } = req.body || {};
  if (!id || !password) {
    return res.status(400).json({ error: "Identifiants manquants" });
  }

  const idOk = String(id) === ADMIN_ID;
  const passOk = await bcrypt.compare(String(password), ADMIN_PASSWORD_HASH);
  if (!idOk || !passOk) {
    return res.status(401).json({ error: "Identifiants invalides" });
  }

  const token = createAdminToken();
  res.cookie(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 8 * 60 * 60 * 1000
  });
  return res.json({ ok: true });
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie(TOKEN_COOKIE);
  res.json({ ok: true });
});

app.get("/api/auth/status", (req, res) => {
  const token = req.cookies[TOKEN_COOKIE];
  if (!token) return res.json({ authenticated: false });
  try {
    jwt.verify(token, JWT_SECRET);
    return res.json({ authenticated: true });
  } catch {
    return res.json({ authenticated: false });
  }
});

app.post("/api/products", authRequired, (req, res) => {
  const name = String(req.body?.name || "").trim();
  const img = String(req.body?.img || "").trim();
  const price = Number(req.body?.price);

  if (!name || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({ error: "Produit invalide" });
  }

  const products = readProducts();
  const product = {
    id: `p${Date.now()}${Math.random().toString(36).slice(2, 7)}`,
    name,
    price: Math.round(price),
    img: img || "https://via.placeholder.com/200/4A6CF7/ffffff?text=Produit"
  };
  products.push(product);
  writeProducts(products);

  return res.status(201).json({ product });
});

app.delete("/api/products/:id", authRequired, (req, res) => {
  const id = String(req.params.id || "");
  const products = readProducts();
  const filtered = products.filter((p) => String(p.id) !== id);
  if (filtered.length === products.length) {
    return res.status(404).json({ error: "Produit introuvable" });
  }
  writeProducts(filtered);
  return res.json({ ok: true });
});

app.get("/admin.html", (req, res, next) => {
  if (ADMIN_PAGE_PATH === "/admin.html") return next();
  return res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.get(ADMIN_PAGE_PATH, (req, res) => {
  if (ADMIN_PAGE_KEY && String(req.query.k || "") !== ADMIN_PAGE_KEY) {
    return res.status(404).sendFile(path.join(__dirname, "404.html"));
  }
  return res.sendFile(path.join(__dirname, "admin.html"));
});

app.use(express.static(__dirname));

app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "Introuvable" });
  }
  if (req.method === "GET" || req.method === "HEAD") {
    return res.status(404).sendFile(path.join(__dirname, "404.html"));
  }
  return res.status(404).type("text/plain").send("Introuvable");
});

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`Onchiche225 running on http://${HOST}:${PORT}`);
    if (PRODUCTS_PATH !== SEED_PRODUCTS) {
      console.log(`Catalogue (fichier) : ${PRODUCTS_PATH}`);
    }
  });
}

module.exports = app;
