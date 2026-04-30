"use client";

import { cn } from "@/lib/utils";
import type { JSX, SVGProps } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  sub?: string;
  color: "teal" | "sky" | "green" | "amber" | "red" | "slate";
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  trend?: { value: number; up: boolean };
};

function PatientIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 12a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 21c0-3.314-3.582-6-8-6s-8 2.686-8 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function QueueIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 6h16M4 10h16M4 14h10M4 18h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function DoctorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 14c-4 0-7 2-7 4.5V21h14v-2.5c0-2.5-3-4.5-7-4.5z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 10c.5 1.5 2 2.5 2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 12v4m-2-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RevenueIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 10h20M8 15h2M12 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const colorMap: Record<
  StatCardProps["color"],
  { bg: string; iconBg: string; iconText: string; valueText: string }
> = {
  teal: {
    bg: "bg-white border-l-4 border-l-primary",
    iconBg: "bg-teal-100",
    iconText: "text-teal-700",
    valueText: "text-teal-700",
  },
  sky: {
    bg: "bg-white border-l-4 border-l-sky-med",
    iconBg: "bg-sky-med-light",
    iconText: "text-sky-med",
    valueText: "text-sky-med",
  },
  green: {
    bg: "bg-white border-l-4 border-l-mint-med",
    iconBg: "bg-green-light-5",
    iconText: "text-green-dark",
    valueText: "text-green-dark",
  },
  amber: {
    bg: "bg-white border-l-4 border-l-amber-500",
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    valueText: "text-amber-600",
  },
  red: {
    bg: "bg-white border-l-4 border-l-red",
    iconBg: "bg-red-light-5",
    iconText: "text-red-dark",
    valueText: "text-red-dark",
  },
  slate: {
    bg: "bg-white border-l-4 border-l-dark-5",
    iconBg: "bg-gray-2",
    iconText: "text-dark-4",
    valueText: "text-dark-3",
  },
};

function StatCard({ label, value, sub, color, icon: Icon, trend }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={cn("rounded-xl p-5 shadow-1", c.bg)}>
      <div className="flex items-start justify-between">
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", c.iconBg)}>
          <Icon className={cn("h-5 w-5", c.iconText)} />
        </div>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold",
              trend.up
                ? "bg-green-light-5 text-green-dark"
                : "bg-red-light-5 text-red-dark",
            )}
          >
            {trend.up ? "▲" : "▼"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className={cn("text-2xl font-bold tracking-tight", c.valueText)}>{value}</p>
        <p className="mt-0.5 text-sm font-medium text-dark-5">{label}</p>
        {sub && <p className="mt-0.5 text-xs text-dark-6">{sub}</p>}
      </div>
    </div>
  );
}

export function OperationalSummary() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* Date bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-dark dark:text-white">
            Clinical Command Center
          </h1>
          <p className="text-sm text-dark-5">{dateStr}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-stroke bg-white px-3 py-2 text-sm font-medium text-dark-4 shadow-1 dark:bg-gray-dark">
          <span className="h-2 w-2 rounded-full bg-mint-med" />
          Klinik Aktif — 07:00–21:00
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Pasien Hari Ini"
          value="34"
          sub="Total booking"
          color="teal"
          icon={PatientIcon}
          trend={{ value: 12, up: true }}
        />
        <StatCard
          label="Antrean Aktif"
          value="8"
          sub="Sedang menunggu"
          color="sky"
          icon={QueueIcon}
        />
        <StatCard
          label="Dokter Aktif"
          value="5"
          sub="Dari 6 terjadwal"
          color="green"
          icon={DoctorIcon}
        />
        <StatCard
          label="Kunjungan Selesai"
          value="19"
          sub="s.d. sekarang"
          color="slate"
          icon={CheckIcon}
        />
        <StatCard
          label="Pendapatan Hari Ini"
          value="Rp 4,8 Jt"
          sub="Inkl. obat & tindakan"
          color="teal"
          icon={RevenueIcon}
          trend={{ value: 8, up: true }}
        />
        <StatCard
          label="Stok Kritis"
          value="3"
          sub="Perlu reorder"
          color="amber"
          icon={AlertIcon}
        />
      </div>
    </div>
  );
}
