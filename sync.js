<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>KPI Dashboard — Barakatak</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body>

  <!-- SETUP BANNER: hilang otomatis setelah dikonfigurasi -->
  <div id="setupBanner" class="setup-banner hidden">
    <div class="setup-banner-inner">
      <span class="setup-icon">⚙️</span>
      <div class="setup-text">
        <strong>Backend belum dikonfigurasi</strong> — Data hanya tersimpan lokal di browser ini.
        Deploy folder <code>barakatak-backend</code>, lalu isi <code>API_BASE_URL</code> di
        <code>js/sync.js</code> agar semua device tersinkron.
      </div>
      <button onclick="document.getElementById('setupBanner').classList.add('hidden')" class="setup-close">✕</button>
    </div>
  </div>

  <!-- HEADER -->
  <header class="site-header">
    <div class="header-inner">
      <div class="header-brand">
        <div class="brand-badge" id="brandBadge">
          <span class="brand-icon" id="brandIcon">◈</span>
          <img id="brandLogoImg" src="" alt="Logo" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:8px;" />
        </div>
        <div>
          <h1 class="brand-title" id="brandTitle">BARAKATAK</h1>
          <p class="brand-sub" id="brandSub">KPI Dashboard — Program Kerja 2026</p>
        </div>
      </div>
      <div class="header-meta">
        <div class="sync-status" id="syncStatus">
          <span class="sync-dot" id="syncDot"></span>
          <span id="syncLabel">Menghubungkan…</span>
        </div>
        <div class="last-update">
          <span class="meta-label">Diperbarui</span>
          <span class="meta-value" id="lastUpdated">—</span>
        </div>
        <button class="btn-customize" onclick="openCustomizeModal()"><span>🎨</span> Kustomisasi</button>
        <button class="btn-save" onclick="pushData()"><span>☁️</span> Simpan & Sync</button>
      </div>
    </div>
  </header>

  <!-- OVERVIEW BAR -->
  <div class="overview-bar">
    <div class="overview-inner">
      <div class="overview-stat" id="ov-overall"><span class="ov-num">0%</span><span class="ov-label">Overall Progress</span></div>
      <div class="overview-divider"></div>
      <div class="overview-stat" id="ov-done"><span class="ov-num">0</span><span class="ov-label">KPI Selesai</span></div>
      <div class="overview-divider"></div>
      <div class="overview-stat" id="ov-total"><span class="ov-num">0</span><span class="ov-label">Total KPI</span></div>
      <div class="overview-divider"></div>
      <div class="overview-stat" id="ov-risk"><span class="ov-num">0</span><span class="ov-label">Risiko Aktif</span></div>
      <div class="overview-divider"></div>
      <div class="overview-stat" id="ov-budget"><span class="ov-num">0%</span><span class="ov-label">Realisasi Budget</span></div>
    </div>
  </div>

  <!-- TABS -->
  <nav class="tab-nav">
    <div class="tab-nav-inner">
      <button class="tab-btn active" data-tab="kpi">📊 KPI Divisi</button>
      <button class="tab-btn" data-tab="keuangan">💰 Keuangan</button>
      <button class="tab-btn" data-tab="timeline">📅 Timeline</button>
      <button class="tab-btn" data-tab="links">🔗 Dashboard Link</button>
    </div>
  </nav>

  <main class="main-content">

    <!-- ═══ TAB: KPI DIVISI ═══ -->
    <div id="tab-kpi" class="tab-pane active">
      <div class="section-header">
        <div>
          <h2 class="section-title">Tracking Progress Divisi</h2>
          <p class="section-desc">Klik KPI untuk edit. Setiap divisi punya Risk Management.</p>
        </div>
        <button class="btn-primary" onclick="openAddDivisiModal()">➕ Tambah Divisi</button>
      </div>
      <div class="divisions-grid" id="divisionsGrid"></div>
    </div>

    <!-- ═══ TAB: KEUANGAN ═══ -->
    <div id="tab-keuangan" class="tab-pane hidden">
      <div class="section-header">
        <h2 class="section-title">Tracking Keuangan</h2>
        <p class="section-desc">Catat pemasukan & pengeluaran, upload bukti transaksi.</p>
      </div>
      <div class="budget-summary" id="budgetSummary"></div>

      <div class="card transaction-card">
        <h3 class="card-title">➕ Tambah Transaksi</h3>
        <div class="form-row">
          <div class="form-group"><label>Tanggal</label><input type="date" id="txDate" class="form-input" /></div>
          <div class="form-group"><label>Jenis</label>
            <select id="txType" class="form-input"><option value="in">Pemasukan</option><option value="out">Pengeluaran</option></select>
          </div>
          <div class="form-group"><label>Divisi</label><select id="txDivisi" class="form-input"></select></div>
          <div class="form-group"><label>Kategori</label><input type="text" id="txKategori" class="form-input" placeholder="mis. Konsumsi, Perlengkapan…" /></div>
          <div class="form-group"><label>Keterangan</label><input type="text" id="txKet" class="form-input" placeholder="Detail transaksi" /></div>
          <div class="form-group"><label>Jumlah (Rp)</label><input type="number" id="txAmount" class="form-input" placeholder="0" /></div>
          <div class="form-group">
            <label>Bukti Transaksi</label>
            <label class="btn-upload-sm" for="txBukti">📎 Pilih File</label>
            <input type="file" id="txBukti" accept="image/*,.pdf" style="display:none" onchange="previewBukti(event)" />
            <div id="txBuktiPreview" class="bukti-preview-mini hidden"></div>
          </div>
        </div>
        <button class="btn-primary" onclick="addTransaction()">Tambah Transaksi</button>
      </div>

      <div class="card">
        <div class="card-title-row">
          <h3 class="card-title">📋 Riwayat Transaksi</h3>
          <div class="filter-row">
            <select id="filterDivisi" class="form-input-sm" onchange="renderTransactions()"><option value="">Semua Divisi</option></select>
            <select id="filterType" class="form-input-sm" onchange="renderTransactions()">
              <option value="">Semua Jenis</option><option value="in">Pemasukan</option><option value="out">Pengeluaran</option>
            </select>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Tanggal</th><th>Jenis</th><th>Divisi</th><th>Kategori</th><th>Keterangan</th><th>Jumlah</th><th>Bukti</th><th>Aksi</th></tr></thead>
            <tbody id="txBody"></tbody>
          </table>
        </div>
        <div class="table-footer" id="txFooter"></div>
      </div>
    </div>

    <!-- ═══ TAB: TIMELINE ═══ -->
    <div id="tab-timeline" class="tab-pane hidden">
      <div class="section-header">
        <h2 class="section-title">Timeline Kegiatan</h2>
        <p class="section-desc">Jadwal dan milestone program kerja Barakatak.</p>
      </div>
      <div class="card">
        <h3 class="card-title">➕ Tambah Kegiatan</h3>
        <div class="form-row">
          <div class="form-group"><label>Nama Kegiatan</label><input type="text" id="evName" class="form-input" placeholder="Nama kegiatan" /></div>
          <div class="form-group"><label>Divisi PIC</label><select id="evDivisi" class="form-input"></select></div>
          <div class="form-group"><label>Tanggal Mulai</label><input type="date" id="evStart" class="form-input" /></div>
          <div class="form-group"><label>Tanggal Selesai</label><input type="date" id="evEnd" class="form-input" /></div>
          <div class="form-group"><label>Status</label>
            <select id="evStatus" class="form-input">
              <option value="planned">Direncanakan</option><option value="ongoing">Sedang Berjalan</option>
              <option value="done">Selesai</option><option value="cancelled">Dibatalkan</option>
            </select>
          </div>
          <div class="form-group"><label>Keterangan</label><input type="text" id="evNote" class="form-input" placeholder="Catatan tambahan" /></div>
        </div>
        <button class="btn-primary" onclick="addEvent()">Tambah Kegiatan</button>
      </div>
      <div class="card"><h3 class="card-title">🗓️ Kalender Kegiatan</h3><div id="timelineViz"></div></div>
      <div class="card">
        <h3 class="card-title">📋 Daftar Kegiatan</h3>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr><th>Kegiatan</th><th>Divisi</th><th>Mulai</th><th>Selesai</th><th>Status</th><th>Keterangan</th><th>Aksi</th></tr></thead>
            <tbody id="evBody"></tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ═══ TAB: DASHBOARD LINK ═══ -->
    <div id="tab-links" class="tab-pane hidden">
      <div class="section-header">
        <div>
          <h2 class="section-title">Dashboard Link</h2>
          <p class="section-desc">Kumpulan link spreadsheet, dokumen, drive, atau referensi lainnya.</p>
        </div>
        <button class="btn-primary" onclick="openAddLinkModal()">➕ Tambah Link</button>
      </div>

      <div class="link-filter-row">
        <button class="link-cat-chip active" data-cat="" onclick="filterLinks('')">Semua</button>
        <button class="link-cat-chip" data-cat="spreadsheet" onclick="filterLinks('spreadsheet')">📊 Spreadsheet</button>
        <button class="link-cat-chip" data-cat="dokumen" onclick="filterLinks('dokumen')">📄 Dokumen</button>
        <button class="link-cat-chip" data-cat="drive" onclick="filterLinks('drive')">📁 Drive</button>
        <button class="link-cat-chip" data-cat="form" onclick="filterLinks('form')">📝 Form</button>
        <button class="link-cat-chip" data-cat="lainnya" onclick="filterLinks('lainnya')">🔗 Lainnya</button>
      </div>

      <div class="links-grid" id="linksGrid"></div>
    </div>

  </main>

  <!-- ═══ MODAL: KPI Edit ═══ -->
  <div id="kpiModal" class="modal-overlay hidden" onclick="if(event.target===this)closeModalDirect()">
    <div class="modal-box">
      <div class="modal-header"><h3 id="modalTitle">Edit KPI</h3><button class="modal-close" onclick="closeModalDirect()">✕</button></div>
      <div class="modal-body">
        <div class="form-group"><label>Nama KPI</label><input type="text" id="mKpiName" class="form-input" /></div>
        <div class="form-group"><label>Target</label><input type="text" id="mKpiTarget" class="form-input" placeholder="mis. 100 peserta, 3 sesi" /></div>
        <div class="form-group"><label>Realisasi</label><input type="text" id="mKpiReal" class="form-input" placeholder="Pencapaian saat ini" /></div>
        <div class="form-group">
          <label>Progress (%)</label>
          <input type="range" id="mKpiProgress" class="form-range" min="0" max="100" value="0"
            oninput="document.getElementById('mKpiProgressVal').textContent=this.value+'%'" />
          <span id="mKpiProgressVal" class="range-val">0%</span>
        </div>
        <div class="form-group"><label>Status</label>
          <select id="mKpiStatus" class="form-input">
            <option value="planned">Belum Mulai</option><option value="ongoing">Sedang Berjalan</option>
            <option value="done">Selesai</option><option value="blocked">Terhambat</option>
          </select>
        </div>
        <div class="form-group"><label>Catatan</label><textarea id="mKpiNote" class="form-textarea" placeholder="Update terbaru, kendala, dll…"></textarea></div>
      </div>
      <div class="modal-footer">
        <button class="btn-danger-outline" onclick="deleteCurrentKpi()">🗑️ Hapus KPI</button>
        <button class="btn-secondary" onclick="closeModalDirect()">Batal</button>
        <button class="btn-primary" onclick="saveKpiEdit()">Simpan</button>
      </div>
    </div>
  </div>

  <!-- ═══ MODAL: Tambah Divisi ═══ -->
  <div id="addDivisiModal" class="modal-overlay hidden" onclick="if(event.target===this)closeAddDivisiModal()">
    <div class="modal-box">
      <div class="modal-header"><h3>➕ Tambah Divisi Baru</h3><button class="modal-close" onclick="closeAddDivisiModal()">✕</button></div>
      <div class="modal-body">
        <div class="form-group"><label>Nama Divisi</label><input type="text" id="newDivName" class="form-input" placeholder="mis. Dana, Kesekretariatan…" maxlength="30" /></div>
        <div class="form-group"><label>Tagline / Deskripsi</label><input type="text" id="newDivTagline" class="form-input" placeholder="mis. Pengelolaan Keuangan & Dana" maxlength="60" /></div>
        <div class="form-group">
          <label>Ikon Divisi</label>
          <div class="emoji-picker-row" id="newDivEmojiGrid"></div>
          <span id="newDivEmojiSelected" style="font-size:28px;margin-top:6px;display:inline-block">📋</span>
        </div>
        <div class="form-group">
          <label>Warna Header Kartu</label>
          <div class="color-input-row">
            <input type="color" id="newDivColor" class="color-picker" value="#2C3E50" />
            <input type="text" id="newDivColorHex" class="form-input color-hex" value="#2C3E50"
              oninput="syncColorFromHexSimple('newDivColor','newDivColorHex')" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" onclick="closeAddDivisiModal()">Batal</button>
        <button class="btn-primary" onclick="confirmAddDivisi()">✅ Tambah Divisi</button>
      </div>
    </div>
  </div>

  <!-- ═══ MODAL: Risk Management ═══ -->
  <div id="riskModal" class="modal-overlay hidden" onclick="if(event.target===this)closeRiskModal()">
    <div class="modal-box modal-box-wide">
      <div class="modal-header"><h3 id="riskModalTitle">Risk Management</h3><button class="modal-close" onclick="closeRiskModal()">✕</button></div>
      <div class="modal-body">
        <div class="risk-add-form">
          <div class="form-row" style="margin-bottom:10px">
            <div class="form-group" style="flex:2;min-width:180px"><label>Deskripsi Risiko</label><input type="text" id="rNewDesc" class="form-input" placeholder="Apa yang bisa jadi risiko?" /></div>
            <div class="form-group"><label>Level</label>
              <select id="rNewLevel" class="form-input">
                <option value="low">🟢 Rendah</option><option value="medium">🟡 Sedang</option><option value="high">🔴 Tinggi</option>
              </select>
            </div>
            <div class="form-group" style="flex:2;min-width:180px"><label>Mitigasi</label><input type="text" id="rNewMitigasi" class="form-input" placeholder="Langkah pencegahan / penanganan" /></div>
            <div class="form-group"><label>Status</label>
              <select id="rNewStatus" class="form-input">
                <option value="open">Terbuka</option><option value="mitigated">Dimitigasi</option><option value="closed">Selesai</option>
              </select>
            </div>
          </div>
          <button class="btn-primary" onclick="addRisk()">➕ Tambah Risiko</button>
        </div>
        <div class="table-wrap" style="margin-top:16px">
          <table class="data-table">
            <thead><tr><th>#</th><th>Deskripsi Risiko</th><th>Level</th><th>Mitigasi</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody id="riskBody"></tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer"><button class="btn-primary" onclick="closeRiskModal()">Tutup</button></div>
    </div>
  </div>

  <!-- ═══ MODAL: Preview Bukti ═══ -->
  <div id="buktiModal" class="modal-overlay hidden" onclick="if(event.target===this)closeBuktiModal()">
    <div class="modal-box" style="max-width:700px">
      <div class="modal-header"><h3>🖼️ Bukti Transaksi</h3><button class="modal-close" onclick="closeBuktiModal()">✕</button></div>
      <div class="modal-body" style="align-items:center">
        <img id="buktiModalImg" src="" style="max-width:100%;border-radius:8px;display:none" />
        <div id="buktiModalPdf" style="display:none;color:#888;text-align:center;padding:20px">
          <div style="font-size:48px">📄</div>
          <div>File PDF — tidak dapat dipreview</div>
          <a id="buktiModalPdfLink" href="" download class="btn-primary" style="display:inline-block;margin-top:12px;text-decoration:none">⬇️ Download PDF</a>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══ MODAL: Kustomisasi ═══ -->
  <div id="customizeModal" class="modal-overlay hidden" onclick="if(event.target===this)closeCustomizeModalDirect()">
    <div class="modal-box modal-box-wide">
      <div class="modal-header"><h3>🎨 Kustomisasi Tampilan</h3><button class="modal-close" onclick="closeCustomizeModalDirect()">✕</button></div>
      <div class="modal-body">
        <div class="cust-section">
          <div class="cust-section-label">🖼️ Logo Aplikasi</div>
          <div class="logo-preview-row">
            <div class="logo-preview-box" id="logoPreviewBox"><span id="logoPreviewIcon">◈</span><img id="logoPreviewImg" src="" alt="" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:10px;" /></div>
            <div class="logo-actions">
              <label class="btn-upload" for="logoFileInput">📁 Upload Gambar Logo</label>
              <input type="file" id="logoFileInput" accept="image/*" style="display:none" onchange="handleLogoUpload(event)" />
              <div class="logo-tip">JPG, PNG, SVG · Maks 2MB · Disarankan ukuran persegi</div>
              <div class="logo-emoji-row"><div class="logo-emoji-label">Atau pilih ikon:</div><div class="emoji-grid" id="emojiGrid"></div></div>
              <button class="btn-icon-sm btn-danger" onclick="resetLogo()">🗑️ Hapus Logo</button>
            </div>
          </div>
        </div>
        <div class="cust-section">
          <div class="cust-section-label">✏️ Teks Header</div>
          <div class="form-row" style="margin-bottom:0">
            <div class="form-group"><label>Nama Aplikasi</label><input type="text" id="custAppName" class="form-input" placeholder="BARAKATAK" maxlength="30" /></div>
            <div class="form-group"><label>Subtitle</label><input type="text" id="custSubtitle" class="form-input" placeholder="KPI Dashboard — Program Kerja 2026" maxlength="60" /></div>
            <div class="form-group"><label>Tab: KPI Divisi</label><input type="text" id="custTab1" class="form-input" placeholder="📊 KPI Divisi" maxlength="30" /></div>
            <div class="form-group"><label>Tab: Keuangan</label><input type="text" id="custTab2" class="form-input" placeholder="💰 Keuangan" maxlength="30" /></div>
            <div class="form-group"><label>Tab: Timeline</label><input type="text" id="custTab3" class="form-input" placeholder="📅 Timeline" maxlength="30" /></div>
          </div>
        </div>
        <div class="cust-section">
          <div class="cust-section-label">🎨 Warna Tema</div>
          <div class="theme-presets"><div class="preset-label">Preset Tema:</div><div class="preset-grid" id="presetGrid"></div></div>
          <div class="form-row" style="margin-top:14px;margin-bottom:0">
            <div class="form-group"><label>Warna Header</label><div class="color-input-row"><input type="color" id="custColorHeader" class="color-picker" value="#1A3A2A" oninput="previewTheme()" /><input type="text" id="custColorHeaderHex" class="form-input color-hex" placeholder="#1A3A2A" oninput="syncColorFromHex('custColorHeader','custColorHeaderHex')" /></div></div>
            <div class="form-group"><label>Warna Aksen</label><div class="color-input-row"><input type="color" id="custColorAccent" class="color-picker" value="#D4A843" oninput="previewTheme()" /><input type="text" id="custColorAccentHex" class="form-input color-hex" placeholder="#D4A843" oninput="syncColorFromHex('custColorAccent','custColorAccentHex')" /></div></div>
            <div class="form-group"><label>Warna Background</label><div class="color-input-row"><input type="color" id="custColorBg" class="color-picker" value="#F5F0E8" oninput="previewTheme()" /><input type="text" id="custColorBgHex" class="form-input color-hex" placeholder="#F5F0E8" oninput="syncColorFromHex('custColorBg','custColorBgHex')" /></div></div>
            <div class="form-group"><label>Warna Tombol</label><div class="color-input-row"><input type="color" id="custColorBtn" class="color-picker" value="#2D5A3D" oninput="previewTheme()" /><input type="text" id="custColorBtnHex" class="form-input color-hex" placeholder="#2D5A3D" oninput="syncColorFromHex('custColorBtn','custColorBtnHex')" /></div></div>
          </div>
        </div>
        <div class="cust-section">
          <div class="cust-section-label">👁️ Preview Header</div>
          <div class="header-preview" id="headerPreview">
            <div class="hp-badge" id="hpBadge"><span id="hpIcon">◈</span><img id="hpImg" src="" alt="" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:6px;" /></div>
            <div><div class="hp-title" id="hpTitle">BARAKATAK</div><div class="hp-sub" id="hpSub">KPI Dashboard — Program Kerja 2026</div></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-secondary" onclick="resetCustomize()">↺ Reset Default</button>
        <button class="btn-secondary" onclick="closeCustomizeModalDirect()">Batal</button>
        <button class="btn-primary" onclick="applyCustomize()">✅ Terapkan</button>
      </div>
    </div>
  </div>

  <!-- ═══ MODAL: Tambah/Edit Link ═══ -->
  <div id="linkModal" class="modal-overlay hidden" onclick="if(event.target===this)closeLinkModal()">
    <div class="modal-box">
      <div class="modal-header"><h3 id="linkModalTitle">➕ Tambah Link</h3><button class="modal-close" onclick="closeLinkModal()">✕</button></div>
      <div class="modal-body">
        <div class="form-group">
          <label>Judul</label>
          <input type="text" id="lkTitle" class="form-input" placeholder="mis. Database Sponsor P2M 2026" />
        </div>
        <div class="form-group">
          <label>URL</label>
          <input type="url" id="lkUrl" class="form-input" placeholder="https://docs.google.com/spreadsheets/…" />
        </div>
        <div class="form-group">
          <label>Kategori</label>
          <select id="lkCategory" class="form-input">
            <option value="spreadsheet">📊 Spreadsheet</option>
            <option value="dokumen">📄 Dokumen</option>
            <option value="drive">📁 Drive</option>
            <option value="form">📝 Form</option>
            <option value="lainnya">🔗 Lainnya</option>
          </select>
        </div>
        <div class="form-group">
          <label>Divisi Terkait (opsional)</label>
          <select id="lkDivisi" class="form-input"><option value="">— Tidak terkait divisi —</option></select>
        </div>
        <div class="form-group">
          <label>Catatan (opsional)</label>
          <textarea id="lkNote" class="form-textarea" placeholder="Deskripsi singkat tentang link ini…"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn-danger-outline hidden" id="lkDeleteBtn" onclick="deleteCurrentLink()">🗑️ Hapus</button>
        <button class="btn-secondary" onclick="closeLinkModal()">Batal</button>
        <button class="btn-primary" onclick="saveLink()">✅ Simpan</button>
      </div>
    </div>
  </div>

  <script src="js/data.js"></script>
  <script src="js/sync.js"></script>
  <script src="js/app.js"></script>
  <script src="js/customize.js"></script>
</body>
</html>
