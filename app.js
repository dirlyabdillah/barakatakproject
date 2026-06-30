# 🔧 Cara Setup Sync Antar Device — Backend Sendiri

Dashboard ini sekarang pakai **backend milikmu sendiri** (bukan JSONBin atau
layanan pihak ketiga), supaya lebih aman dan tidak ada API key yang kepampang
di kode frontend.

Ada 2 bagian yang perlu dideploy:
1. **Backend** (folder `barakatak-backend`) — tempat data disimpan
2. **Frontend** (folder `barakatak-kpi`, yang sedang kamu lihat ini) — dashboard yang dilihat user

---

## Langkah 1 — Deploy Backend

Buka file `README.md` di dalam folder **`barakatak-backend`** — ada panduan
lengkap deploy ke Render.com (gratis, ~5 menit).

Setelah selesai, kamu akan dapat URL seperti:
```
https://barakatak-backend.onrender.com
```

---

## Langkah 2 — Hubungkan Frontend ke Backend

1. Buka file `js/sync.js` di folder ini (`barakatak-kpi/js/sync.js`)
2. Cari baris:
   ```javascript
   const API_BASE_URL = "GANTI_DENGAN_URL_BACKEND_KAMU";
   ```
3. Ganti dengan URL backend kamu:
   ```javascript
   const API_BASE_URL = "https://barakatak-backend.onrender.com";
   ```
4. Simpan file

---

## Langkah 3 — Re-upload ke Netlify

1. Buka https://app.netlify.com/drop
2. Drag & drop folder `barakatak-kpi` yang sudah diupdate
3. Tunggu sampai selesai, dapat link baru/terupdate

---

## ✅ Selesai!

- Buka link Netlify di HP → isi data → klik **☁️ Simpan & Sync**
- Buka link yang sama di laptop → data langsung muncul
- Polling otomatis tiap 10 detik → perubahan orang lain langsung kelihatan

---

## FAQ

**Q: Kenapa ganti dari JSONBin ke backend sendiri?**
Backend sendiri lebih aman (tidak ada API key pihak ketiga di kode publik),
lebih fleksibel, dan tidak tergantung kebijakan/limit gratisan JSONBin.

**Q: Apakah backend ini sulit di-maintain?**
Tidak. Backend ini sengaja dibuat sederhana (Express.js + file JSON). Setelah
dideploy sekali ke Render, tidak perlu disentuh lagi kecuali mau update kode.

**Q: Backend lambat saat pertama diakses?**
Render free tier "tidur" kalau tidak ada traffic 15 menit. Wajar kalau loading
pertama agak lambat (~30-50 detik), setelah itu normal. Detail di README backend.

**Q: Data hilang setelah backend di-redeploy?**
Render free tier disk-nya tidak permanen. Untuk keamanan data jangka panjang,
backup data secara berkala, atau upgrade ke database (tanya saya kalau perlu).
