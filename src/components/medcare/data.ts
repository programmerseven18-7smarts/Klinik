export type MedCarePageType =
  | "schedule"
  | "patient"
  | "exam"
  | "pharmacy"
  | "finance"
  | "master"
  | "report"
  | "settings";

export type MedCareConfig = {
  path: string;
  title: string;
  eyebrow: string;
  description: string;
  type: MedCarePageType;
  primaryAction: string;
  createAction?: string;
  rowAction: "modal" | "route";
  columns: string[];
  rows: string[][];
  formSections: {
    title: string;
    fields: string[];
  }[];
  stats: {
    label: string;
    value: string;
    note: string;
    tone: string;
  }[];
};

const stats = {
  teal: "bg-[#CCFBF1] text-primary",
  sky: "bg-sky-100 text-sky-700",
  green: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  red: "bg-red-100 text-red-700",
};

const patientRows = [
  ["RM-000178", "Budi Santoso", "Laki-laki, 42 th", "0812-3456-7890", "Aktif"],
  ["RM-000089", "Siti Rahma", "Perempuan, 9 th", "0821-9090-1122", "Perlu Kontrol"],
  ["RM-000221", "Rina Kartika", "Perempuan, 31 th", "0878-4412-9081", "Aktif"],
  ["RM-000241", "Agus Pratama", "Laki-laki, 28 th", "0813-2244-9001", "Piutang"],
];

const visitRows = [
  ["ANT-014", "Siti Rahma", "dr. Sinta", "Poli Anak", "Diperiksa"],
  ["ANT-015", "Budi Santoso", "dr. Amelia", "Poli Umum", "Menunggu"],
  ["ANT-016", "Rina Kartika", "dr. Raka", "Poli Gigi", "Check-in"],
  ["ANT-017", "Agus Pratama", "dr. Amelia", "Poli Umum", "Booking"],
];

const medicineRows = [
  ["OBT-001", "Paracetamol 500mg", "24 strip", "BCH-0426-A", "Menipis"],
  ["OBT-014", "Amoxicillin 500mg", "8 strip", "BCH-0426-B", "Kritis"],
  ["OBT-028", "Omeprazole 20mg", "72 strip", "BCH-0426-C", "Aman"],
  ["OBT-036", "Betadine 60ml", "3 botol", "EXP-0526", "Expired Dekat"],
];

const financeRows = [
  ["INV-20260430-018", "Budi Santoso", "Konsultasi + Obat", "Rp 325.000", "Lunas"],
  ["INV-20260430-019", "Siti Rahma", "Tindakan + Resep", "Rp 480.000", "Belum Lunas"],
  ["INV-20260430-020", "Rina Kartika", "Poli Gigi", "Rp 650.000", "Sebagian"],
  ["OUT-20260430-004", "Pembelian Obat", "PT Sehat Farma", "Rp 3.600.000", "Dibayar"],
];

const doctorRows = [
  ["DR-001", "dr. Amelia Putri", "Poli Umum", "08.00-12.00", "Aktif"],
  ["DR-002", "dr. Raka Pratama", "Poli Gigi", "09.00-13.00", "Aktif"],
  ["DR-003", "dr. Sinta Maharani", "Poli Anak", "13.00-17.00", "Aktif"],
  ["DR-004", "dr. Hafiz Ramadhan", "Penyakit Dalam", "By Appointment", "Aktif"],
];

const poliRows = [
  ["POL-001", "Poli Umum", "Rawat Jalan", "Ruang 1", "Aktif"],
  ["POL-002", "Poli Gigi", "Rawat Jalan", "Ruang 2", "Aktif"],
  ["POL-003", "Poli Anak", "Rawat Jalan", "Ruang 3", "Aktif"],
  ["POL-004", "Penyakit Dalam", "Spesialis", "Ruang 4", "Aktif"],
];

const procedureRows = [
  ["TDK-001", "Konsultasi Dokter", "Poli Umum", "Rp 150.000", "Aktif"],
  ["TDK-002", "Nebulizer", "Poli Anak", "Rp 180.000", "Aktif"],
  ["TDK-003", "Tambal Gigi", "Poli Gigi", "Rp 350.000", "Aktif"],
  ["TDK-004", "Pemeriksaan EKG", "Penyakit Dalam", "Rp 250.000", "Aktif"],
];

const supplierRows = [
  ["SUP-001", "PT Sehat Farma", "Obat Generik", "021-8899-1200", "Aktif"],
  ["SUP-002", "CV Medika Jaya", "Alkes", "022-7711-4500", "Aktif"],
  ["SUP-003", "Kimia Distribusi", "Obat Resep", "0812-9090-2211", "Aktif"],
  ["SUP-004", "Prima Lab Supply", "Laboratorium", "021-7733-9800", "Review"],
];

const paymentMethodRows = [
  ["PAY-001", "Tunai", "Cash", "Kas Klinik", "Aktif"],
  ["PAY-002", "QRIS", "Digital", "Bank BCA", "Aktif"],
  ["PAY-003", "Transfer Bank", "Digital", "Bank Mandiri", "Aktif"],
  ["PAY-004", "Asuransi", "Piutang", "Piutang Pasien", "Aktif"],
];

const settingsRows = [
  ["SET-001", "Reminder Kontrol", "Otomasi", "WhatsApp H-1", "Aktif"],
  ["SET-002", "Batas Stok Minimum", "Farmasi", "10 item", "Aktif"],
  ["SET-003", "Nomor Invoice", "Keuangan", "INV-{YYYYMMDD}", "Aktif"],
  ["SET-004", "Brand Klinik", "Profil", "MedCare7", "Aktif"],
];

const reportRows = [
  ["RPT-001", "Kunjungan Pasien", "30 Apr 2026", "284 data", "Siap Export"],
  ["RPT-002", "Pendapatan Klinik", "April 2026", "Rp 68,2 jt", "Final"],
  ["RPT-003", "Penggunaan Obat", "April 2026", "1.248 item", "Review"],
  ["RPT-004", "Performa Dokter", "April 2026", "3 dokter", "Siap Export"],
];

const baseForm = [
  {
    title: "Informasi Utama",
    fields: ["Nama / kode", "Tanggal", "Status", "Catatan"],
  },
];

export const MEDCARE_PAGES: Record<string, MedCareConfig> = {
  "jadwal-pasien": {
    path: "jadwal-pasien",
    title: "Jadwal Pasien",
    eyebrow: "Jadwal & Antrean",
    description: "Kelola booking pasien, check-in, dokter, poli, keluhan awal, dan status jadwal.",
    type: "schedule",
    primaryAction: "Tambah Jadwal",
    createAction: "Buat Jadwal Pasien",
    rowAction: "route",
    columns: ["No. Antrean", "Pasien", "Dokter", "Poli", "Status"],
    rows: visitRows,
    stats: [
      { label: "Booking Hari Ini", value: "48", note: "32 sudah check-in", tone: stats.teal },
      { label: "Menunggu", value: "17", note: "Rata-rata 18 menit", tone: stats.sky },
      { label: "Perlu Reschedule", value: "5", note: "Kontak ulang admin", tone: stats.amber },
    ],
    formSections: [
      { title: "Data Jadwal", fields: ["Pasien", "Dokter", "Poli", "Tanggal kunjungan", "Jam kunjungan"] },
      { title: "Kunjungan", fields: ["Jenis kunjungan", "Keluhan awal", "Catatan admin"] },
    ],
  },
  "jadwal-dokter": {
    path: "jadwal-dokter",
    title: "Jadwal Dokter",
    eyebrow: "Jadwal & Antrean",
    description: "Atur hari praktik, jam praktik, kapasitas slot, dan poli dokter.",
    type: "schedule",
    primaryAction: "Tambah Jadwal Dokter",
    createAction: "Buat Jadwal Dokter",
    rowAction: "route",
    columns: ["Kode", "Dokter", "Poli", "Jam Praktik", "Status"],
    rows: doctorRows,
    stats: [
      { label: "Dokter Praktik", value: "3", note: "Hari ini", tone: stats.teal },
      { label: "Slot Tersedia", value: "21", note: "Sisa kapasitas", tone: stats.sky },
      { label: "Jadwal Penuh", value: "1", note: "Poli Gigi", tone: stats.amber },
    ],
    formSections: [
      { title: "Data Dokter", fields: ["Dokter", "Poli", "Hari praktik", "Jam mulai", "Jam selesai"] },
      { title: "Kapasitas", fields: ["Durasi per pasien", "Maksimum pasien", "Catatan jadwal"] },
    ],
  },
  "antrean-pasien": {
    path: "antrean-pasien",
    title: "Antrean Pasien",
    eyebrow: "Jadwal & Antrean",
    description: "Pantau patient journey dari booking, check-in, menunggu, diperiksa, selesai, hingga perlu kontrol.",
    type: "schedule",
    primaryAction: "Check-in Pasien",
    createAction: "Tambah Antrean",
    rowAction: "route",
    columns: ["No. Antrean", "Pasien", "Dokter", "Poli", "Status"],
    rows: visitRows,
    stats: [
      { label: "Antrean Aktif", value: "17", note: "6 sedang diperiksa", tone: stats.teal },
      { label: "Rata-rata Tunggu", value: "18m", note: "Lebih cepat 7m", tone: stats.green },
      { label: "Perlu Kontrol", value: "9", note: "Dijadwalkan ulang", tone: stats.amber },
    ],
    formSections: [
      { title: "Check-in", fields: ["Pasien", "Nomor antrean", "Poli", "Keluhan awal"] },
      { title: "Routing", fields: ["Dokter", "Ruang pemeriksaan", "Prioritas"] },
    ],
  },
  "follow-up-kontrol": {
    path: "follow-up-kontrol",
    title: "Follow Up Kontrol",
    eyebrow: "Jadwal & Antrean",
    description: "Pantau pasien yang perlu kontrol ulang, reminder terkirim, terlewat, dan jadwal ulang.",
    type: "schedule",
    primaryAction: "Kirim Reminder",
    createAction: "Buat Follow Up",
    rowAction: "route",
    columns: ["No. RM", "Pasien", "Dokter", "Alasan", "Status"],
    rows: [
      ["RM-000089", "Siti Rahma", "dr. Sinta", "Kontrol demam", "Reminder Terkirim"],
      ["RM-000221", "Rina Kartika", "dr. Raka", "Kontrol tambal gigi", "Terjadwal"],
      ["RM-000241", "Agus Pratama", "dr. Amelia", "Evaluasi tensi", "Terlewat"],
      ["RM-000178", "Budi Santoso", "dr. Amelia", "Review obat", "Terjadwal"],
    ],
    stats: [
      { label: "Kontrol Hari Ini", value: "9", note: "5 sudah dikonfirmasi", tone: stats.teal },
      { label: "Reminder Terkirim", value: "21", note: "WhatsApp/SMS", tone: stats.green },
      { label: "Terlewat", value: "3", note: "Butuh follow up", tone: stats.red },
    ],
    formSections: [
      { title: "Jadwal Kontrol", fields: ["Pasien", "Dokter", "Tanggal kontrol", "Alasan kontrol"] },
      { title: "Reminder", fields: ["Channel reminder", "Template pesan", "Status"] },
    ],
  },
  "pasien/data": {
    path: "pasien/data",
    title: "Data Pasien",
    eyebrow: "Pasien",
    description: "Master pasien dengan nomor rekam medis, identitas, kontak, alergi, dan status pasien.",
    type: "patient",
    primaryAction: "Tambah Pasien",
    createAction: "Tambah Pasien",
    rowAction: "route",
    columns: ["No. RM", "Nama", "Profil", "No. HP", "Status"],
    rows: patientRows,
    stats: [
      { label: "Total Pasien", value: "1.284", note: "Aktif", tone: stats.teal },
      { label: "Pasien Baru", value: "38", note: "Bulan ini", tone: stats.sky },
      { label: "Alergi Tercatat", value: "112", note: "Perlu perhatian", tone: stats.amber },
    ],
    formSections: [
      { title: "Identitas Pasien", fields: ["No. rekam medis", "Nama lengkap", "NIK", "Tanggal lahir", "Jenis kelamin"] },
      { title: "Kontak & Risiko", fields: ["No. HP", "Alamat", "Kontak darurat", "Alergi obat", "Riwayat penyakit"] },
    ],
  },
  "pasien/riwayat": {
    path: "pasien/riwayat",
    title: "Riwayat Pasien",
    eyebrow: "Pasien",
    description: "Medical timeline berisi kunjungan, diagnosa, tindakan, resep, file, dan pembayaran.",
    type: "patient",
    primaryAction: "Buka Timeline",
    createAction: "Tambah Catatan Riwayat",
    rowAction: "route",
    columns: ["No. RM", "Pasien", "Kunjungan Terakhir", "Ringkasan", "Status"],
    rows: [
      ["RM-000178", "Budi Santoso", "30 Apr 2026", "ISPA ringan + resep", "Lunas"],
      ["RM-000089", "Siti Rahma", "30 Apr 2026", "Demam + kontrol", "Belum Lunas"],
      ["RM-000221", "Rina Kartika", "29 Apr 2026", "Tambal gigi + foto klinis", "Sebagian"],
      ["RM-000241", "Agus Pratama", "28 Apr 2026", "Cek tensi", "Lunas"],
    ],
    stats: [
      { label: "Kunjungan Bulan Ini", value: "284", note: "Semua poli", tone: stats.teal },
      { label: "Resep Tercatat", value: "198", note: "Terhubung farmasi", tone: stats.sky },
      { label: "File Medis", value: "72", note: "Lab/rujukan/foto", tone: stats.green },
    ],
    formSections: [
      { title: "Filter Timeline", fields: ["Pasien", "Dokter", "Poli", "Rentang tanggal"] },
      { title: "Ringkasan Catatan", fields: ["Keluhan", "Diagnosa", "Tindakan", "Status pembayaran"] },
    ],
  },
  "pasien/file": {
    path: "pasien/file",
    title: "File Pasien",
    eyebrow: "Pasien",
    description: "Patient File Vault untuk hasil lab, surat rujukan, foto klinis, dokumen asuransi, dan surat kontrol.",
    type: "patient",
    primaryAction: "Upload File",
    createAction: "Upload File Pasien",
    rowAction: "route",
    columns: ["No. File", "Pasien", "Kategori", "Tanggal", "Status"],
    rows: [
      ["FILE-001", "Budi Santoso", "Hasil Lab", "30 Apr 2026", "Terverifikasi"],
      ["FILE-002", "Siti Rahma", "Surat Kontrol", "30 Apr 2026", "Draft"],
      ["FILE-003", "Rina Kartika", "Foto Klinis", "29 Apr 2026", "Tersimpan"],
      ["FILE-004", "Agus Pratama", "Dokumen Asuransi", "28 Apr 2026", "Review"],
    ],
    stats: [
      { label: "File Bulan Ini", value: "72", note: "Semua kategori", tone: stats.teal },
      { label: "Perlu Review", value: "8", note: "Dokter/admin", tone: stats.amber },
      { label: "Terverifikasi", value: "64", note: "Siap dipakai", tone: stats.green },
    ],
    formSections: [
      { title: "Upload File", fields: ["Pasien", "Kategori file", "Tanggal upload", "Pengunggah"] },
      { title: "Metadata", fields: ["Nama file", "Catatan", "Visibility", "Status verifikasi"] },
    ],
  },
  "pemeriksaan/kunjungan": {
    path: "pemeriksaan/kunjungan",
    title: "Kunjungan Pasien",
    eyebrow: "Pemeriksaan",
    description: "Daftar pasien yang sedang masuk alur pemeriksaan dokter.",
    type: "exam",
    primaryAction: "Mulai Pemeriksaan",
    createAction: "Buat Kunjungan",
    rowAction: "route",
    columns: ["No. Kunjungan", "Pasien", "Dokter", "Poli", "Status"],
    rows: visitRows,
    stats: [
      { label: "Sedang Diperiksa", value: "6", note: "3 ruang aktif", tone: stats.teal },
      { label: "Draft Rekam Medis", value: "4", note: "Belum final", tone: stats.amber },
      { label: "Selesai Hari Ini", value: "32", note: "Siap invoice", tone: stats.green },
    ],
    formSections: [
      { title: "Kunjungan", fields: ["Pasien", "Dokter", "Poli", "Waktu check-in"] },
      { title: "Status", fields: ["Prioritas", "Ruang pemeriksaan", "Catatan admin"] },
    ],
  },
  "pemeriksaan/rekam-medis": {
    path: "pemeriksaan/rekam-medis",
    title: "Rekam Medis",
    eyebrow: "Pemeriksaan",
    description: "Ruang kerja dokter untuk keluhan, tanda vital, diagnosa, tindakan, resep, file, dan jadwal kontrol.",
    type: "exam",
    primaryAction: "Buat Rekam Medis",
    createAction: "Isi Rekam Medis",
    rowAction: "route",
    columns: ["No. RM", "Pasien", "Dokter", "Diagnosa", "Status"],
    rows: [
      ["RM-000178", "Budi Santoso", "dr. Amelia", "ISPA ringan", "Draft"],
      ["RM-000089", "Siti Rahma", "dr. Sinta", "Demam", "Final"],
      ["RM-000221", "Rina Kartika", "dr. Raka", "Karies gigi", "Final"],
      ["RM-000241", "Agus Pratama", "dr. Amelia", "Hipertensi ringan", "Review"],
    ],
    stats: [
      { label: "Rekam Medis Hari Ini", value: "32", note: "28 final", tone: stats.teal },
      { label: "Draft", value: "4", note: "Perlu dokter", tone: stats.amber },
      { label: "Kontrol Dibuat", value: "9", note: "Follow up aktif", tone: stats.sky },
    ],
    formSections: [
      { title: "SOAP", fields: ["Keluhan utama", "Riwayat penyakit", "Diagnosa", "Catatan dokter"] },
      { title: "Vital Signs", fields: ["Tekanan darah", "Suhu", "Berat badan", "Nadi", "Saturasi oksigen"] },
    ],
  },
  "pemeriksaan/resep-obat": {
    path: "pemeriksaan/resep-obat",
    title: "Resep Obat",
    eyebrow: "Pemeriksaan",
    description: "Prescription Builder untuk obat, dosis, aturan pakai, jumlah, harga, dan warning stok.",
    type: "exam",
    primaryAction: "Buat Resep",
    createAction: "Buat Resep",
    rowAction: "route",
    columns: ["Kode", "Obat", "Stok", "Batch", "Status"],
    rows: medicineRows,
    stats: [
      { label: "Resep Hari Ini", value: "28", note: "24 ditebus", tone: stats.teal },
      { label: "Stok Warning", value: "3", note: "Perlu substitusi", tone: stats.red },
      { label: "Draft Resep", value: "5", note: "Belum dikonfirmasi", tone: stats.amber },
    ],
    formSections: [
      { title: "Prescription Builder", fields: ["Pilih obat", "Dosis", "Aturan pakai", "Jumlah", "Catatan resep"] },
      { title: "Validasi Stok", fields: ["Batch", "Expired date", "Harga", "Warning stok"] },
    ],
  },
  "pemeriksaan/tindakan-medis": {
    path: "pemeriksaan/tindakan-medis",
    title: "Tindakan Medis",
    eyebrow: "Pemeriksaan",
    description: "Catat tindakan medis yang dilakukan dalam kunjungan pasien dan tarifnya.",
    type: "exam",
    primaryAction: "Tambah Tindakan Kunjungan",
    createAction: "Tambah Tindakan Medis",
    rowAction: "route",
    columns: ["Kode", "Tindakan", "Poli", "Tarif", "Status"],
    rows: procedureRows,
    stats: [
      { label: "Tindakan Hari Ini", value: "41", note: "Semua poli", tone: stats.teal },
      { label: "Butuh Review", value: "3", note: "Tarif/manual", tone: stats.amber },
      { label: "Masuk Invoice", value: "38", note: "Siap bayar", tone: stats.green },
    ],
    formSections: [
      { title: "Tindakan", fields: ["Pasien", "Tindakan", "Dokter", "Tarif"] },
      { title: "Catatan", fields: ["Catatan tindakan", "File pendukung", "Status"] },
    ],
  },
  "farmasi/data-obat": {
    path: "farmasi/data-obat",
    title: "Data Obat",
    eyebrow: "Farmasi",
    description: "Master obat, satuan, batch, supplier, harga beli, harga jual, stok minimum, dan expired date.",
    type: "pharmacy",
    primaryAction: "Tambah Obat",
    createAction: "Tambah Obat",
    rowAction: "route",
    columns: ["Kode", "Obat", "Stok", "Batch", "Status"],
    rows: medicineRows,
    stats: [
      { label: "Total Obat", value: "428", note: "Aktif", tone: stats.teal },
      { label: "Menipis", value: "18", note: "Di bawah minimum", tone: stats.amber },
      { label: "Expired Dekat", value: "7", note: "30 hari", tone: stats.red },
    ],
    formSections: [
      { title: "Data Obat", fields: ["Kode obat", "Nama obat", "Kategori", "Satuan", "Supplier"] },
      { title: "Harga & Stok", fields: ["Harga beli", "Harga jual", "Minimum stok", "Expired date"] },
    ],
  },
  "farmasi/stok-masuk": {
    path: "farmasi/stok-masuk",
    title: "Stok Masuk",
    eyebrow: "Farmasi",
    description: "Catat penerimaan obat berdasarkan supplier, batch number, jumlah, harga, dan expired date.",
    type: "pharmacy",
    primaryAction: "Input Stok Masuk",
    createAction: "Input Stok Masuk",
    rowAction: "route",
    columns: ["Kode", "Obat", "Jumlah", "Batch", "Status"],
    rows: medicineRows,
    stats: [
      { label: "Transaksi Masuk", value: "12", note: "Minggu ini", tone: stats.teal },
      { label: "Nilai Pembelian", value: "Rp 18,4 jt", note: "April 2026", tone: stats.sky },
      { label: "Belum Dicek", value: "2", note: "Butuh QC", tone: stats.amber },
    ],
    formSections: [
      { title: "Penerimaan", fields: ["Supplier", "No. faktur", "Tanggal masuk", "Petugas"] },
      { title: "Item Obat", fields: ["Obat", "Batch number", "Jumlah", "Harga beli", "Expired date"] },
    ],
  },
  "farmasi/stok-keluar": {
    path: "farmasi/stok-keluar",
    title: "Stok Keluar",
    eyebrow: "Farmasi",
    description: "Catat obat keluar dari resep, penyesuaian, retur, atau pemakaian internal klinik.",
    type: "pharmacy",
    primaryAction: "Input Stok Keluar",
    createAction: "Input Stok Keluar",
    rowAction: "route",
    columns: ["Kode", "Obat", "Jumlah", "Referensi", "Status"],
    rows: medicineRows,
    stats: [
      { label: "Keluar Hari Ini", value: "91", note: "Item obat", tone: stats.teal },
      { label: "Dari Resep", value: "76", note: "Terkonfirmasi", tone: stats.green },
      { label: "Manual", value: "4", note: "Butuh approval", tone: stats.amber },
    ],
    formSections: [
      { title: "Stok Keluar", fields: ["Obat", "Jumlah", "Sumber keluar", "Referensi resep"] },
      { title: "Approval", fields: ["Petugas", "Catatan", "Status approval"] },
    ],
  },
  "farmasi/mutasi-stok": {
    path: "farmasi/mutasi-stok",
    title: "Mutasi Stok",
    eyebrow: "Farmasi",
    description: "Audit mutasi stok obat dari stok masuk, resep, stok keluar, adjustment, dan retur.",
    type: "pharmacy",
    primaryAction: "Export Mutasi",
    createAction: "Buat Adjustment",
    rowAction: "route",
    columns: ["Kode", "Obat", "Qty", "Batch", "Status"],
    rows: medicineRows,
    stats: [
      { label: "Mutasi Bulan Ini", value: "1.248", note: "Item movement", tone: stats.teal },
      { label: "Adjustment", value: "11", note: "Perlu audit", tone: stats.amber },
      { label: "Akurat", value: "98%", note: "Stock opname", tone: stats.green },
    ],
    formSections: [
      { title: "Filter Mutasi", fields: ["Obat", "Jenis mutasi", "Rentang tanggal", "Batch"] },
      { title: "Adjustment", fields: ["Qty koreksi", "Alasan", "Petugas"] },
    ],
  },
  "farmasi/obat-hampir-habis": {
    path: "farmasi/obat-hampir-habis",
    title: "Obat Hampir Habis",
    eyebrow: "Farmasi",
    description: "Pantau stok di bawah minimum dan buat rencana reorder ke supplier.",
    type: "pharmacy",
    primaryAction: "Buat Pembelian",
    createAction: "Buat Request Pembelian",
    rowAction: "route",
    columns: ["Kode", "Obat", "Sisa Stok", "Supplier", "Status"],
    rows: medicineRows,
    stats: [
      { label: "Menipis", value: "18", note: "Di bawah minimum", tone: stats.amber },
      { label: "Kritis", value: "5", note: "Kurang dari 7 hari", tone: stats.red },
      { label: "Sudah PO", value: "9", note: "Menunggu datang", tone: stats.green },
    ],
    formSections: [
      { title: "Request Pembelian", fields: ["Obat", "Supplier", "Jumlah reorder", "Prioritas"] },
      { title: "Estimasi", fields: ["Harga beli", "Tanggal dibutuhkan", "Catatan"] },
    ],
  },
  "farmasi/obat-expired": {
    path: "farmasi/obat-expired",
    title: "Obat Expired",
    eyebrow: "Farmasi",
    description: "Kelola obat expired dan mendekati expired untuk retur, karantina, atau pemusnahan.",
    type: "pharmacy",
    primaryAction: "Tandai Retur",
    createAction: "Buat Retur/Karantina",
    rowAction: "route",
    columns: ["Kode", "Obat", "Sisa Stok", "Batch", "Status"],
    rows: medicineRows,
    stats: [
      { label: "Expired Dekat", value: "7", note: "30 hari", tone: stats.red },
      { label: "Karantina", value: "3", note: "Tidak boleh dipakai", tone: stats.amber },
      { label: "Diretur", value: "2", note: "Ke supplier", tone: stats.green },
    ],
    formSections: [
      { title: "Retur/Karantina", fields: ["Obat", "Batch", "Expired date", "Alasan"] },
      { title: "Tindak Lanjut", fields: ["Supplier", "Jumlah", "Status", "Catatan"] },
    ],
  },
  "keuangan/invoice": {
    path: "keuangan/invoice",
    title: "Invoice",
    eyebrow: "Keuangan",
    description: "Kelola invoice kunjungan berisi konsultasi, tindakan, obat, diskon, dan status pembayaran.",
    type: "finance",
    primaryAction: "Buat Invoice",
    createAction: "Buat Invoice",
    rowAction: "route",
    columns: ["No. Invoice", "Pasien", "Layanan", "Total", "Status"],
    rows: financeRows,
    stats: [
      { label: "Invoice Hari Ini", value: "34", note: "32 dari kunjungan", tone: stats.teal },
      { label: "Belum Lunas", value: "7", note: "Perlu follow up", tone: stats.amber },
      { label: "Pendapatan", value: "Rp 12,8 jt", note: "Hari ini", tone: stats.green },
    ],
    formSections: [
      { title: "Data Invoice", fields: ["Pasien", "No. kunjungan", "Tanggal", "Status"] },
      { title: "Komponen Biaya", fields: ["Konsultasi", "Tindakan", "Obat", "Diskon"] },
    ],
  },
  "keuangan/pembayaran": {
    path: "keuangan/pembayaran",
    title: "Pembayaran",
    eyebrow: "Keuangan",
    description: "Catat pembayaran invoice via cash, transfer, QRIS, asuransi, atau piutang.",
    type: "finance",
    primaryAction: "Catat Pembayaran",
    createAction: "Catat Pembayaran",
    rowAction: "route",
    columns: ["No. Invoice", "Pasien", "Layanan", "Total", "Status"],
    rows: financeRows,
    stats: [
      { label: "Pembayaran Hari Ini", value: "Rp 10,7 jt", note: "29 transaksi", tone: stats.teal },
      { label: "QRIS", value: "54%", note: "Metode dominan", tone: stats.sky },
      { label: "Pending", value: "5", note: "Menunggu validasi", tone: stats.amber },
    ],
    formSections: [
      { title: "Pembayaran", fields: ["Invoice", "Nominal dibayar", "Metode pembayaran", "Tanggal bayar"] },
      { title: "Validasi", fields: ["Bukti bayar", "Petugas", "Catatan"] },
    ],
  },
  "keuangan/kas": {
    path: "keuangan/kas",
    title: "Kas Masuk/Keluar",
    eyebrow: "Keuangan",
    description: "Pantau arus kas klinik dari pembayaran pasien, pembelian obat, biaya operasional, dan adjustment.",
    type: "finance",
    primaryAction: "Tambah Transaksi Kas",
    createAction: "Tambah Kas",
    rowAction: "route",
    columns: ["Kode", "Transaksi", "Kategori", "Nominal", "Status"],
    rows: financeRows,
    stats: [
      { label: "Kas Masuk", value: "Rp 12,8 jt", note: "Hari ini", tone: stats.green },
      { label: "Kas Keluar", value: "Rp 4,1 jt", note: "Hari ini", tone: stats.amber },
      { label: "Saldo Kas", value: "Rp 86,5 jt", note: "Realtime", tone: stats.teal },
    ],
    formSections: [
      { title: "Transaksi Kas", fields: ["Jenis kas", "Kategori", "Nominal", "Tanggal"] },
      { title: "Detail", fields: ["Akun kas", "Referensi", "Catatan"] },
    ],
  },
  "keuangan/piutang": {
    path: "keuangan/piutang",
    title: "Piutang Pasien",
    eyebrow: "Keuangan",
    description: "Pantau invoice belum lunas, sebagian, jatuh tempo, dan follow up penagihan.",
    type: "finance",
    primaryAction: "Follow Up Piutang",
    createAction: "Tambah Piutang",
    rowAction: "route",
    columns: ["No. Invoice", "Pasien", "Layanan", "Total", "Status"],
    rows: financeRows,
    stats: [
      { label: "Total Piutang", value: "Rp 5,4 jt", note: "18 invoice", tone: stats.amber },
      { label: "Jatuh Tempo", value: "4", note: "Butuh follow up", tone: stats.red },
      { label: "Tertagih", value: "Rp 1,2 jt", note: "Minggu ini", tone: stats.green },
    ],
    formSections: [
      { title: "Data Piutang", fields: ["Pasien", "Invoice", "Jatuh tempo", "Nominal"] },
      { title: "Follow Up", fields: ["Status penagihan", "Channel", "Catatan"] },
    ],
  },
  "keuangan/pengeluaran-obat": {
    path: "keuangan/pengeluaran-obat",
    title: "Pengeluaran Obat",
    eyebrow: "Keuangan",
    description: "Catat dan pantau pengeluaran pembelian obat, hutang supplier, dan status pembayaran.",
    type: "finance",
    primaryAction: "Catat Pembelian Obat",
    createAction: "Catat Pengeluaran",
    rowAction: "route",
    columns: ["Kode", "Transaksi", "Supplier", "Nominal", "Status"],
    rows: financeRows,
    stats: [
      { label: "Pembelian Bulan Ini", value: "Rp 38,6 jt", note: "12 faktur", tone: stats.teal },
      { label: "Belum Dibayar", value: "Rp 9,2 jt", note: "3 supplier", tone: stats.amber },
      { label: "Sudah Posting", value: "9", note: "Ke laporan", tone: stats.green },
    ],
    formSections: [
      { title: "Pembelian Obat", fields: ["Supplier", "No. faktur", "Tanggal", "Total"] },
      { title: "Pembayaran", fields: ["Metode bayar", "Jatuh tempo", "Status", "Catatan"] },
    ],
  },
  "master/dokter": {
    path: "master/dokter",
    title: "Master Dokter",
    eyebrow: "Master Data",
    description: "Data dokter, SIP, poli, jadwal praktik, dan status aktif.",
    type: "master",
    primaryAction: "Tambah Dokter",
    rowAction: "modal",
    columns: ["Kode", "Nama", "Poli", "Jam Praktik", "Status"],
    rows: doctorRows,
    stats: [
      { label: "Dokter Aktif", value: "12", note: "4 poli", tone: stats.teal },
      { label: "Praktik Hari Ini", value: "3", note: "Sesuai jadwal", tone: stats.sky },
      { label: "SIP Valid", value: "12", note: "Terverifikasi", tone: stats.green },
    ],
    formSections: [
      { title: "Data Dokter", fields: ["Nama dokter", "SIP", "Poli", "No. HP"] },
      { title: "Praktik", fields: ["Status", "Spesialisasi", "Catatan"] },
    ],
  },
  "master/poli": {
    path: "master/poli",
    title: "Master Poli",
    eyebrow: "Master Data",
    description: "Master poli, ruangan, kapasitas, dan status layanan.",
    type: "master",
    primaryAction: "Tambah Poli",
    rowAction: "modal",
    columns: ["Kode", "Nama", "Kategori", "Ruangan", "Status"],
    rows: poliRows,
    stats: [
      { label: "Poli Aktif", value: "4", note: "Umum, Gigi, Anak, Penyakit Dalam", tone: stats.teal },
      { label: "Ruangan Siap", value: "7", note: "Hari ini", tone: stats.green },
      { label: "Maintenance", value: "1", note: "Ruang gigi 2", tone: stats.amber },
    ],
    formSections: [
      { title: "Data Poli", fields: ["Nama poli", "Kode poli", "Ruangan", "Kapasitas"] },
      { title: "Status", fields: ["Status layanan", "Catatan"] },
    ],
  },
  "master/tindakan": {
    path: "master/tindakan",
    title: "Master Tindakan",
    eyebrow: "Master Data",
    description: "Master tindakan medis, kategori poli, tarif, dan durasi.",
    type: "master",
    primaryAction: "Tambah Tindakan",
    rowAction: "modal",
    columns: ["Kode", "Tindakan", "Poli", "Tarif", "Status"],
    rows: procedureRows,
    stats: [
      { label: "Tindakan Aktif", value: "52", note: "Semua poli", tone: stats.teal },
      { label: "Tarif Lengkap", value: "49", note: "3 perlu review", tone: stats.green },
      { label: "Dipakai Bulan Ini", value: "34", note: "Dalam transaksi", tone: stats.sky },
    ],
    formSections: [
      { title: "Data Tindakan", fields: ["Nama tindakan", "Kode", "Poli", "Tarif"] },
      { title: "Detail", fields: ["Estimasi durasi", "Status", "Catatan"] },
    ],
  },
  "master/supplier-obat": {
    path: "master/supplier-obat",
    title: "Master Supplier Obat",
    eyebrow: "Master Data",
    description: "Data supplier obat, kontak, alamat, termin pembayaran, dan status kerja sama.",
    type: "master",
    primaryAction: "Tambah Supplier",
    rowAction: "modal",
    columns: ["Kode", "Supplier", "Kategori", "Kontak", "Status"],
    rows: supplierRows,
    stats: [
      { label: "Supplier Aktif", value: "18", note: "3 utama", tone: stats.teal },
      { label: "PO Berjalan", value: "6", note: "Menunggu barang", tone: stats.amber },
      { label: "Pembayaran Lancar", value: "92%", note: "Bulan ini", tone: stats.green },
    ],
    formSections: [
      { title: "Data Supplier", fields: ["Nama supplier", "Kontak", "No. HP", "Alamat"] },
      { title: "Pembayaran", fields: ["Termin", "NPWP", "Status", "Catatan"] },
    ],
  },
  "master/metode-pembayaran": {
    path: "master/metode-pembayaran",
    title: "Master Metode Pembayaran",
    eyebrow: "Master Data",
    description: "Master metode pembayaran seperti cash, transfer, QRIS, asuransi, dan piutang.",
    type: "master",
    primaryAction: "Tambah Metode",
    rowAction: "modal",
    columns: ["Kode", "Metode", "Kategori", "Akun", "Status"],
    rows: paymentMethodRows,
    stats: [
      { label: "Metode Aktif", value: "5", note: "Cash, QRIS, transfer, asuransi, piutang", tone: stats.teal },
      { label: "Paling Banyak", value: "QRIS", note: "54% transaksi", tone: stats.sky },
      { label: "Butuh Rekon", value: "2", note: "Transfer bank", tone: stats.amber },
    ],
    formSections: [
      { title: "Metode", fields: ["Nama metode", "Kode", "Kategori", "Akun kas"] },
      { title: "Pengaturan", fields: ["Status", "Biaya admin", "Catatan"] },
    ],
  },
  "laporan/kunjungan": {
    path: "laporan/kunjungan",
    title: "Laporan Kunjungan",
    eyebrow: "Laporan",
    description: "Rekap kunjungan pasien berdasarkan tanggal, dokter, poli, status, dan jenis kunjungan.",
    type: "report",
    primaryAction: "Export Kunjungan",
    rowAction: "route",
    columns: ["Kode", "Laporan", "Periode", "Data", "Status"],
    rows: reportRows,
    stats: [
      { label: "Kunjungan", value: "284", note: "April 2026", tone: stats.teal },
      { label: "Pasien Baru", value: "38", note: "Bulan ini", tone: stats.sky },
      { label: "Kontrol", value: "76", note: "Bulan ini", tone: stats.green },
    ],
    formSections: [
      { title: "Filter Laporan", fields: ["Rentang tanggal", "Dokter", "Poli", "Status"] },
    ],
  },
  "laporan/pasien": {
    path: "laporan/pasien",
    title: "Laporan Pasien",
    eyebrow: "Laporan",
    description: "Rekap data pasien baru, pasien lama, demografi, dan kunjungan ulang.",
    type: "report",
    primaryAction: "Export Pasien",
    rowAction: "route",
    columns: ["Kode", "Laporan", "Periode", "Data", "Status"],
    rows: reportRows,
    stats: [
      { label: "Total Pasien", value: "1.284", note: "Aktif", tone: stats.teal },
      { label: "Pasien Baru", value: "38", note: "Bulan ini", tone: stats.sky },
      { label: "Retensi", value: "72%", note: "Kontrol ulang", tone: stats.green },
    ],
    formSections: [
      { title: "Filter Laporan", fields: ["Rentang tanggal", "Gender", "Usia", "Status pasien"] },
    ],
  },
  "laporan/obat": {
    path: "laporan/obat",
    title: "Laporan Obat",
    eyebrow: "Laporan",
    description: "Rekap penggunaan obat, stok, batch, expired, dan nilai inventory.",
    type: "report",
    primaryAction: "Export Obat",
    rowAction: "route",
    columns: ["Kode", "Laporan", "Periode", "Data", "Status"],
    rows: reportRows,
    stats: [
      { label: "Obat Terpakai", value: "1.248", note: "Item bulan ini", tone: stats.teal },
      { label: "Nilai Stok", value: "Rp 146 jt", note: "Realtime", tone: stats.sky },
      { label: "Expired Dekat", value: "7", note: "30 hari", tone: stats.red },
    ],
    formSections: [
      { title: "Filter Laporan", fields: ["Obat", "Kategori", "Supplier", "Status stok"] },
    ],
  },
  "laporan/keuangan": {
    path: "laporan/keuangan",
    title: "Laporan Keuangan",
    eyebrow: "Laporan",
    description: "Rekap pendapatan konsultasi, tindakan, obat, piutang, kas keluar, dan laba kotor.",
    type: "report",
    primaryAction: "Export Keuangan",
    rowAction: "route",
    columns: ["Kode", "Laporan", "Periode", "Data", "Status"],
    rows: reportRows,
    stats: [
      { label: "Pendapatan", value: "Rp 68,2 jt", note: "April 2026", tone: stats.teal },
      { label: "Piutang", value: "Rp 5,4 jt", note: "18 invoice", tone: stats.amber },
      { label: "Laba Kotor", value: "Rp 41,8 jt", note: "Estimasi", tone: stats.green },
    ],
    formSections: [
      { title: "Filter Laporan", fields: ["Rentang tanggal", "Jenis transaksi", "Metode bayar", "Status"] },
    ],
  },
  "laporan/dokter": {
    path: "laporan/dokter",
    title: "Laporan Dokter",
    eyebrow: "Laporan",
    description: "Rekap performa dokter, jumlah kunjungan, tindakan, pendapatan, dan follow up kontrol.",
    type: "report",
    primaryAction: "Export Dokter",
    rowAction: "route",
    columns: ["Kode", "Laporan", "Periode", "Data", "Status"],
    rows: reportRows,
    stats: [
      { label: "Dokter Aktif", value: "12", note: "April 2026", tone: stats.teal },
      { label: "Kunjungan/Dokter", value: "94", note: "Rata-rata", tone: stats.sky },
      { label: "Kontrol Dibuat", value: "76", note: "Bulan ini", tone: stats.green },
    ],
    formSections: [
      { title: "Filter Laporan", fields: ["Dokter", "Poli", "Jenis tindakan", "Rentang tanggal"] },
    ],
  },
  pengaturan: {
    path: "pengaturan",
    title: "Pengaturan",
    eyebrow: "Sistem",
    description: "Pengaturan identitas klinik, reminder, stok minimum, dan preferensi operasional.",
    type: "settings",
    primaryAction: "Simpan Pengaturan",
    rowAction: "modal",
    columns: ["Kode", "Pengaturan", "Kategori", "Nilai", "Status"],
    rows: settingsRows,
    stats: [
      { label: "Reminder", value: "Aktif", note: "Follow up kontrol", tone: stats.green },
      { label: "Stok Minimum", value: "Aktif", note: "Farmasi", tone: stats.teal },
      { label: "Brand", value: "MedCare7", note: "Klinik", tone: stats.sky },
    ],
    formSections: [
      { title: "Identitas Klinik", fields: ["Nama klinik", "Alamat", "No. kontak", "Logo"] },
      { title: "Preferensi", fields: ["Reminder otomatis", "Stok minimum", "Timezone", "Catatan"] },
    ],
  },
};

export const LIST_PATHS = Object.keys(MEDCARE_PAGES);

export const allStaticSlugs = LIST_PATHS.flatMap((path) => {
  const config = MEDCARE_PAGES[path];
  const slug = path.split("/");

  if (config.rowAction === "modal") {
    return [slug];
  }

  return [slug, [...slug, "create"], [...slug, config.rows[0]?.[0] || "MC7-001"]];
});

export const fallbackConfig = {
  ...MEDCARE_PAGES["jadwal-pasien"],
  path: "fallback",
  title: "MedCare7",
  eyebrow: "Klinik",
  description: "Halaman belum dikonfigurasi.",
  formSections: baseForm,
} satisfies MedCareConfig;
