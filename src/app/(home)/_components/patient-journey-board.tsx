"use client";

import { cn } from "@/lib/utils";

type JourneyStatus =
  | "Booking"
  | "Check-in"
  | "Menunggu"
  | "Diperiksa"
  | "Selesai"
  | "Perlu Kontrol";

type PatientCard = {
  id: string;
  name: string;
  rm: string;
  doctor: string;
  poli: string;
  time: string;
  complaint: string;
  status: JourneyStatus;
};

const PATIENTS: PatientCard[] = [
  {
    id: "1",
    name: "Budi Santoso",
    rm: "RM-2024-0891",
    doctor: "dr. Amelia Putri",
    poli: "Poli Umum",
    time: "08:30",
    complaint: "Demam & batuk",
    status: "Selesai",
  },
  {
    id: "2",
    name: "Siti Rahma",
    rm: "RM-2024-0892",
    doctor: "dr. Raka Pratama",
    poli: "Poli Anak",
    time: "09:00",
    complaint: "Sesak napas ringan",
    status: "Diperiksa",
  },
  {
    id: "3",
    name: "Andi Wijaya",
    rm: "RM-2024-0893",
    doctor: "dr. Sinta Maharani",
    poli: "Poli Gigi",
    time: "09:30",
    complaint: "Sakit gigi geraham",
    status: "Menunggu",
  },
  {
    id: "4",
    name: "Rina Kartika",
    rm: "RM-2024-0894",
    doctor: "dr. Amelia Putri",
    poli: "Poli Peny. Dalam",
    time: "10:00",
    complaint: "Kontrol diabetes",
    status: "Check-in",
  },
  {
    id: "5",
    name: "Agus Pratama",
    rm: "RM-2024-0895",
    doctor: "dr. Raka Pratama",
    poli: "Poli Umum",
    time: "10:30",
    complaint: "Nyeri perut",
    status: "Booking",
  },
  {
    id: "6",
    name: "Maya Sari",
    rm: "RM-2024-0880",
    doctor: "dr. Sinta Maharani",
    poli: "Poli Gigi",
    time: "07:45",
    complaint: "Tambal gigi",
    status: "Perlu Kontrol",
  },
];

const COLUMNS: { status: JourneyStatus; label: string; color: string; dot: string }[] = [
  { status: "Booking", label: "Booking", color: "bg-gray-2 border-gray-3", dot: "bg-dark-6" },
  { status: "Check-in", label: "Check-in", color: "bg-sky-med-light border-blue-light-4", dot: "bg-sky-med" },
  { status: "Menunggu", label: "Menunggu", color: "bg-amber-50 border-amber-100", dot: "bg-amber-500" },
  { status: "Diperiksa", label: "Diperiksa", color: "bg-teal-50 border-teal-100", dot: "bg-primary" },
  { status: "Selesai", label: "Selesai", color: "bg-green-light-6 border-green-light-4", dot: "bg-mint-med" },
  { status: "Perlu Kontrol", label: "Perlu Kontrol", color: "bg-red-light-6 border-red-light-4", dot: "bg-red" },
];

const statusBadge: Record<JourneyStatus, string> = {
  "Booking": "bg-gray-2 text-dark-5 border border-gray-3",
  "Check-in": "bg-sky-med-light text-sky-med border border-blue-light-4",
  "Menunggu": "bg-amber-50 text-amber-600 border border-amber-100",
  "Diperiksa": "bg-teal-100 text-teal-700 border border-teal-200",
  "Selesai": "bg-green-light-5 text-green-dark border border-green-light-4",
  "Perlu Kontrol": "bg-red-light-5 text-red-dark border border-red-light-4",
};

function PatientCardItem({ p }: { p: PatientCard }) {
  return (
    <div className="rounded-lg border border-stroke bg-white p-3 shadow-card hover:shadow-card-2 transition-shadow">
      <div className="mb-2 flex items-start justify-between gap-1">
        <p className="text-[13px] font-bold leading-tight text-dark">{p.name}</p>
        <span className="shrink-0 text-[10px] font-semibold text-dark-5">{p.time}</span>
      </div>
      <p className="mb-2 text-[10px] font-medium text-dark-6">{p.rm}</p>
      <p className="mb-1 text-[11px] text-dark-5 line-clamp-1">
        <span className="font-medium text-dark-4">{p.poli}</span> · {p.doctor}
      </p>
      <p className="text-[11px] italic text-dark-6 line-clamp-1">&quot;{p.complaint}&quot;</p>
    </div>
  );
}

export function PatientJourneyBoard() {
  return (
    <div className="rounded-xl border border-stroke bg-white shadow-1 dark:bg-gray-dark">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stroke px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-dark dark:text-white">Patient Journey Board</h2>
          <p className="text-xs text-dark-5">Alur pasien real-time hari ini</p>
        </div>
        <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
          {PATIENTS.length} pasien aktif
        </span>
      </div>

      {/* Board */}
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-3 p-4">
          {COLUMNS.map((col) => {
            const cards = PATIENTS.filter((p) => p.status === col.status);
            return (
              <div key={col.status} className="w-44 shrink-0">
                {/* Column header */}
                <div
                  className={cn(
                    "mb-2 flex items-center justify-between rounded-lg border px-3 py-2",
                    col.color,
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={cn("h-2 w-2 rounded-full", col.dot)} />
                    <span className="text-xs font-semibold text-dark">{col.label}</span>
                  </div>
                  <span className="text-xs font-bold text-dark-4">{cards.length}</span>
                </div>

                {/* Cards */}
                <div className="flex flex-col gap-2">
                  {cards.map((p) => (
                    <PatientCardItem key={p.id} p={p} />
                  ))}
                  {cards.length === 0 && (
                    <div className="rounded-lg border border-dashed border-stroke py-5 text-center text-[11px] text-dark-6">
                      Tidak ada
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-stroke px-5 py-3">
        {COLUMNS.map((c) => (
          <div key={c.status} className="flex items-center gap-1.5">
            <span className={cn("h-2 w-2 rounded-full", c.dot)} />
            <span className="text-[11px] text-dark-5">{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { statusBadge };
