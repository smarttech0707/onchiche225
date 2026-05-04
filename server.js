const fs = require("fs");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
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

// ── MongoDB ──────────────────────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || "";
const USE_MONGO = !!MONGODB_URI;

const productSchema = new mongoose.Schema({
  id:    { type: String, required: true, unique: true },
  name:  { type: String, required: true },
  price: { type: Number, required: true },
  img:   { type: String, required: true }
});
const Product = mongoose.model("Product", productSchema);

if (USE_MONGO) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB connecté"))
    .catch(err => console.error("Erreur MongoDB:", err.message));
}

// ── Fallback fichier JSON ─────────────────────────────────────────────────────
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

if (!USE_MONGO) initProductsStore();

function readProductsFile() {
  try {
    const raw = fs.readFileSync(PRODUCTS_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeProductsFile(products) {
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2), "utf8");
}

// ── Cloudinary ────────────────────────────────────────────────────────────────
const CLOUDINARY_CONFIGURED = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (CLOUDINARY_CONFIGURED) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
}

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "onchiche225", resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}

const UPLOADS_DIR = path.join(__dirname, "uploads");
if (!CLOUDINARY_CONFIGURED) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Seules les images sont acceptées"));
  }
});

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(cookieParser());
if (!CLOUDINARY_CONFIGURED) app.use("/uploads", express.static(UPLOADS_DIR));

// ── Auth helpers ──────────────────────────────────────────────────────────────
function createAdminToken() {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "8h" });
}

function authRequired(req, res, next) {
  const token = req.cookies[TOKEN_COOKIE];
  if (!token) return res.status(401).json({ error: "Non authentifie" });
  try {
    jwt.verify(token, JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: "Session invalide" });
  }
}

// ── Routes ────────────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ ok: true, db: USE_MONGO ? "mongodb" : "file" });
});

app.get("/api/products", async (req, res) => {
  if (USE_MONGO) {
    const products = await Product.find({}, "-_id id name price img").lean();
    return res.json({ products });
  }
  res.json({ products: readProductsFile() });
});

app.get("/api/public-config", (req, res) => {
  res.json({
    promo: {
      enabled: PROMO_ENABLED,
      titleFr:  PROMO_TITLE_FR,
      titleEn:  PROMO_TITLE_EN,
      endAt:    PROMO_END_AT || null
    }
  });
});

app.post("/api/auth/login", async (req, res) => {
  const { id, password } = req.body || {};
  if (!id || !password) return res.status(400).json({ error: "Identifiants manquants" });

  const idOk   = String(id) === ADMIN_ID;
  const passOk = await bcrypt.compare(String(password), ADMIN_PASSWORD_HASH);
  if (!idOk || !passOk) return res.status(401).json({ error: "Identifiants invalides" });

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

app.post("/api/products", authRequired, upload.single("img"), async (req, res) => {
  const name  = String(req.body?.name || "").trim();
  const price = Number(req.body?.price);

  if (!name || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({ error: "Produit invalide" });
  }

  let img = "https://via.placeholder.com/200/4A6CF7/ffffff?text=Produit";

  if (req.file) {
    try {
      if (CLOUDINARY_CONFIGURED) {
        img = await uploadToCloudinary(req.file.buffer);
      } else {
        const ext = path.extname(req.file.originalname).toLowerCase() || ".jpg";
        const filename = `img_${Date.now()}${Math.random().toString(36).slice(2, 7)}${ext}`;
        fs.writeFileSync(path.join(UPLOADS_DIR, filename), req.file.buffer);
        img = `/uploads/${filename}`;
      }
    } catch (err) {
      console.error("Erreur upload image:", err.message);
      return res.status(500).json({ error: "Echec de l'upload de l'image" });
    }
  }

  const productData = {
    id:    `p${Date.now()}${Math.random().toString(36).slice(2, 7)}`,
    name,
    price: Math.round(price),
    img
  };

  if (USE_MONGO) {
    const product = await new Product(productData).save();
    return res.status(201).json({ product: productData });
  }

  const products = readProductsFile();
  products.push(productData);
  writeProductsFile(products);
  return res.status(201).json({ product: productData });
});

app.delete("/api/products/:id", authRequired, async (req, res) => {
  const id = String(req.params.id || "");

  if (USE_MONGO) {
    const product = await Product.findOneAndDelete({ id });
    if (!product) return res.status(404).json({ error: "Produit introuvable" });
    return res.json({ ok: true });
  }

  const products = readProductsFile();
  const product  = products.find((p) => String(p.id) === id);
  if (!product) return res.status(404).json({ error: "Produit introuvable" });
  if (product.img && product.img.startsWith("/uploads/")) {
    fs.unlink(path.join(__dirname, product.img), () => {});
  }
  writeProductsFile(products.filter((p) => String(p.id) !== id));
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
  if (req.path.startsWith("/api")) return res.status(404).json({ error: "Introuvable" });
  if (req.method === "GET" || req.method === "HEAD") {
    return res.status(404).sendFile(path.join(__dirname, "404.html"));
  }
  return res.status(404).type("text/plain").send("Introuvable");
});

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`Onchiche225 running on http://${HOST}:${PORT}`);
    console.log(`Stockage : ${USE_MONGO ? "MongoDB" : "fichier JSON"}`);
  });
}

module.exports = app;
