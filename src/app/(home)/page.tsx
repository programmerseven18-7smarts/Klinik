import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

const overviewCards = [
  {
    label: "Pasien Hari Ini",
    value: "48",
    meta: "+12% dari kemarin",
    tone: "bg-[#CCFBF1] text-primary",
  },
  {
    label: "Antrean Aktif",
    value: "17",
    meta: "6 sedang diperiksa",
    tone: "bg-sky-100 text-sky-700",
  },
  {
    label: "Follow Up Kontrol",
    value: "9",
    meta: "3 reminder perlu dikirim",
    tone: "bg-amber-100 text-amber-700",
  },
  {
    label: "Pendapatan Hari Ini",
    value: "Rp 12,8 jt",
    meta: "Konsultasi, tindakan, obat",
    tone: "bg-emerald-100 text-emerald-700",
  },
];

const journeyColumns = [
  {
    title: "Booking",
    count: 8,
    patients: [
      ["Budi Santoso", "RM-000178", "09.00", "Poli Umum"],
      ["Rina Kartika", "RM-000221", "09.20", "Poli Gigi"],
    ],
  },
  {
    title: "Check-in",
    count: 5,
    patients: [
      ["Siti Rahma", "RM-000089", "09.35", "Poli Anak"],
      ["Agus Pratama", "RM-000241", "10.00", "Poli Umum"],
    ],
  },
  {
    title: "Menunggu",
    count: 4,
    patients: [
      ["Andi Wijaya", "RM-000134", "10.15", "dr. Amelia"],
      ["Maya Lestari", "RM-000295", "10.30", "dr. Sinta"],
    ],
  },
  {
    title: "Diperiksa",
    count: 6,
    patients: [
      ["Raka Pratama", "RM-000311", "Ruang 2", "Demam"],
      ["Nadia Putri", "RM-000205", "Ruang 1", "Kontrol"],
    ],
  },
  {
    title: "Selesai",
    count: 16,
    patients: [
      ["Dewi Anggraeni", "RM-000166", "Invoice", "Lunas"],
      ["Tono Hidayat", "RM-000199", "Resep", "Siap"],
    ],
  },
  {
    title: "Perlu Kontrol",
    count: 9,
    patients: [
      ["Fitri Handayani", "RM-000260", "3 hari lagi", "Luka"],
      ["Bayu Saputra", "RM-000144", "7 hari lagi", "Tensi"],
    ],
  },
];

const doctorSchedule = [
  ["08.00 - 12.00", "dr. Amelia Putri", "Poli Umum", "18 pasien"],
  ["09.00 - 13.00", "dr. Raka Pratama", "Poli Gigi", "11 pasien"],
  ["13.00 - 17.00", "dr. Sinta Maharani", "Poli Anak", "15 pasien"],
];

const followUps = [
  ["Siti Rahma", "Kontrol demam", "Hari ini 14.00", "Reminder terkirim"],
  ["Andi Wijaya", "Evaluasi luka", "Besok 09.30", "Belum dikirim"],
  ["Rina Kartika", "Kontrol gigi", "2 Mei 2026", "Terjadwal"],
];

const stockAlerts = [
  ["Paracetamol 500mg", "24 strip", "Menipis"],
  ["Amoxicillin 500mg", "8 strip", "Kritis"],
  ["Betadine 60ml", "3 botol", "Expired dekat"],
];

const financeRows = [
  ["Invoice lunas", "Rp 8,4 jt", "32 transaksi"],
  ["Piutang pasien", "Rp 2,1 jt", "7 invoice"],
  ["Pengeluaran obat", "Rp 3,6 jt", "2 pembelian"],
];

const timelineRows = [
  ["RM-000178", "Budi Santoso", "ISPA ringan", "Resep + file lab", "Lunas"],
  ["RM-000089", "Siti Rahma", "Demam", "Jadwal kontrol dibuat", "Belum lunas"],
  ["RM-000221", "Rina Kartika", "Tambal gigi", "Foto klinis tersimpan", "Sebagian"],
];

const visitTrend = [
  ["Sen", 38, 62],
  ["Sel", 44, 68],
  ["Rab", 41, 58],
  ["Kam", 48, 75],
  ["Jum", 53, 82],
  ["Sab", 36, 55],
  ["Min", 24, 35],
];

function StatusPill({ children }: { children: string }) {
  const colors: Record<string, string> = {
    Lunas: "bg-emerald-50 text-emerald-700",
    "Belum lunas": "bg-amber-50 text-amber-700",
    Sebagian: "bg-sky-50 text-sky-700",
    Menipis: "bg-amber-50 text-amber-700",
    Kritis: "bg-red-50 text-red-700",
    "Expired dekat": "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        colors[children] || "bg-[#CCFBF1] text-primary"
      }`}
    >
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      <section className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark"
          >
            <div
              className={`grid size-14 place-items-center rounded-2xl text-lg font-extrabold ${card.tone}`}
            >
              {card.label
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-dark-6">{card.label}</p>
              <h2 className="mt-1.5 text-heading-6 font-bold text-dark dark:text-white">
                {card.value}
              </h2>
              <p className="mt-2 text-sm font-medium text-primary">
                {card.meta}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
                Patient Journey Board
              </h2>
              <p className="mt-1 text-sm font-medium text-dark-6">
                Alur pasien hari ini dari booking sampai kontrol ulang
              </p>
            </div>

            <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-teal-800">
              Tambah Jadwal
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-3 2xl:grid-cols-6">
            {journeyColumns.map((column) => (
              <div
                key={column.title}
                className="rounded-[10px] border border-stroke bg-gray-2 p-3 dark:border-stroke-dark dark:bg-dark-2"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-dark dark:text-white">
                    {column.title}
                  </h3>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-primary dark:bg-gray-dark">
                    {column.count}
                  </span>
                </div>

                <div className="space-y-2">
                  {column.patients.map(([name, rm, time, note]) => (
                    <div
                      key={name}
                      className="rounded-lg bg-white p-3 shadow-card dark:bg-gray-dark"
                    >
                      <p className="text-sm font-bold text-dark dark:text-white">
                        {name}
                      </p>
                      <p className="mt-1 text-xs font-medium text-dark-6">
                        {rm}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2 text-xs font-semibold">
                        <span className="text-primary">{time}</span>
                        <span className="text-dark-5 dark:text-dark-6">
                          {note}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 space-y-4 md:space-y-6 xl:col-span-4">
          <div className="rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
              Jadwal Dokter
            </h2>
            <div className="mt-5 space-y-4">
              {doctorSchedule.map(([time, doctor, poli, count]) => (
                <div key={doctor} className="flex items-start gap-4">
                  <div className="rounded-lg bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700">
                    {time}
                  </div>
                  <div>
                    <p className="font-bold text-dark dark:text-white">
                      {doctor}
                    </p>
                    <p className="text-sm font-medium text-dark-6">
                      {poli} - {count}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
              Follow Up Kontrol
            </h2>
            <div className="mt-5 space-y-3">
              {followUps.map(([name, reason, date, status]) => (
                <div
                  key={name}
                  className="rounded-lg border border-stroke p-3 dark:border-stroke-dark"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-dark dark:text-white">
                        {name}
                      </p>
                      <p className="text-sm font-medium text-dark-6">
                        {reason}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-primary">
                      {date}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-dark-5">
                    {status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
                Kunjungan & Pendapatan
              </h2>
              <p className="mt-1 text-sm font-medium text-dark-6">
                Tren 7 hari terakhir untuk konsultasi, tindakan, dan obat
              </p>
            </div>
            <span className="rounded-full bg-[#CCFBF1] px-3 py-1 text-sm font-bold text-primary">
              Minggu ini
            </span>
          </div>

          <div className="flex h-72 items-end gap-4 border-b border-stroke pb-4 dark:border-stroke-dark">
            {visitTrend.map(([day, visits, revenue]) => (
              <div key={day} className="flex flex-1 flex-col items-center gap-3">
                <div className="flex h-56 w-full max-w-14 items-end gap-1.5">
                  <div
                    className="w-1/2 rounded-t-lg bg-primary"
                    style={{ height: `${visits}%` }}
                  />
                  <div
                    className="w-1/2 rounded-t-lg bg-sky-500"
                    style={{ height: `${revenue}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-dark-6">{day}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-4 text-center sm:grid-cols-3">
            <div>
              <p className="text-heading-6 font-bold text-dark dark:text-white">
                284
              </p>
              <p className="text-sm font-medium text-dark-6">
                Total kunjungan
              </p>
            </div>
            <div>
              <p className="text-heading-6 font-bold text-dark dark:text-white">
                Rp 68,2 jt
              </p>
              <p className="text-sm font-medium text-dark-6">
                Pendapatan
              </p>
            </div>
            <div>
              <p className="text-heading-6 font-bold text-dark dark:text-white">
                Rp 5,4 jt
              </p>
              <p className="text-sm font-medium text-dark-6">
                Piutang aktif
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-5">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
            Inventory Obat & Finansial
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[10px] border border-stroke p-4 dark:border-stroke-dark">
              <h3 className="font-bold text-dark dark:text-white">
                Medicine Stock Health
              </h3>
              <div className="mt-4 space-y-3">
                {stockAlerts.map(([name, stock, status]) => (
                  <div key={name} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-dark dark:text-white">
                        {name}
                      </p>
                      <p className="text-sm font-medium text-dark-6">{stock}</p>
                    </div>
                    <StatusPill>{status}</StatusPill>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[10px] border border-stroke p-4 dark:border-stroke-dark">
              <h3 className="font-bold text-dark dark:text-white">
                Ringkasan Keuangan
              </h3>
              <div className="mt-4 space-y-3">
                {financeRows.map(([label, value, note]) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-dark dark:text-white">
                        {label}
                      </p>
                      <p className="text-sm font-medium text-dark-6">{note}</p>
                    </div>
                    <p className="font-bold text-primary">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 rounded-[10px] bg-white px-5 pb-5 pt-6 shadow-1 dark:bg-gray-dark md:px-7.5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-body-2xlg font-bold text-dark dark:text-white">
                Medical Timeline & File Pasien
              </h2>
              <p className="mt-1 text-sm font-medium text-dark-6">
                Ringkasan histori terbaru, resep, file, dan status pembayaran
              </p>
            </div>
            <button className="rounded-lg border border-stroke px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:text-white dark:hover:bg-dark-2">
              Lihat Semua
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead>
                <tr className="border-y border-stroke text-sm uppercase text-dark-5 dark:border-stroke-dark">
                  <th className="py-3 font-bold">No. RM</th>
                  <th className="py-3 font-bold">Pasien</th>
                  <th className="py-3 font-bold">Diagnosa</th>
                  <th className="py-3 font-bold">File / Resep</th>
                  <th className="py-3 text-right font-bold">Pembayaran</th>
                </tr>
              </thead>
              <tbody>
                {timelineRows.map(([rm, name, diagnosis, file, payment]) => (
                  <tr
                    key={rm}
                    className="border-b border-stroke text-base font-medium dark:border-stroke-dark"
                  >
                    <td className="py-4 text-primary">{rm}</td>
                    <td className="py-4 text-dark dark:text-white">{name}</td>
                    <td className="py-4 text-dark-6">{diagnosis}</td>
                    <td className="py-4 text-dark-6">{file}</td>
                    <td className="py-4 text-right">
                      <StatusPill>{payment}</StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
