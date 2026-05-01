"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { MedCareConfig } from "./data";

type Mode = "list" | "create" | "detail";

type Props = {
  config: MedCareConfig;
  mode: Mode;
  recordId?: string;
};

const journey = [
  ["Booking", "8", "Budi Santoso", "09.00"],
  ["Check-in", "5", "Rina Kartika", "09.20"],
  ["Menunggu", "4", "Andi Wijaya", "10.15"],
  ["Diperiksa", "6", "Siti Rahma", "Ruang 2"],
  ["Selesai", "16", "Agus Pratama", "Invoice"],
  ["Perlu Kontrol", "9", "Nadia Putri", "7 hari"],
];

const timeline = [
  ["30 Apr 2026", "ISPA ringan", "Paracetamol + Cetirizine", "Lunas"],
  ["18 Apr 2026", "Kontrol tensi", "Amlodipine 5mg", "Lunas"],
  ["02 Apr 2026", "Keluhan batuk", "File lab tersimpan", "Belum Lunas"],
];

const fileVault = [
  ["Hasil Lab", "lab-budi-300426.pdf", "Terverifikasi"],
  ["Surat Kontrol", "kontrol-siti-300426.pdf", "Draft"],
  ["Foto Klinis", "gigi-rina-290426.jpg", "Tersimpan"],
];

const medicineHealth = [
  ["Paracetamol 500mg", "24 strip", "Menipis", "72%"],
  ["Amoxicillin 500mg", "8 strip", "Kritis", "22%"],
  ["Omeprazole 20mg", "72 strip", "Aman", "88%"],
  ["Betadine 60ml", "3 botol", "Expired Dekat", "18%"],
];

const financeBreakdown = [
  ["Konsultasi", "Rp 4,8 jt", "38%"],
  ["Tindakan", "Rp 3,2 jt", "25%"],
  ["Obat", "Rp 4,8 jt", "37%"],
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function statusClass(status: string) {
  if (["Aktif", "Aman", "Final", "Lunas", "Dibayar", "Terverifikasi", "Tersimpan", "Siap Ekspor", "Dipanggil", "Disetujui", "Sudah Cair"].includes(status)) {
    return "bg-emerald-50 text-emerald-700";
  }

  if (["Menunggu", "Booking", "Check-in", "Draft", "Review", "Menipis", "Perlu Kontrol", "Reminder Terkirim", "Terjadwal", "Sebagian", "Diajukan", "Diverifikasi", "Menunggu Transfer", "Kontrol 3 Mei", "BPJS"].includes(status)) {
    return "bg-amber-50 text-amber-700";
  }

  if (["Kritis", "Expired Dekat", "Belum Lunas", "Terlewat", "Revisi", "Ditolak", "Lewat"].includes(status)) {
    return "bg-red-50 text-red-700";
  }

  return "bg-sky-50 text-sky-700";
}

function StatusPill({ children }: { children: string }) {
  return (
    <span className={cx("inline-flex rounded-full px-2.5 py-1 text-xs font-semibold", statusClass(children))}>
      {children}
    </span>
  );
}

function IconButton({
  label,
  children,
  onClick,
  href,
  tone = "view",
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  tone?: "view" | "edit" | "danger";
}) {
  const className = cx(
    "inline-grid size-9 place-items-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-dark",
    tone === "view" && "bg-sky-50 text-sky-700 hover:bg-sky-100 focus:ring-sky-300 dark:bg-sky-500/10 dark:text-sky-300",
    tone === "edit" && "bg-amber-50 text-amber-700 hover:bg-amber-100 focus:ring-amber-300 dark:bg-amber-500/10 dark:text-amber-300",
    tone === "danger" && "bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-300 dark:bg-red-500/10 dark:text-red-300",
  );

  if (href) {
    return (
      <Link href={href} className={className} title={label} aria-label={label}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} title={label} aria-label={label}>
      {children}
    </button>
  );
}

function EyeIcon() {
  return (
    <svg className="size-4.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M2.25 10s2.8-4.75 7.75-4.75S17.75 10 17.75 10s-2.8 4.75-7.75 4.75S2.25 10 2.25 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="size-4.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M11.65 4.05 14.2 6.6M3.75 16.25l3.05-.65 8.75-8.75a1.8 1.8 0 0 0-2.55-2.55L4.25 13.05l-.5 3.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg className="size-4.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.25 5.75h11.5M8.25 3.75h3.5M7 8.25v5.5M10 8.25v5.5M13 8.25v5.5M5.75 5.75l.65 10.5h7.2l.65-10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HeaderActions({
  config,
  mode,
  onMasterAdd,
}: {
  config: MedCareConfig;
  mode: Mode;
  onMasterAdd: () => void;
}) {
  if (mode !== "list") {
    return (
      <div className="flex flex-wrap gap-3">
        <Link href={`/${config.path}`} className="rounded-lg border border-stroke px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:text-white dark:hover:bg-dark-2">
          Kembali
        </Link>
        <button className="rounded-lg border border-stroke px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:text-white dark:hover:bg-dark-2">
          Simpan Draft
        </button>
        <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-teal-800">
          {mode === "create" ? "Simpan & Submit" : "Ubah Status"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button className="rounded-lg border border-stroke px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:text-white dark:hover:bg-dark-2">
        Filter
      </button>
      {config.rowAction === "modal" ? (
        <button onClick={onMasterAdd} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-teal-800">
          {config.primaryAction}
        </button>
      ) : (
        <Link href={`/${config.path}/create`} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-teal-800">
          {config.primaryAction}
        </Link>
      )}
    </div>
  );
}

function PageShell({
  config,
  mode,
  recordId,
  children,
  onMasterAdd,
}: Props & { children: ReactNode; onMasterAdd: () => void }) {
  return (
    <div className="space-y-4 md:space-y-6 2xl:space-y-7.5">
      <section className="rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-primary">{config.eyebrow}</p>
            <h1 className="mt-2 text-heading-5 font-bold text-dark dark:text-white">
              {mode === "create" ? config.createAction || config.primaryAction : mode === "detail" ? `Detail ${config.title}` : config.title}
            </h1>
            <p className="mt-2 max-w-3xl font-medium text-dark-6">
              {mode === "detail" ? `Ringkasan lengkap dokumen ${recordId || "7C-001"}, termasuk status, aktivitas, dan item yang terhubung.` : config.description}
            </p>
          </div>

          <HeaderActions config={config} mode={mode} onMasterAdd={onMasterAdd} />
        </div>
      </section>

      {mode === "list" && config.type !== "master" && config.type !== "bpjs" && (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {config.stats.map((stat) => (
            <div key={stat.label} className="rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-6">
              <div className={cx("inline-flex rounded-xl px-3 py-2 text-sm font-extrabold", stat.tone)}>{stat.label}</div>
              <h2 className="mt-5 text-heading-6 font-bold text-dark dark:text-white">{stat.value}</h2>
              <p className="mt-1 text-sm font-semibold text-dark-6">{stat.note}</p>
            </div>
          ))}
        </section>
      )}

      {children}
    </div>
  );
}

function DataTable({
  config,
  onModal,
}: {
  config: MedCareConfig;
  onModal: (title: string, row?: string[]) => void;
}) {
  const isMaster = config.rowAction === "modal";
  const renderActions = (row: string[]) => (
    <div className="flex justify-end gap-2">
      {isMaster ? (
        <>
          <IconButton label="Lihat detail" onClick={() => onModal(`Detail ${config.title}`, row)}><EyeIcon /></IconButton>
          <IconButton label="Edit" tone="edit" onClick={() => onModal(`Edit ${config.title}`, row)}><EditIcon /></IconButton>
          <IconButton label="Hapus" tone="danger" onClick={() => onModal(`Hapus ${config.title}`, row)}><DeleteIcon /></IconButton>
        </>
      ) : (
        <>
          <IconButton label="Lihat detail" href={`/${config.path}/${row[0]}`}><EyeIcon /></IconButton>
          <IconButton label="Edit / lanjut draft" tone="edit" href={`/${config.path}/create`}><EditIcon /></IconButton>
          <IconButton label="Batalkan" tone="danger" onClick={() => onModal(`Batalkan ${config.title}`, row)}><DeleteIcon /></IconButton>
        </>
      )}
    </div>
  );

  return (
    <div className="rounded-[10px] bg-white px-5 pb-5 pt-6 shadow-1 dark:bg-gray-dark md:px-7.5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Daftar {config.title}</h2>
          <p className="mt-1 text-sm font-medium text-dark-6">
            Pantau data aktif, status terakhir, dan tindak lanjut sesuai alur kerja klinik.
          </p>
        </div>
        <input
          className="h-11 rounded-lg border border-stroke bg-gray-2 px-4 text-sm font-medium outline-none focus:border-primary dark:border-stroke-dark dark:bg-dark-2"
          placeholder={`Cari ${config.title.toLowerCase()}...`}
        />
      </div>

      <div className="space-y-3 md:hidden">
        {config.rows.map((row) => (
          <article key={row[0]} className="rounded-[10px] border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-primary">{row[0]}</p>
                <h3 className="mt-1 text-base font-bold text-dark dark:text-white">{row[1] || config.title}</h3>
              </div>
              {row.at(-1) && <StatusPill>{row.at(-1) || ""}</StatusPill>}
            </div>

            <dl className="mt-4 grid gap-3">
              {config.columns.map((column, index) => (
                <div key={`${row[0]}-${column}`} className="flex items-start justify-between gap-4 border-t border-stroke pt-3 dark:border-stroke-dark">
                  <dt className="text-xs font-bold uppercase text-dark-5">{column}</dt>
                  <dd className="max-w-[60%] text-right text-sm font-semibold text-dark dark:text-white">
                    {index === row.length - 1 ? <StatusPill>{row[index]}</StatusPill> : row[index]}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 border-t border-stroke pt-3 dark:border-stroke-dark">
              {renderActions(row)}
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-y border-stroke text-sm uppercase text-dark-5 dark:border-stroke-dark">
              {config.columns.map((column) => (
                <th key={column} className="py-3 font-bold">{column}</th>
              ))}
              <th className="py-3 text-right font-bold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {config.rows.map((row) => (
              <tr key={row[0]} className="border-b border-stroke text-base font-medium dark:border-stroke-dark">
                {row.map((cell, index) => (
                  <td key={cell + index} className={cx("py-4", index === 0 ? "text-primary" : "text-dark dark:text-white")}>
                    {index === row.length - 1 ? <StatusPill>{cell}</StatusPill> : cell}
                  </td>
                ))}
                <td className="py-4">
                  {renderActions(row)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QueueWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  const ticketModes = [
    ["Booking Online", "Kode booking / Mobile JKN", "Check-in"],
    ["Datang Langsung", "Input NIK / No. RM", "Ambil Tiket"],
    ["Pasien BPJS", "Validasi status peserta", "Verifikasi"],
  ];

  const callSteps = ["Panggil", "Panggil Ulang", "Lewat", "Selesai"];

  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Pengambilan Tiket</h2>
            <p className="mt-1 text-sm font-medium text-dark-6">Booking online dan pasien datang langsung masuk ke antrean yang sama.</p>
          </div>
          <Link href="/antrian/layar-antrian" className="rounded-lg border border-primary px-4 py-2.5 text-sm font-semibold text-primary hover:bg-[#ECFDF5]">
            Buka Layar TV
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {ticketModes.map(([title, description, action]) => (
            <button
              key={title}
              onClick={() => onModal(action)}
              className="rounded-[10px] border border-stroke bg-gray-2 p-4 text-left transition hover:border-primary hover:bg-[#ECFDF5] dark:border-stroke-dark dark:bg-dark-2"
            >
              <p className="text-base font-bold text-dark dark:text-white">{title}</p>
              <p className="mt-2 min-h-10 text-sm font-medium text-dark-6">{description}</p>
              <span className="mt-4 inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">{action}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-[10px] border border-stroke p-4 dark:border-stroke-dark">
          <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-primary">Sedang Dipanggil</p>
              <h3 className="mt-2 text-heading-4 font-extrabold text-dark dark:text-white">A-014</h3>
              <p className="mt-1 font-semibold text-dark-6">Siti Rahma - Poli Anak - dr. Sinta</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {callSteps.map((step) => (
                <button key={step} onClick={() => onModal(step)} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-800">
                  {step}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Antrean Berikutnya</h2>
        <div className="mt-5 space-y-3">
          {config.rows.slice(1).map((row) => (
            <div key={row[0]} className="flex items-center justify-between gap-3 rounded-lg border border-stroke p-3 dark:border-stroke-dark">
              <div>
                <p className="font-bold text-dark dark:text-white">{row[0]} - {row[1]}</p>
                <p className="text-sm font-medium text-dark-6">{row[3]} / {row[2]}</p>
              </div>
              <StatusPill>{row[4]}</StatusPill>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function QueueTvDisplay({ config }: { config: MedCareConfig }) {
  const [called, ...nextRows] = config.rows;
  const [now, setNow] = useState(new Date());
  const [blink, setBlink] = useState(true);
  const [tickerX, setTickerX] = useState(0);

  useEffect(() => {
    const clockInterval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 800);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    let frame: number;
    let x = 0;
    const speed = 0.7;
    const totalWidth = 1400;
    const animate = () => {
      x -= speed;
      if (x < -totalWidth) x = window.innerWidth;
      setTickerX(x);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  const dayName = days[now.getDay()];
  const dateStr = `${dayName}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const timeStr = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  const poliList = [
    { poli: "Poli Umum", dokter: "dr. Amelia Putri", current: "A-015", next: "A-016", waiting: 8 },
    { poli: "Poli Anak", dokter: "dr. Sinta Maharani", current: "A-014", next: "A-017", waiting: 5 },
    { poli: "Poli Gigi", dokter: "dr. Raka Pratama", current: "B-006", next: "B-007", waiting: 4 },
  ];

  const tickerText = "📢 Nomor A-014 atas nama SITI RAHMA harap segera menuju POLI ANAK — Ruang 3   ·   Nomor A-015 atas nama BUDI SANTOSO harap bersiap menuju POLI UMUM — Ruang 1   ·   Harap siapkan kartu identitas & kartu BPJS   ·   Terima kasih telah memilih layanan 7Care Klinik   ·   ";

  return (
    <main className="flex min-h-screen flex-col bg-gray-2">

      {/* ── HEADER ── */}
      <header className="flex items-center justify-between gap-6 bg-primary px-8 py-5 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
              <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" stroke="white" strokeWidth="1.5"/>
              <path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70">7Care Klinik</p>
            <h1 className="text-2xl font-black leading-tight text-white">Layar Antrian</h1>
          </div>
        </div>

        {/* Live Stats */}
        <div className="hidden items-center gap-4 lg:flex">
          {config.stats.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white/15 px-4 py-2 text-center">
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs font-semibold text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Clock */}
        <div className="text-right">
          <p className="text-3xl font-black tabular-nums text-white">{timeStr}</p>
          <p className="mt-0.5 text-sm font-semibold text-white/70">{dateStr}</p>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="flex flex-1 flex-col gap-5 p-6 md:p-8">

        {/* Hero + Next Queue */}
        <section className="grid flex-none gap-5 xl:grid-cols-[1.6fr_1fr]">

          {/* Big Number Panel — primary bg */}
          <div className="relative overflow-hidden rounded-[10px] bg-primary p-8 shadow-1 md:p-10">
            {/* Decorative rings */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border-2 border-white/10" />
            <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full border-2 border-white/10" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <span
                  className="inline-block h-3 w-3 rounded-full transition-all duration-200"
                  style={{ background: blink ? "#FFFFFF" : "rgba(255,255,255,0.3)" }}
                />
                <p className="text-base font-black uppercase tracking-widest text-white/80">🔔 Sedang Dipanggil</p>
              </div>

              <div
                className="mt-4 font-black leading-none text-white"
                style={{ fontSize: "clamp(5rem,14vw,12rem)", letterSpacing: "-0.02em" }}
              >
                {called?.[0] || "A-014"}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { label: "Pasien", value: called?.[1] ?? "" },
                  { label: "Poli", value: called?.[3] ?? "" },
                  { label: "Status", value: called?.[4] ?? "" },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-xl bg-white/15 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/60">{label}</p>
                    <p className="mt-1 text-lg font-black text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Queue Panel — white card */}
          <div className="flex flex-col gap-3">
            <div className="rounded-[10px] bg-white px-5 py-4 shadow-1">
              <p className="text-xs font-black uppercase tracking-widest text-dark-5">Antrean Berikutnya</p>
            </div>
            {nextRows.slice(0, 3).map((row, idx) => (
              <div
                key={row[0]}
                className={`flex items-center gap-4 rounded-[10px] p-4 shadow-1 transition-all ${
                  idx === 0
                    ? "border border-[#CCFBF1] bg-[#F0FDFA]"
                    : "bg-white"
                }`}
              >
                <div
                  className={`flex h-14 w-14 flex-none items-center justify-center rounded-xl text-xl font-black ${
                    idx === 0 ? "bg-primary text-white" : "bg-gray-2 text-dark"
                  }`}
                >
                  {row[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-black text-dark">{row[1]}</p>
                  <p className="mt-0.5 text-sm font-semibold text-dark-6">{row[3]} · {row[2]}</p>
                </div>
                <span className={`flex-none rounded-full px-3 py-1 text-xs font-bold ${
                  idx === 0 ? "bg-[#CCFBF1] text-primary" : "bg-gray-2 text-dark-5"
                }`}>
                  {row[4]}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── POLI STATUS GRID ── */}
        <section className="grid gap-4 sm:grid-cols-3">
          {poliList.map(({ poli, dokter, current, next, waiting }) => (
            <div key={poli} className="rounded-[10px] bg-white p-5 shadow-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-primary">{poli}</p>
                  <p className="mt-1 text-sm font-semibold text-dark-6">{dokter}</p>
                </div>
                <span className="rounded-lg bg-[#CCFBF1] px-2 py-1 text-xs font-bold text-primary">
                  {waiting} menunggu
                </span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-primary p-3">
                  <p className="text-xs font-semibold text-white/70">Dipanggil</p>
                  <p className="mt-1 text-xl font-black text-white">{current}</p>
                </div>
                <div className="rounded-xl bg-gray-2 p-3">
                  <p className="text-xs font-semibold text-dark-5">Berikutnya</p>
                  <p className="mt-1 text-xl font-black text-dark">{next}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      {/* ── TICKER BAR ── */}
      <footer className="flex-none overflow-hidden bg-primary py-3">
        <div
          className="whitespace-nowrap text-sm font-black uppercase tracking-wide text-white/90"
          style={{ transform: `translateX(${tickerX}px)`, willChange: "transform" }}
        >
          {tickerText.repeat(3)}
        </div>
      </footer>
    </main>
  );
}

function ScheduleBoard({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  const stages = [
    {
      status: "Booking",
      count: "8",
      patient: "Budi Santoso",
      detail: "09.00",
      color: "#0D9488",
      bg: "bg-[#F0FDFA] dark:bg-teal-900/10",
      border: "border-[#CCFBF1] dark:border-teal-800/30",
      badge: "bg-[#CCFBF1] text-primary dark:bg-teal-900/30 dark:text-teal-300",
      dot: "bg-primary",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M6 2v2m8-2v2M3 7h14M5 3h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      status: "Check-in",
      count: "5",
      patient: "Rina Kartika",
      detail: "09.20",
      color: "#0D9488",
      bg: "bg-[#F0FDFA] dark:bg-teal-900/10",
      border: "border-[#CCFBF1] dark:border-teal-800/30",
      badge: "bg-[#CCFBF1] text-primary dark:bg-teal-900/30 dark:text-teal-300",
      dot: "bg-primary",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M10 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-7 14c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="m13 13 1.5 1.5L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      status: "Menunggu",
      count: "4",
      patient: "Andi Wijaya",
      detail: "10.15",
      color: "#0D9488",
      bg: "bg-[#F0FDFA] dark:bg-teal-900/10",
      border: "border-[#CCFBF1] dark:border-teal-800/30",
      badge: "bg-[#CCFBF1] text-primary dark:bg-teal-900/30 dark:text-teal-300",
      dot: "bg-primary",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
          <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10 6v4.5l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      status: "Diperiksa",
      count: "6",
      patient: "Siti Rahma",
      detail: "Ruang 2",
      color: "#0D9488",
      bg: "bg-[#F0FDFA] dark:bg-teal-900/10",
      border: "border-[#CCFBF1] dark:border-teal-800/30",
      badge: "bg-[#CCFBF1] text-primary dark:bg-teal-900/30 dark:text-teal-300",
      dot: "bg-primary",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M10 2C5.582 2 2 5.582 2 10s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M7 10.5 9 13l4-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      status: "Selesai",
      count: "16",
      patient: "Agus Pratama",
      detail: "Invoice",
      color: "#0D9488",
      bg: "bg-[#F0FDFA] dark:bg-teal-900/10",
      border: "border-[#CCFBF1] dark:border-teal-800/30",
      badge: "bg-[#CCFBF1] text-primary dark:bg-teal-900/30 dark:text-teal-300",
      dot: "bg-primary",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M5 10.5 8.5 14 15 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      status: "Perlu Kontrol",
      count: "9",
      patient: "Nadia Putri",
      detail: "7 hari",
      color: "#0D9488",
      bg: "bg-[#F0FDFA] dark:bg-teal-900/10",
      border: "border-[#CCFBF1] dark:border-teal-800/30",
      badge: "bg-[#CCFBF1] text-primary dark:bg-teal-900/30 dark:text-teal-300",
      dot: "bg-primary",
      icon: (
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M10 2v8m0 4v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
    },
  ];

  const totalPatients = stages.reduce((sum, s) => sum + parseInt(s.count), 0);

  const slots = [
    { time: "08.00", doctor: "dr. Amelia Putri", poli: "Poli Umum", total: 12, filled: 6, color: "#14B8A6" },
    { time: "09.00", doctor: "dr. Raka Pratama", poli: "Poli Gigi", total: 8, filled: 4, color: "#0D9488" },
    { time: "13.00", doctor: "dr. Sinta Maharani", poli: "Poli Anak", total: 10, filled: 8, color: "#0F766E" },
  ];

  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      {/* ── KANBAN PIPELINE ── */}
      <div className="col-span-12 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark xl:col-span-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-5 dark:border-stroke-dark md:px-7.5">
          <div>
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Alur Kunjungan Pasien</h2>
            <p className="mt-1 text-sm font-medium text-dark-6">Alur pasien hari ini dari booking sampai kontrol ulang — {totalPatients} total</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#CCFBF1] px-3 py-1 text-xs font-bold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Live
            </span>
            <button
              onClick={() => onModal("Update Alur")}
              className="rounded-lg border border-stroke px-3 py-1.5 text-xs font-bold text-dark-5 hover:border-primary hover:text-primary dark:border-stroke-dark dark:text-dark-6"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Progress Flow Bar */}
        <div className="px-5 pt-5 md:px-7.5">
          <div className="flex items-center gap-0 overflow-x-auto">
            {stages.map((stage, idx) => {
              const pct = Math.round((parseInt(stage.count) / totalPatients) * 100);
              return (
                <div key={stage.status} className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1 text-center">
                    <div
                      className="mx-auto flex h-8 w-8 items-center justify-center rounded-full text-white"
                      style={{ background: stage.color }}
                    >
                      <span className="text-xs font-black">{stage.count}</span>
                    </div>
                    <p className="mt-1 truncate text-xs font-bold text-dark-5 dark:text-dark-6">{stage.status}</p>
                    <p className="text-xs font-semibold" style={{ color: stage.color }}>{pct}%</p>
                  </div>
                  {idx < stages.length - 1 && (
                    <div className="mx-1 h-0.5 w-6 flex-none rounded-full bg-stroke dark:bg-stroke-dark" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Stacked progress bar — uniform primary with opacity steps */}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-2 dark:bg-dark-2">
            <div className="h-full w-full rounded-full bg-primary" />
          </div>
        </div>

        {/* Kanban Cards */}
        <div className="grid gap-3 p-5 md:grid-cols-2 md:p-7.5 2xl:grid-cols-3">
          {stages.map((stage) => {
            const initials = stage.patient.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <div
                key={stage.status}
                className={`group rounded-xl border p-4 transition-all duration-200 hover:shadow-md ${stage.bg} ${stage.border}`}
              >
                {/* Stage header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg p-1.5" style={{ background: `${stage.color}18`, color: stage.color }}>
                      {stage.icon}
                    </div>
                    <h3 className="text-sm font-black text-dark dark:text-white">{stage.status}</h3>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-black ${stage.badge}`}>
                    {stage.count}
                  </span>
                </div>

                {/* Patient card */}
                <div className="mt-3 rounded-xl bg-white p-3 shadow-sm dark:bg-gray-dark">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 flex-none items-center justify-center rounded-full text-xs font-black text-white"
                      style={{ background: stage.color }}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-dark dark:text-white">{stage.patient}</p>
                      <p className="mt-0.5 text-xs font-medium text-dark-6">{stage.detail} · dr. Amelia</p>
                    </div>
                  </div>
                  <button
                    onClick={() => onModal(`Ubah status ${stage.status}`)}
                    className="mt-3 flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-xs font-bold transition hover:opacity-80"
                    style={{ background: `${stage.color}15`, color: stage.color }}
                  >
                    Ubah Status
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                      <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── SLOT JADWAL ── */}
      <div className="col-span-12 rounded-[10px] bg-white shadow-1 dark:bg-gray-dark xl:col-span-4">
        <div className="border-b border-stroke px-5 py-5 dark:border-stroke-dark md:px-7.5">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Slot Jadwal Hari Ini</h2>
          <p className="mt-1 text-sm font-medium text-dark-6">Kapasitas dan ketersediaan per dokter</p>
        </div>
        <div className="space-y-4 p-5 md:p-7.5">
          {slots.map(({ time, doctor, poli, total, filled, color }) => {
            const pct = Math.round((filled / total) * 100);
            const initials = doctor.replace("dr. ", "").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
            return (
              <button
                key={time}
                onClick={() => onModal(`Jadwal ${doctor}`)}
                className="group flex w-full flex-col gap-3 rounded-xl border border-stroke p-4 text-left transition hover:border-primary hover:shadow-md dark:border-stroke-dark"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-sm font-black text-white"
                      style={{ background: color }}
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-dark dark:text-white">{doctor}</p>
                      <p className="text-xs font-medium text-dark-6">{poli}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-dark dark:text-white">{time}</p>
                    <p className="text-xs font-semibold text-dark-6">{filled}/{total} pasien</p>
                  </div>
                </div>

                {/* Capacity bar */}
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-semibold text-dark-6">Kapasitas terisi</span>
                    <span className="text-xs font-black" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-2 dark:bg-dark-2">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: color }}
                    />
                  </div>
                </div>

                {/* Slot dots */}
                <div className="flex flex-wrap gap-1">
                  {Array.from({ length: total }).map((_, i) => (
                    <span
                      key={i}
                      className="h-2 w-2 rounded-full"
                      style={{ background: i < filled ? color : undefined }}
                      {...(i >= filled ? { className: "h-2 w-2 rounded-full bg-stroke dark:bg-stroke-dark" } : {})}
                    />
                  ))}
                </div>
              </button>
            );
          })}

          {/* Summary */}
          <div className="rounded-xl bg-gray-2 p-4 dark:bg-dark-2">
            <p className="text-xs font-bold uppercase tracking-wide text-dark-5 dark:text-dark-6">Ringkasan Hari Ini</p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                { label: "Dokter Aktif", value: "3" },
                { label: "Total Slot", value: "30" },
                { label: "Sisa Slot", value: "12" },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-xl font-black text-primary">{value}</p>
                  <p className="mt-0.5 text-xs font-semibold text-dark-6">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function PatientWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Ringkasan Pasien</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {["42 th", "Laki-laki", "O+", "Alergi: Amoxicillin", "Kunjungan: 8", "Piutang: Rp 0"].map((item) => (
            <div key={item} className="rounded-lg bg-[#CCFBF1] px-4 py-3 text-sm font-bold text-primary">{item}</div>
          ))}
        </div>
      </div>
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-7">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Riwayat Medis</h2>
        <div className="mt-5 space-y-4">
          {timeline.map(([date, diagnosis, note, status]) => (
            <div key={date} className="border-l-4 border-primary pl-4">
              <p className="font-bold text-dark dark:text-white">{date} - {diagnosis}</p>
              <p className="mt-1 text-sm font-medium text-dark-6">{note}</p>
              <div className="mt-2"><StatusPill>{status}</StatusPill></div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-5">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Berkas Pasien</h2>
        <div className="mt-5 space-y-3">
          {fileVault.map(([category, file, status]) => (
            <button key={file} onClick={() => onModal(`Preview ${category}`)} className="flex w-full items-center justify-between rounded-lg border border-stroke p-3 text-left dark:border-stroke-dark">
              <span>
                <span className="block font-bold text-dark dark:text-white">{category}</span>
                <span className="text-sm font-medium text-dark-6">{file}</span>
              </span>
              <StatusPill>{status}</StatusPill>
            </button>
          ))}
        </div>
      </div>
      <div className="col-span-12">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function PatientHistoryWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  const controls = [
    ["Kontrol Berikutnya", "03 Mei 2026, 09.00", "Terjadwal"],
    ["Reminder WhatsApp", "H-1 dan Hari H", "Reminder Terkirim"],
    ["Metode Bayar", "BPJS / Umum", "BPJS"],
  ];

  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Riwayat & Jadwal Kontrol</h2>
            <p className="mt-1 text-sm font-medium text-dark-6">Riwayat klinis ditampilkan per tanggal dengan keluhan, analisa dokter, obat, dan reminder kontrol.</p>
          </div>
          <button onClick={() => onModal("Buat Jadwal Kontrol")} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">
            Jadwalkan Kontrol
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {controls.map(([title, value, status]) => (
            <button key={title} onClick={() => onModal(title)} className="rounded-[10px] border border-stroke p-4 text-left transition hover:border-primary hover:bg-[#ECFDF5] dark:border-stroke-dark">
              <p className="text-sm font-bold uppercase text-dark-5">{title}</p>
              <p className="mt-2 text-lg font-black text-dark dark:text-white">{value}</p>
              <div className="mt-3"><StatusPill>{status}</StatusPill></div>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-12 xl:col-span-8">
        <DataTable config={config} onModal={onModal} />
      </div>

      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Timeline Kontrol</h2>
        <div className="mt-5 space-y-4">
          {["H-1 reminder WhatsApp terkirim", "Pasien konfirmasi hadir", "Kontrol dokter dibuat dari rekam medis"].map((item) => (
            <div key={item} className="border-l-4 border-primary pl-4">
              <p className="font-bold text-dark dark:text-white">{item}</p>
              <p className="mt-1 text-sm font-medium text-dark-6">Automasi follow up pasien rutin kontrol.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExamWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-5">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Tanda Vital</h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {["120/80 mmHg", "36.8 C", "68 kg", "172 cm", "82 bpm", "98% SpO2"].map((vital) => (
            <div key={vital} className="rounded-lg border border-stroke p-4 text-center font-bold text-dark dark:border-stroke-dark dark:text-white">{vital}</div>
          ))}
        </div>
      </div>
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-7">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Racikan Resep</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {["Pilih obat", "Dosis", "Aturan pakai", "Jumlah"].map((field) => (
            <div key={field} className="rounded-lg border border-stroke bg-gray-2 px-4 py-3 text-sm font-semibold text-dark-6 dark:border-stroke-dark dark:bg-dark-2">{field}</div>
          ))}
        </div>
        <button onClick={() => onModal("Tambah item resep")} className="mt-4 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">Tambah Obat</button>
      </div>
      <div className="col-span-12">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function PharmacyWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Kondisi Stok Obat</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {medicineHealth.map(([name, stock, status, percent]) => (
            <div key={name} className="rounded-[10px] border border-stroke p-4 dark:border-stroke-dark">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-dark dark:text-white">{name}</p>
                  <p className="mt-1 text-sm font-medium text-dark-6">{stock}</p>
                </div>
                <StatusPill>{status}</StatusPill>
              </div>
              <div className="mt-4 h-2 rounded-full bg-gray-2 dark:bg-dark-2">
                <div className="h-2 rounded-full bg-primary" style={{ width: percent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function FinanceWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-5">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Komposisi Tagihan</h2>
        <div className="mt-5 space-y-4">
          {financeBreakdown.map(([label, value, percent]) => (
            <div key={label}>
              <div className="mb-2 flex justify-between font-bold text-dark dark:text-white">
                <span>{label}</span>
                <span>{value}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-2 dark:bg-dark-2">
                <div className="h-2 rounded-full bg-primary" style={{ width: percent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-7">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Alur Pembayaran</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {["Draft Invoice", "Menunggu Bayar", "Pembayaran", "Posting Kas"].map((step, index) => (
            <div key={step} className="rounded-lg border border-stroke p-4 dark:border-stroke-dark">
              <span className="grid size-8 place-items-center rounded-lg bg-[#CCFBF1] text-sm font-bold text-primary">{index + 1}</span>
              <p className="mt-3 font-bold text-dark dark:text-white">{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function BpjsWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  const flow = [
    ["1", "Pasien Periksa", "Validasi BPJS, FKTP, dan status aktif"],
    ["2", "Rekam Medis", "Keluhan, analisa dokter, tindakan, obat"],
    ["3", "Ajukan Klaim", "Dokumen klaim dikirim untuk verifikasi"],
    ["4", "BPJS Bayar", "Penerimaan direkonsiliasi ke kas"],
  ];

  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Alur BPJS</h2>
            <p className="mt-1 text-sm font-medium text-dark-6">Dari pasien periksa menggunakan BPJS, klaim diajukan, diverifikasi, lalu pembayaran diterima klinik.</p>
          </div>
          <button onClick={() => onModal(config.primaryAction)} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">
            {config.primaryAction}
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          {flow.map(([number, title, description]) => (
            <button key={title} onClick={() => onModal(title)} className="rounded-[10px] border border-stroke bg-gray-2 p-4 text-left dark:border-stroke-dark dark:bg-dark-2">
              <span className="grid size-10 place-items-center rounded-full bg-primary text-sm font-black text-white">{number}</span>
              <p className="mt-4 text-base font-black text-dark dark:text-white">{title}</p>
              <p className="mt-2 text-sm font-medium text-dark-6">{description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Ringkasan Klaim</h2>
        <div className="mt-5 space-y-4">
          {config.stats.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-stroke p-4 dark:border-stroke-dark">
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-dark dark:text-white">{stat.label}</p>
                <span className={cx("rounded-full px-2.5 py-1 text-xs font-bold", stat.tone)}>{stat.value}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-dark-6">{stat.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 xl:col-span-8">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function ReportWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Filter & Grafik Laporan</h2>
          <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">Ekspor</button>
        </div>
        <div className="mt-6 flex h-56 items-end gap-4 border-b border-stroke pb-4 dark:border-stroke-dark">
          {[42, 68, 54, 82, 76, 61, 88].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div className="w-full max-w-14 rounded-t-lg bg-primary" style={{ height: `${height}%` }} />
              <span className="text-xs font-bold text-dark-6">D{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function MasterWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function SettingsWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  const controls = [
    ["Reminder Kontrol", "Kirim otomatis H-1 via WhatsApp", "Aktif"],
    ["Stok Minimum", "Peringatan farmasi saat stok di bawah batas", "Aktif"],
    ["Invoice Otomatis", "Nomor invoice mengikuti pola harian", "Aktif"],
    ["Approval Rekam Medis", "Finalisasi catatan oleh dokter", "Aktif"],
  ];

  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
        <div className="grid gap-4 lg:grid-cols-4">
          {controls.map(([title, description, status]) => (
            <button
              key={title}
              onClick={() => onModal(title)}
              className="rounded-[10px] border border-stroke bg-gray-2 p-4 text-left transition hover:border-primary hover:bg-[#ECFDF5] dark:border-stroke-dark dark:bg-dark-2"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-dark dark:text-white">{title}</span>
                <span className="relative h-6 w-11 rounded-full bg-primary">
                  <span className="absolute right-1 top-1 size-4 rounded-full bg-white" />
                </span>
              </div>
              <p className="min-h-10 text-sm font-medium text-dark-6">{description}</p>
              <StatusPill>{status}</StatusPill>
            </button>
          ))}
        </div>
      </div>

      <div className="col-span-12 xl:col-span-4">
        <div className="rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Pengaturan Klinik</h2>
          <div className="mt-5 space-y-4">
            {["Identitas 7Care", "Reminder follow up", "Peringatan stok farmasi", "Nomor dokumen klinik"].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border border-stroke p-3 dark:border-stroke-dark">
                <span className="size-2 rounded-full bg-primary" />
                <span className="text-sm font-semibold text-dark-5 dark:text-dark-6">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-8">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function CreateForm({ config }: { config: MedCareConfig }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">{config.createAction || config.primaryAction}</h2>
          <StatusPill>Draft</StatusPill>
        </div>
        <div className="space-y-7">
          {config.formSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-bold text-dark dark:text-white">{section.title}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {section.fields.map((field) => (
                  <label key={field} className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-dark-5">{field}</span>
                    <div className="h-11 rounded-lg border border-stroke bg-gray-2 px-4 py-2.5 text-sm font-medium text-dark-6 dark:border-stroke-dark dark:bg-dark-2">
                      Isi {field.toLowerCase()}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 space-y-4 xl:col-span-4">
        <div className="rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Status Dokumen</h2>
          <div className="mt-5 space-y-3">
            {["Draft dibuat", "Validasi data", "Submit final"].map((step, index) => (
              <div key={step} className="flex items-center gap-3 rounded-lg border border-stroke p-3 dark:border-stroke-dark">
                <span className="grid size-8 place-items-center rounded-lg bg-[#CCFBF1] text-sm font-bold text-primary">{index + 1}</span>
                <span className="font-semibold text-dark-5 dark:text-dark-6">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Aksi</h2>
          <div className="mt-5 grid gap-3">
            <button className="rounded-lg border border-stroke px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:text-white dark:hover:bg-dark-2">Simpan Draft</button>
            <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">Simpan & Submit</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailView({ config, recordId }: { config: MedCareConfig; recordId?: string }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-primary">{recordId || "7C-001"}</p>
            <h2 className="mt-2 text-heading-6 font-bold text-dark dark:text-white">Detail {config.title}</h2>
            <p className="mt-2 font-medium text-dark-6">Detail lengkap dengan status, aktivitas, catatan, dan aksi lanjutan.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg border border-stroke px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:text-white dark:hover:bg-dark-2">Cetak</button>
            <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">Proses Berikutnya</button>
          </div>
        </div>
      </div>
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-7">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Informasi Detail</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {config.rows[0]?.map((cell, index) => (
            <div key={cell + index} className="rounded-lg border border-stroke p-4 dark:border-stroke-dark">
              <p className="text-sm font-semibold text-dark-6">{config.columns[index] || "Data"}</p>
              <p className="mt-2 font-bold text-dark dark:text-white">{cell}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-5">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Riwayat Aktivitas</h2>
        <div className="mt-5 space-y-4">
          {["Draft dibuat admin", "Validasi data selesai", "Menunggu aksi berikutnya"].map((item) => (
            <div key={item} className="border-l-4 border-primary pl-4 font-semibold text-dark-5 dark:text-dark-6">{item}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PopupModal({
  title,
  row,
  config,
  onClose,
}: {
  title: string;
  row?: string[];
  config: MedCareConfig;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const isDelete = title.startsWith("Hapus");
  const isCancel = title.startsWith("Batalkan");
  const isConfirm = isDelete || isCancel;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-[2px]">
      {isConfirm ? (
        <div className="w-full max-w-md rounded-[10px] bg-white p-6 shadow-2 dark:bg-gray-dark">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300">
            <DeleteIcon />
          </div>
          <div className="mt-5 text-center">
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">{title}</h2>
            <p className="mt-2 text-sm font-medium text-dark-6">
              {isDelete
                ? "Yakin ingin menghapus data ini?"
                : "Yakin ingin membatalkan data ini?"}
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button onClick={onClose} className="rounded-lg border border-stroke px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:text-white">
              Batal
            </button>
            <button onClick={onClose} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">
              {isDelete ? "Hapus" : "Batalkan"}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl rounded-[10px] bg-white p-6 shadow-2 dark:bg-gray-dark">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">{title}</h2>
            <p className="mt-1 text-sm font-medium text-dark-6">Kelola data acuan tanpa meninggalkan halaman daftar.</p>
          </div>
          <button onClick={onClose} className="rounded-lg border border-stroke px-3 py-1.5 text-sm font-bold dark:border-stroke-dark">Tutup</button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {config.formSections[0]?.fields.map((field, index) => (
            <label key={field} className="block">
              <span className="mb-1.5 block text-sm font-semibold text-dark-5">{field}</span>
              <div className="h-11 rounded-lg border border-stroke bg-gray-2 px-4 py-2.5 text-sm font-medium text-dark-6 dark:border-stroke-dark dark:bg-dark-2">
                {row?.[index] || `Isi ${field.toLowerCase()}`}
              </div>
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-stroke px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:text-white">Batal</button>
          <button onClick={onClose} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">Simpan Perubahan</button>
        </div>
      </div>
      )}
    </div>,
    document.body,
  );
}

function ListRenderer({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  if (config.type === "queue") return <QueueWorkspace config={config} onModal={onModal} />;
  if (config.type === "schedule") return <ScheduleBoard config={config} onModal={onModal} />;
  if (config.path === "pasien/riwayat") return <PatientHistoryWorkspace config={config} onModal={onModal} />;
  if (config.type === "patient") return <PatientWorkspace config={config} onModal={onModal} />;
  if (config.type === "exam") return <ExamWorkspace config={config} onModal={onModal} />;
  if (config.type === "pharmacy") return <PharmacyWorkspace config={config} onModal={onModal} />;
  if (config.type === "finance") return <FinanceWorkspace config={config} onModal={onModal} />;
  if (config.type === "bpjs") return <BpjsWorkspace config={config} onModal={onModal} />;
  if (config.type === "report") return <ReportWorkspace config={config} onModal={onModal} />;
  if (config.type === "settings") return <SettingsWorkspace config={config} onModal={onModal} />;
  return <MasterWorkspace config={config} onModal={onModal} />;
}

export function MedCarePageClient({ config, mode, recordId }: Props) {
  const [modal, setModal] = useState<{ title: string; row?: string[] } | null>(null);

  if (config.type === "queue-tv") {
    return <QueueTvDisplay config={config} />;
  }

  return (
    <PageShell
      config={config}
      mode={mode}
      recordId={recordId}
      onMasterAdd={() => setModal({ title: config.primaryAction })}
    >
      {mode === "create" ? (
        <CreateForm config={config} />
      ) : mode === "detail" ? (
        <DetailView config={config} recordId={recordId} />
      ) : (
        <ListRenderer config={config} onModal={(title, row) => setModal({ title, row })} />
      )}

      {modal && (
        <PopupModal title={modal.title} row={modal.row} config={config} onClose={() => setModal(null)} />
      )}
    </PageShell>
  );
}
