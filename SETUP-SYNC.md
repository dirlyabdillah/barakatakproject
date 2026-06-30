// ============================================================
//  server.js — Backend Barakatak KPI Dashboard
//  Express + penyimpanan file JSON (sederhana, tanpa database)
// ============================================================

const express = require("express");
const cors    = require("cors");
const fs      = require("fs");
const path    = require("path");

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Lokasi file data ───────────────────────────────────────
const DATA_DIR  = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ── Default data kalau file belum ada ──────────────────────
const DEFAULT_STORE = {
  divisions: [
    { id: "humas",    name: "Humas",    tagline: "Hubungan Masyarakat & Publikasi", icon: "📣", color: "#1A3A2A",
      kpis: [
        { id:"h1", name:"Jumlah Peserta Terdaftar", target:"150 peserta", realisasi:"", progress:0, status:"planned", note:"" },
        { id:"h2", name:"Jangkauan Media Sosial",  target:"5.000 reach",  realisasi:"", progress:0, status:"planned", note:"" },
      ], risks: [] },
    { id: "acara",    name: "Acara",    tagline: "Koordinasi & Pelaksanaan Kegiatan", icon: "🎪", color: "#7D3C98",
      kpis: [
        { id:"a1", name:"Rundown Acara Final", target:"H-7 selesai", realisasi:"", progress:0, status:"planned", note:"" },
      ], risks: [] },
    { id: "mentor",   name: "Mentor",   tagline: "Pembinaan & Pendampingan Peserta", icon: "🎓", color: "#1A5276", kpis: [], risks: [] },
    { id: "tatib",    name: "Tatib",    tagline: "Tata Tertib & Ketertiban",         icon: "🛡️", color: "#784212", kpis: [], risks: [] },
    { id: "logistik", name: "Logistik", tagline: "Perlengkapan & Akomodasi",         icon: "📦", color: "#117A65", kpis: [], risks: [] },
    { id: "medis",    name: "Medis",    tagline: "Kesehatan & Keselamatan Peserta",  icon: "🏥", color: "#C0392B", kpis: [], risks: [] },
    { id: "pdd",      name: "PDD",      tagline: "Pubdok & Desain",                  icon: "📸", color: "#2C3E50", kpis: [], risks: [] },
  ],
  transactions: [],
  events: [],
  totalBudget: 5000000,
  dashLinks: [],
  updatedAt: new Date().toISOString(),
};

// ── Helper baca/tulis file ──────────────────────────────────
function readStore() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_STORE, null, 2));
      return DEFAULT_STORE;
    }
    const raw = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Gagal baca store:", e);
    return DEFAULT_STORE;
  }
}

function writeStore(data) {
  data.updatedAt = new Date().toISOString();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  return data;
}

// ── Middleware ───────────────────────────────────────────────
app.use(cors());                          // izinkan diakses dari domain manapun (Netlify, dll)
app.use(express.json({ limit: "15mb" })); // limit besar karena ada upload bukti transaksi base64

// ── Optional: API Key sederhana (opsional, lihat .env.example) ──
const API_KEY = process.env.API_KEY || ""; // kalau diisi, semua request wajib sertakan header X-Api-Key

function checkApiKey(req, res, next) {
  if (!API_KEY) return next(); // kalau tidak diset, bebas akses (untuk kemudahan setup awal)
  const key = req.headers["x-api-key"];
  if (key !== API_KEY) return res.status(401).json({ error: "Unauthorized: API key salah atau tidak ada" });
  next();
}

// ── ROUTES ───────────────────────────────────────────────────

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Barakatak KPI Backend berjalan 🎉", time: new Date().toISOString() });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// GET semua data
app.get("/api/data", checkApiKey, (req, res) => {
  const store = readStore();
  res.json(store);
});

// PUT (replace) semua data — dipakai dashboard untuk simpan & sync
app.put("/api/data", checkApiKey, (req, res) => {
  try {
    const incoming = req.body;
    if (!incoming || typeof incoming !== "object") {
      return res.status(400).json({ error: "Body harus berupa object JSON" });
    }
    const saved = writeStore(incoming);
    res.json({ status: "saved", updatedAt: saved.updatedAt });
  } catch (e) {
    console.error("Gagal simpan:", e);
    res.status(500).json({ error: "Gagal menyimpan data", detail: e.message });
  }
});

// Reset ke default (opsional, untuk debugging)
app.post("/api/reset", checkApiKey, (req, res) => {
  const saved = writeStore(DEFAULT_STORE);
  res.json({ status: "reset", updatedAt: saved.updatedAt });
});

// ── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Barakatak Backend jalan di port ${PORT}`);
  console.log(`   Data disimpan di: ${DATA_FILE}`);
});
