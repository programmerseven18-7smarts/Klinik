import { cn } from "@/lib/utils";

type FollowUpStatus = "Terjadwal" | "Terlewat" | "Reminder Terkirim" | "Sudah Datang";

type FollowUp = {
  patientName: string;
  rm: string;
  doctor: string;
  dueDate: string;
  reason: string;
  status: FollowUpStatus;
};

const FOLLOW_UPS: FollowUp[] = [
  {
    patientName: "Budi Santoso",
    rm: "RM-2024-0891",
    doctor: "dr. Amelia Putri",
    dueDate: "Hari ini",
    reason: "Kontrol tekanan darah",
    status: "Terjadwal",
  },
  {
    patientName: "Rina Kartika",
    rm: "RM-2024-0894",
    doctor: "dr. Hendra Wijaya",
    dueDate: "Kemarin",
    reason: "Kontrol gula darah",
    status: "Terlewat",
  },
  {
    patientName: "Maya Sari",
    rm: "RM-2024-0880",
    doctor: "dr. Sinta Maharani",
    dueDate: "Besok",
    reason: "Kontrol pasca cabut gigi",
    status: "Reminder Terkirim",
  },
  {
    patientName: "Agus Pratama",
    rm: "RM-2024-0895",
    doctor: "dr. Raka Pratama",
    dueDate: "3 Jan 2025",
    reason: "Kontrol alergi",
    status: "Terjadwal",
  },
];

const statusStyle: Record<FollowUpStatus, string> = {
  Terjadwal: "bg-teal-100 text-teal-700",
  Terlewat: "bg-red-light-5 text-red-dark",
  "Reminder Terkirim": "bg-sky-med-light text-sky-med",
  "Sudah Datang": "bg-green-light-5 text-green-dark",
};

export function FollowUpControl() {
  return (
    <div className="rounded-xl border border-stroke bg-white shadow-1 dark:bg-gray-dark">
      <div className="flex items-center justify-between border-b border-stroke px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-dark dark:text-white">Follow Up Kontrol</h2>
          <p className="text-xs text-dark-5">Pasien yang perlu dikontrol</p>
        </div>
        <a href="/jadwal/follow-up" className="text-xs font-semibold text-primary hover:underline">
          Lihat Semua
        </a>
      </div>

      <div className="divide-y divide-stroke">
        {FOLLOW_UPS.map((fu) => (
          <div key={fu.rm} className="px-5 py-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-dark">{fu.patientName}</p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      statusStyle[fu.status],
                    )}
                  >
                    {fu.status}
                  </span>
                </div>
                <p className="text-[11px] text-dark-5">{fu.rm} · {fu.doctor}</p>
                <p className="mt-0.5 text-[11px] text-dark-6 italic">{fu.reason}</p>
              </div>
              <div className="shrink-0 text-right">
                <p
                  className={cn(
                    "text-xs font-semibold",
                    fu.dueDate === "Terlewat" || fu.status === "Terlewat"
                      ? "text-red"
                      : fu.dueDate === "Hari ini"
                      ? "text-amber-600"
                      : "text-dark-4",
                  )}
                >
                  {fu.dueDate}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-stroke px-5 py-3">
        <button className="w-full rounded-lg bg-teal-100 py-2 text-xs font-semibold text-teal-700 hover:bg-primary hover:text-white transition-colors">
          + Buat Follow Up Baru
        </button>
      </div>
    </div>
  );
}
