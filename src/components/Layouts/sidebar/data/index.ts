import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "UTAMA",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
    ],
  },
  {
    label: "OPERASIONAL",
    items: [
      {
        title: "Jadwal & Antrean",
        icon: Icons.Calendar,
        items: [
          { title: "Jadwal Pasien", url: "/jadwal-pasien" },
          { title: "Jadwal Dokter", url: "/jadwal-dokter" },
          { title: "Antrean Pasien", url: "/antrean-pasien" },
          { title: "Follow Up Kontrol", url: "/follow-up-kontrol" },
        ],
      },
      {
        title: "Pasien",
        icon: Icons.User,
        items: [
          { title: "Data Pasien", url: "/pasien/data" },
          { title: "Riwayat Pasien", url: "/pasien/riwayat" },
          { title: "File Pasien", url: "/pasien/file" },
        ],
      },
      {
        title: "Pemeriksaan",
        icon: Icons.Alphabet,
        items: [
          { title: "Kunjungan Pasien", url: "/pemeriksaan/kunjungan" },
          { title: "Rekam Medis", url: "/pemeriksaan/rekam-medis" },
          { title: "Resep Obat", url: "/pemeriksaan/resep-obat" },
          { title: "Tindakan Medis", url: "/pemeriksaan/tindakan-medis" },
        ],
      },
    ],
  },
  {
    label: "BACK OFFICE",
    items: [
      {
        title: "Farmasi",
        icon: Icons.FourCircle,
        items: [
          { title: "Data Obat", url: "/farmasi/data-obat" },
          { title: "Stok Masuk", url: "/farmasi/stok-masuk" },
          { title: "Stok Keluar", url: "/farmasi/stok-keluar" },
          { title: "Mutasi Stok", url: "/farmasi/mutasi-stok" },
          { title: "Obat Hampir Habis", url: "/farmasi/obat-hampir-habis" },
          { title: "Obat Expired", url: "/farmasi/obat-expired" },
        ],
      },
      {
        title: "Keuangan",
        icon: Icons.PieChart,
        items: [
          { title: "Invoice", url: "/keuangan/invoice" },
          { title: "Pembayaran", url: "/keuangan/pembayaran" },
          { title: "Kas Masuk/Keluar", url: "/keuangan/kas" },
          { title: "Piutang Pasien", url: "/keuangan/piutang" },
          { title: "Pengeluaran Obat", url: "/keuangan/pengeluaran-obat" },
        ],
      },
    ],
  },
  {
    label: "DATA & ANALITIK",
    items: [
      {
        title: "Master Data",
        icon: Icons.Table,
        items: [
          { title: "Dokter", url: "/master/dokter" },
          { title: "Poli", url: "/master/poli" },
          { title: "Tindakan", url: "/master/tindakan" },
          { title: "Supplier Obat", url: "/master/supplier-obat" },
          { title: "Metode Pembayaran", url: "/master/metode-pembayaran" },
        ],
      },
      {
        title: "Laporan",
        icon: Icons.PieChart,
        items: [
          { title: "Laporan Kunjungan", url: "/laporan/kunjungan" },
          { title: "Laporan Pasien", url: "/laporan/pasien" },
          { title: "Laporan Obat", url: "/laporan/obat" },
          { title: "Laporan Keuangan", url: "/laporan/keuangan" },
          { title: "Laporan Dokter", url: "/laporan/dokter" },
        ],
      },
      {
        title: "Pengaturan",
        url: "/pengaturan",
        icon: Icons.Authentication,
        items: [],
      },
    ],
  },
];
