# 📊 KPI Dashboard — BARAKATAK

Aplikasi web offline untuk tracking KPI program kerja **Barakatak** (IMAKSI UPI).

## Cara Pakai

1. Buka file `index.html` langsung di browser (Chrome/Firefox/Edge).
2. Tidak perlu server — berjalan 100% offline.
3. Data tersimpan otomatis di **localStorage** browser.
4. Klik tombol **💾 Simpan Semua** untuk memastikan data tersimpan.

---

## Fitur

### 📊 Tab KPI Divisi
- 7 divisi: **Humas, Acara, Mentor, Tatib, Logistik, Medis, PDD**
- Setiap divisi punya 4 KPI default (bisa ditambah)
- Klik KPI → edit target, realisasi, progress (slider 0–100%), status & catatan
- Progress ring otomatis berubah warna: 🔴 <40% | 🟡 40–74% | 🟢 ≥75%
- Tombol **"+ Tambah KPI"** di setiap divisi

### 💰 Tab Keuangan
- Summary kartu: Anggaran, Pemasukan, Pengeluaran, Saldo
- Breakdown per divisi
- Tambah transaksi (Pemasukan/Pengeluaran)
- Filter transaksi by divisi & jenis
- Edit total anggaran via tombol ✏️

### 📅 Tab Timeline
- Gantt chart visual berdasarkan bulan
- Tambah kegiatan dengan tanggal mulai–selesai
- Status: Direncanakan / Sedang Berjalan / Selesai / Dibatalkan
- Update status langsung dari tabel

---

## Struktur File

```
barakatak-kpi/
├── index.html       ← Halaman utama
├── css/
│   └── style.css    ← Semua styling
├── js/
│   ├── data.js      ← Data default & seed
│   └── app.js       ← Logika aplikasi
└── README.md
```

## Kustomisasi

### Ubah Data Default
Edit file `js/data.js`:
- **`DEFAULT_DIVISIONS`** — ubah nama divisi, icon, KPI awal
- **`DEFAULT_BUDGET.total`** — ganti dengan total RAB aktual (dalam Rupiah)
- **`DEFAULT_EVENTS`** — jadwal kegiatan awal

### Reset Data
Buka DevTools browser → Application → localStorage → hapus entri `barakatak_*`

---

*Dibuat untuk IMAKSI UPI — Program Kerja Barakatak 2026*
