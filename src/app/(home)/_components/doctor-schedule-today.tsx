import { cn } from "@/lib/utils";

type DoctorStatus = "Aktif" | "Istirahat" | "Belum Hadir";

type Doctor = {
  name: string;
  specialty: string;
  poli: string;
  schedule: string;
  patients: number;
  remaining: number;
  status: DoctorStatus;
  initial: string;
  color: string;
};

const DOCTORS: Doctor[] = [
  {
    name: "dr. Amelia Putri",
    specialty: "Dokter Umum",
    poli: "Poli Umum",
    schedule: "07:00 – 14:00",
    patients: 12,
    remaining: 6,
    status: "Aktif",
    initial: "AP",
    color: "bg-teal-100 text-teal-700",
  },
  {
    name: "dr. Raka Pratama",
    specialty: "Dokter Anak",
    poli: "Poli Anak",
    schedule: "08:00 – 15:00",
    patients: 9,
    remaining: 4,
    status: "Aktif",
    initial: "RP",
    color: "bg-sky-med-light text-sky-med",
  },
  {
    name: "dr. Sinta Maharani",
    specialty: "Dokter Gigi",
    poli: "Poli Gigi",
    schedule: "09:00 – 16:00",
    patients: 7,
    remaining: 5,
    status: "Istirahat",
    initial: "SM",
    color: "bg-amber-50 text-amber-600",
  },
  {
    name: "dr. Hendra Wijaya",
    specialty: "Penyakit Dalam",
    poli: "Poli Peny. Dalam",
    schedule: "10:00 – 17:00",
    patients: 5,
    remaining: 5,
    status: "Belum Hadir",
    initial: "HW",
    color: "bg-gray-2 text-dark-5",
  },
  {
    name: "dr. Dewi Kusuma",
    specialty: "Dokter Umum",
    poli: "Poli Umum",
    schedule: "13:00 – 20:00",
    patients: 0,
    remaining: 0,
    status: "Belum Hadir",
    initial: "DK",
    color: "bg-gray-2 text-dark-5",
  },
];

const statusStyle: Record<DoctorStatus, string> = {
  Aktif: "bg-green-light-5 text-green-dark",
  Istirahat: "bg-amber-50 text-amber-600",
  "Belum Hadir": "bg-gray-2 text-dark-5",
};

const statusDot: Record<DoctorStatus, string> = {
  Aktif: "bg-mint-med",
  Istirahat: "bg-amber-500",
  "Belum Hadir": "bg-dark-6",
};

export function DoctorScheduleToday() {
  return (
    <div className="rounded-xl border border-stroke bg-white shadow-1 dark:bg-gray-dark">
      <div className="flex items-center justify-between border-b border-stroke px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-dark dark:text-white">Jadwal Dokter Hari Ini</h2>
          <p className="text-xs text-dark-5">5 dokter terjadwal</p>
        </div>
        <a
          href="/jadwal/dokter"
          className="text-xs font-semibold text-primary hover:underline"
        >
          Lihat Semua
        </a>
      </div>

      <div className="divide-y divide-stroke">
        {DOCTORS.map((doc) => (
          <div key={doc.name} className="flex items-center gap-3 px-5 py-3.5">
            {/* Avatar */}
            <div
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                doc.color,
              )}
            >
              {doc.initial}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-dark">{doc.name}</p>
                <span
                  className={cn(
                    "flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    statusStyle[doc.status],
                  )}
                >
                  <span className={cn("h-1.5 w-1.5 rounded-full", statusDot[doc.status])} />
                  {doc.status}
                </span>
              </div>
              <p className="text-[11px] text-dark-5">
                {doc.poli} · {doc.schedule}
              </p>
            </div>

            {/* Stats */}
            <div className="shrink-0 text-right">
              <p className="text-sm font-bold text-dark">{doc.patients}</p>
              <p className="text-[10px] text-dark-6">pasien</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
