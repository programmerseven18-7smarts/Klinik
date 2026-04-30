"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
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
  if (["Aktif", "Aman", "Final", "Lunas", "Dibayar", "Terverifikasi", "Tersimpan", "Siap Export"].includes(status)) {
    return "bg-emerald-50 text-emerald-700";
  }

  if (["Menunggu", "Booking", "Draft", "Review", "Menipis", "Perlu Kontrol", "Reminder Terkirim", "Terjadwal", "Sebagian"].includes(status)) {
    return "bg-amber-50 text-amber-700";
  }

  if (["Kritis", "Expired Dekat", "Belum Lunas", "Terlewat"].includes(status)) {
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
  tone = "default",
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  tone?: "default" | "danger";
}) {
  const className = cx(
    "inline-grid size-9 place-items-center rounded-lg border border-stroke text-dark-5 transition hover:bg-gray-2 dark:border-stroke-dark dark:hover:bg-dark-2",
    tone === "danger" && "hover:text-red-600",
    tone === "default" && "hover:text-primary",
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
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.25 12s3.5-6.25 9.75-6.25S21.75 12 21.75 12 18.25 18.25 12 18.25 2.25 12 2.25 12Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 14.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 20h4.5L19.25 9.25a2.12 2.12 0 0 0-3-3L5.5 17H4v3Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg className="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 7h12M10 11v6M14 11v6M9 7l.5-2h5L15 7M8 7l.75 13h6.5L16 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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
          {mode === "create" ? "Simpan & Submit" : "Update Status"}
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
              {mode === "create" ? config.createAction || config.primaryAction : mode === "detail" ? `${config.title} Detail` : config.title}
            </h1>
            <p className="mt-2 max-w-3xl font-medium text-dark-6">
              {mode === "detail" ? `Detail dummy ${recordId || "MC7-001"} dengan alur aksi, status, dan komponen sesuai modul.` : config.description}
            </p>
          </div>

          <HeaderActions config={config} mode={mode} onMasterAdd={onMasterAdd} />
        </div>
      </section>

      {mode === "list" && (
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

  return (
    <div className="rounded-[10px] bg-white px-5 pb-5 pt-6 shadow-1 dark:bg-gray-dark md:px-7.5">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Daftar {config.title}</h2>
          <p className="mt-1 text-sm font-medium text-dark-6">
            Data dummy siap dipakai untuk alur list, detail, create, draft, dan status.
          </p>
        </div>
        <input
          className="h-11 rounded-lg border border-stroke bg-gray-2 px-4 text-sm font-medium outline-none focus:border-primary dark:border-stroke-dark dark:bg-dark-2"
          placeholder={`Cari ${config.title.toLowerCase()}...`}
        />
      </div>

      <div className="overflow-x-auto">
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
                  <div className="flex justify-end gap-2">
                    {isMaster ? (
                      <>
                        <IconButton label="Lihat detail" onClick={() => onModal(`Detail ${config.title}`, row)}><EyeIcon /></IconButton>
                        <IconButton label="Edit" onClick={() => onModal(`Edit ${config.title}`, row)}><EditIcon /></IconButton>
                        <IconButton label="Hapus" tone="danger" onClick={() => onModal(`Hapus ${config.title}`, row)}><DeleteIcon /></IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton label="Lihat detail" href={`/${config.path}/${row[0]}`}><EyeIcon /></IconButton>
                        <IconButton label="Edit / lanjut draft" href={`/${config.path}/create`}><EditIcon /></IconButton>
                        <IconButton label="Batalkan" tone="danger" onClick={() => onModal(`Batalkan ${config.title}`, row)}><DeleteIcon /></IconButton>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScheduleBoard({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-8">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Patient Journey Board</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
          {journey.map(([status, count, patient, time]) => (
            <div key={status} className="rounded-[10px] border border-stroke bg-gray-2 p-4 dark:border-stroke-dark dark:bg-dark-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-dark dark:text-white">{status}</h3>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-primary dark:bg-gray-dark">{count}</span>
              </div>
              <div className="mt-4 rounded-lg bg-white p-3 shadow-card dark:bg-gray-dark">
                <p className="font-bold text-dark dark:text-white">{patient}</p>
                <p className="mt-1 text-sm font-medium text-dark-6">{time} - dr. Amelia</p>
                <button onClick={() => onModal(`Update status ${status}`)} className="mt-3 text-sm font-bold text-primary">Update Status</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Slot Jadwal</h2>
        <div className="mt-5 space-y-3">
          {["08.00 dr. Amelia - 6 pasien", "09.00 dr. Raka - 4 pasien", "13.00 dr. Sinta - 8 pasien"].map((slot) => (
            <div key={slot} className="rounded-lg border border-stroke p-3 font-semibold text-dark-5 dark:border-stroke-dark dark:text-dark-6">{slot}</div>
          ))}
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
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Patient Snapshot Bar</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
          {["42 th", "Laki-laki", "O+", "Alergi: Amoxicillin", "Kunjungan: 8", "Piutang: Rp 0"].map((item) => (
            <div key={item} className="rounded-lg bg-[#CCFBF1] px-4 py-3 text-sm font-bold text-primary">{item}</div>
          ))}
        </div>
      </div>
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-7">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Medical Timeline</h2>
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
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Patient File Vault</h2>
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

function ExamWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-5">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Vital Signs Panel</h2>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {["120/80 mmHg", "36.8 C", "68 kg", "172 cm", "82 bpm", "98% SpO2"].map((vital) => (
            <div key={vital} className="rounded-lg border border-stroke p-4 text-center font-bold text-dark dark:border-stroke-dark dark:text-white">{vital}</div>
          ))}
        </div>
      </div>
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-7">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Prescription Builder</h2>
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
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Medicine Stock Health</h2>
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
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Billing Breakdown</h2>
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
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Payment Flow</h2>
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

function ReportWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Filter & Grafik Laporan</h2>
          <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">Export</button>
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
      <div className="col-span-12 rounded-[10px] bg-white p-5 shadow-1 dark:bg-gray-dark md:p-7.5 xl:col-span-4">
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Master Data Rules</h2>
        <div className="mt-5 space-y-3">
          {["Tambah/Edit pakai modal", "Data dipakai transaksi", "Tidak perlu halaman create", "Status aktif/nonaktif"].map((rule) => (
            <div key={rule} className="rounded-lg border border-stroke p-3 text-sm font-semibold text-dark-5 dark:border-stroke-dark dark:text-dark-6">{rule}</div>
          ))}
        </div>
      </div>
      <div className="col-span-12 xl:col-span-8">
        <DataTable config={config} onModal={onModal} />
      </div>
    </section>
  );
}

function SettingsWorkspace({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  const controls = [
    ["Reminder Kontrol", "Kirim otomatis H-1 via WhatsApp", "Aktif"],
    ["Stok Minimum", "Warning farmasi saat stok di bawah batas", "Aktif"],
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
          <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Clinical System Pattern</h2>
          <div className="mt-5 space-y-4">
            {["Identitas MedCare7", "Reminder follow up", "Farmasi warning", "Nomor dokumen klinik"].map((item) => (
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
                      Input dummy {field.toLowerCase()}
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
            <p className="text-sm font-bold text-primary">{recordId || "MC7-001"}</p>
            <h2 className="mt-2 text-heading-6 font-bold text-dark dark:text-white">{config.title} Detail</h2>
            <p className="mt-2 font-medium text-dark-6">Detail dummy lengkap dengan status, aktivitas, catatan, dan aksi lanjutan.</p>
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
        <h2 className="text-body-2xlg font-bold text-dark dark:text-white">Activity Timeline</h2>
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
  return (
    <div className="fixed inset-0 z-99999 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-[10px] bg-white p-6 shadow-2 dark:bg-gray-dark">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-body-2xlg font-bold text-dark dark:text-white">{title}</h2>
            <p className="mt-1 text-sm font-medium text-dark-6">Popup master/dummy action sesuai pola master data.</p>
          </div>
          <button onClick={onClose} className="rounded-lg border border-stroke px-3 py-1.5 text-sm font-bold dark:border-stroke-dark">Tutup</button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {config.formSections[0]?.fields.map((field, index) => (
            <label key={field} className="block">
              <span className="mb-1.5 block text-sm font-semibold text-dark-5">{field}</span>
              <div className="h-11 rounded-lg border border-stroke bg-gray-2 px-4 py-2.5 text-sm font-medium text-dark-6 dark:border-stroke-dark dark:bg-dark-2">
                {row?.[index] || `Input ${field.toLowerCase()}`}
              </div>
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-stroke px-4 py-2.5 text-sm font-semibold text-dark hover:bg-gray-2 dark:border-stroke-dark dark:text-white">Batal</button>
          <button onClick={onClose} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">Simpan</button>
        </div>
      </div>
    </div>
  );
}

function ListRenderer({ config, onModal }: { config: MedCareConfig; onModal: (title: string, row?: string[]) => void }) {
  if (config.type === "schedule") return <ScheduleBoard config={config} onModal={onModal} />;
  if (config.type === "patient") return <PatientWorkspace config={config} onModal={onModal} />;
  if (config.type === "exam") return <ExamWorkspace config={config} onModal={onModal} />;
  if (config.type === "pharmacy") return <PharmacyWorkspace config={config} onModal={onModal} />;
  if (config.type === "finance") return <FinanceWorkspace config={config} onModal={onModal} />;
  if (config.type === "report") return <ReportWorkspace config={config} onModal={onModal} />;
  if (config.type === "settings") return <SettingsWorkspace config={config} onModal={onModal} />;
  return <MasterWorkspace config={config} onModal={onModal} />;
}

export function MedCarePageClient({ config, mode, recordId }: Props) {
  const [modal, setModal] = useState<{ title: string; row?: string[] } | null>(null);

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
