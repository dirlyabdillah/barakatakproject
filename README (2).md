# 📊 Barakatak KPI Dashboard — Full Project

Project ini terdiri dari 2 bagian:

```
barakatak-project/
├── backend/              ← Backend Express.js (tempat data disimpan)
│   ├── server.js
│   ├── package.json
│   └── README.md         ← 📖 Panduan deploy backend (BACA INI DULUAN)
│
└── dashboard-frontend/    ← Dashboard yang dilihat user (HTML/CSS/JS)
    ├── index.html
    ├── css/
    ├── js/
    └── SETUP-SYNC.md      ← 📖 Panduan hubungkan frontend ke backend
```

---

## 🚀 Urutan Setup (ikuti berurutan)

### 1️⃣ Deploy Backend dulu
Buka `backend/README.md` → ikuti panduan deploy ke Render.com (gratis).
Setelah selesai, kamu akan punya URL backend, misalnya:
```
https://barakatak-backend.onrender.com
```

### 2️⃣ Hubungkan Frontend ke Backend
Buka `dashboard-frontend/js/sync.js`, isi `API_BASE_URL` dengan URL backend dari langkah 1.

### 3️⃣ Deploy Frontend ke Netlify
Drag & drop folder `dashboard-frontend` ke https://app.netlify.com/drop

### 4️⃣ Selesai!
Bagikan link Netlify ke semua panitia. Semua orang akan melihat data yang sama,
tersinkron otomatis setiap 10 detik.

---

## 🧩 Kenapa dipisah jadi 2 bagian?

- **Backend** menyimpan data — perlu dijalankan terus-menerus di server (Render)
- **Frontend** hanya file statis (HTML/CSS/JS) — bisa dihosting di Netlify gratis
- Keduanya saling terhubung lewat REST API, bukan lewat layanan pihak ketiga
  seperti JSONBin, jadi lebih aman dan sepenuhnya milikmu

Kalau ada pertanyaan saat setup, tanya saja ke Claude lagi dengan menjelaskan
di langkah mana kamu stuck (kasih screenshot kalau ada error).
