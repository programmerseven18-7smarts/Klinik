import { cn } from "@/lib/utils";

type StockStatus = "Menipis" | "Habis" | "Mendekati Expired" | "Expired";

type StockItem = {
  name: string;
  code: string;
  stock: number;
  unit: string;
  minStock: number;
  expiredDate?: string;
  status: StockStatus;
};

const CRITICAL_STOCK: StockItem[] = [
  {
    name: "Amoxicillin 500mg",
    code: "OBT-0023",
    stock: 12,
    unit: "Strip",
    minStock: 50,
    status: "Menipis",
  },
  {
    name: "Cetirizine 10mg",
    code: "OBT-0041",
    stock: 0,
    unit: "Strip",
    minStock: 30,
    status: "Habis",
  },
  {
    name: "Betadine 30ml",
    code: "OBT-0087",
    stock: 8,
    unit: "Botol",
    minStock: 20,
    expiredDate: "15 Jan 2025",
    status: "Mendekati Expired",
  },
  {
    name: "Omeprazole 20mg",
    code: "OBT-0055",
    stock: 5,
    unit: "Strip",
    minStock: 40,
    status: "Menipis",
  },
];

const statusStyle: Record<StockStatus, { badge: string; bar: string }> = {
  Menipis: { badge: "bg-amber-50 text-amber-600", bar: "bg-amber-500" },
  Habis: { badge: "bg-red-light-5 text-red-dark", bar: "bg-red" },
  "Mendekati Expired": { badge: "bg-orange-light/20 text-orange-light", bar: "bg-orange-light" },
  Expired: { badge: "bg-red-light-5 text-red-dark", bar: "bg-red-dark" },
};

function StockBar({ stock, min }: { stock: number; min: number }) {
  const pct = min === 0 ? 0 : Math.min(100, Math.round((stock / min) * 100));
  const color =
    pct === 0 ? "bg-red" : pct < 30 ? "bg-amber-500" : "bg-mint-med";
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-2">
      <div
        className={cn("h-full rounded-full transition-all", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function CriticalStock() {
  return (
    <div className="rounded-xl border border-stroke bg-white shadow-1 dark:bg-gray-dark">
      <div className="flex items-center justify-between border-b border-stroke px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-dark dark:text-white">Stok Obat Kritis</h2>
          <p className="text-xs text-dark-5">Perlu segera di-reorder</p>
        </div>
        <a href="/farmasi/hampir-habis" className="text-xs font-semibold text-primary hover:underline">
          Lihat Semua
        </a>
      </div>

      <div className="divide-y divide-stroke">
        {CRITICAL_STOCK.map((item) => {
          const s = statusStyle[item.status];
          return (
            <div key={item.code} className="px-5 py-3.5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-dark">{item.name}</p>
                    <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold", s.badge)}>
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-dark-6">{item.code}</p>
                  <div className="mt-2">
                    <StockBar stock={item.stock} min={item.minStock} />
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-dark">{item.stock}</p>
                  <p className="text-[10px] text-dark-6">{item.unit}</p>
                </div>
              </div>
              {item.expiredDate && (
                <p className="mt-1 text-[10px] text-amber-600">
                  Expired: {item.expiredDate}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-stroke px-5 py-3">
        <button className="w-full rounded-lg bg-teal-100 py-2 text-xs font-semibold text-teal-700 hover:bg-primary hover:text-white transition-colors">
          + Catat Stok Masuk
        </button>
      </div>
    </div>
  );
}
