import { cn } from "@/lib/utils";

type InvoiceStatus = "Belum Lunas" | "Sebagian" | "Overdue";

type Invoice = {
  no: string;
  patient: string;
  rm: string;
  date: string;
  total: string;
  paid: string;
  status: InvoiceStatus;
};

const INVOICES: Invoice[] = [
  {
    no: "INV-2024-0341",
    patient: "Budi Santoso",
    rm: "RM-2024-0891",
    date: "Hari ini",
    total: "Rp 350.000",
    paid: "Rp 0",
    status: "Belum Lunas",
  },
  {
    no: "INV-2024-0340",
    patient: "Siti Rahma",
    rm: "RM-2024-0892",
    date: "Kemarin",
    total: "Rp 275.000",
    paid: "Rp 100.000",
    status: "Sebagian",
  },
  {
    no: "INV-2024-0335",
    patient: "Andi Wijaya",
    rm: "RM-2024-0893",
    date: "3 hari lalu",
    total: "Rp 520.000",
    paid: "Rp 0",
    status: "Overdue",
  },
  {
    no: "INV-2024-0328",
    patient: "Agus Pratama",
    rm: "RM-2024-0895",
    date: "7 hari lalu",
    total: "Rp 180.000",
    paid: "Rp 80.000",
    status: "Overdue",
  },
];

const statusStyle: Record<InvoiceStatus, string> = {
  "Belum Lunas": "bg-amber-50 text-amber-600",
  Sebagian: "bg-sky-med-light text-sky-med",
  Overdue: "bg-red-light-5 text-red-dark",
};

export function UnpaidInvoice() {
  const totalUnpaid = INVOICES.filter(
    (i) => i.status === "Belum Lunas" || i.status === "Overdue",
  ).length;

  return (
    <div className="rounded-xl border border-stroke bg-white shadow-1 dark:bg-gray-dark">
      <div className="flex items-center justify-between border-b border-stroke px-5 py-4">
        <div>
          <h2 className="text-base font-bold text-dark dark:text-white">Invoice Belum Lunas</h2>
          <p className="text-xs text-dark-5">
            <span className="font-semibold text-red">{totalUnpaid} overdue</span> · {INVOICES.length} total tertunggak
          </p>
        </div>
        <a href="/keuangan/invoice" className="text-xs font-semibold text-primary hover:underline">
          Lihat Semua
        </a>
      </div>

      <div className="divide-y divide-stroke">
        {INVOICES.map((inv) => (
          <div key={inv.no} className="px-5 py-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-dark">{inv.patient}</p>
                  <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold", statusStyle[inv.status])}>
                    {inv.status}
                  </span>
                </div>
                <p className="text-[11px] text-dark-5">{inv.no} · {inv.rm}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-dark">{inv.total}</p>
                <p className="text-[10px] text-dark-6">{inv.date}</p>
              </div>
            </div>
            {inv.status === "Sebagian" && (
              <p className="mt-0.5 text-[10px] text-dark-5">
                Sudah bayar: <span className="font-medium text-sky-med">{inv.paid}</span>
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-stroke px-5 py-3">
        <button className="w-full rounded-lg bg-teal-100 py-2 text-xs font-semibold text-teal-700 hover:bg-primary hover:text-white transition-colors">
          + Proses Pembayaran
        </button>
      </div>
    </div>
  );
}
