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
    label: "JADWAL & ANTREAN",
    items: [
      {
        title: "Jadwal & Antrean",
        icon: Icons.Calendar,
        items: [
          { title: "Jadwal Pasien", url: "/jadwal/pasien" },
          { title: "Jadwal Dokter", url: "/jadwal/dokter" },
          { title: "Antrean Pasien", url: "/jadwal/antrean" },
          { title: "Follow Up Kontrol", url: "/jadwal/follow-up" },
        ],
      },
    ],
  },
  {
    label: "PASIEN",
    items: [
      {
        title: "Pasien",
        icon: Icons.User,
        items: [
          { title: "Data Pasien", url: "/pasien/data" },
          { title: "Riwayat Pasien", url: "/pasien/riwayat" },
          { title: "File Pasien", url: "/pasien/file" },
        ],
      },
    ],
  },
  {
    label: "PEMERIKSAAN",
    items: [
      {
        title: "Pemeriksaan",
        icon: Icons.Table,
        items: [
          { title: "Kunjungan Pasien", url: "/pemeriksaan/kunjungan" },
          { title: "Rekam Medis", url: "/pemeriksaan/rekam-medis" },
          { title: "Resep Obat", url: "/pemeriksaan/resep" },
          { title: "Tindakan Medis", url: "/pemeriksaan/tindakan" },
        ],
      },
    ],
  },
  {
    label: "FARMASI",
    items: [
      {
        title: "Farmasi",
        icon: Icons.PieChart,
        items: [
          { title: "Data Obat", url: "/farmasi/obat" },
          { title: "Stok Masuk", url: "/farmasi/stok-masuk" },
          { title: "Stok Keluar", url: "/farmasi/stok-keluar" },
          { title: "Mutasi Stok", url: "/farmasi/mutasi" },
          { title: "Obat Hampir Habis", url: "/farmasi/hampir-habis" },
          { title: "Obat Mendekati Expired", url: "/farmasi/expired" },
        ],
      },
    ],
  },
  {
    label: "KEUANGAN",
    items: [
      {
        title: "Keuangan",
        icon: Icons.Alphabet,
        items: [
          { title: "Invoice", url: "/keuangan/invoice" },
          { title: "Pembayaran", url: "/keuangan/pembayaran" },
          { title: "Kas Masuk/Keluar", url: "/keuangan/kas" },
          { title: "Piutang Pasien", url: "/keuangan/piutang" },
          { title: "Pengeluaran Obat", url: "/keuangan/pengeluaran" },
        ],
      },
    ],
  },
  {
    label: "MASTER DATA",
    items: [
      {
        title: "Master Data",
        icon: Icons.FourCircle,
        items: [
          { title: "Dokter", url: "/master/dokter" },
          { title: "Poli", url: "/master/poli" },
          { title: "Tindakan", url: "/master/tindakan" },
          { title: "Supplier Obat", url: "/master/supplier" },
          { title: "Metode Pembayaran", url: "/master/metode-bayar" },
        ],
      },
    ],
  },
  {
    label: "LAPORAN",
    items: [
      {
        title: "Laporan",
        icon: Icons.Authentication,
        items: [
          { title: "Laporan Kunjungan", url: "/laporan/kunjungan" },
          { title: "Laporan Pasien", url: "/laporan/pasien" },
          { title: "Laporan Obat", url: "/laporan/obat" },
          { title: "Laporan Keuangan", url: "/laporan/keuangan" },
          { title: "Laporan Dokter", url: "/laporan/dokter" },
        ],
      },
    ],
  },
];
