"use client";

import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
import { cn } from "@/lib/utils";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const visitData = {
  weekly: {
    categories: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    series: [
      { name: "Baru", data: [8, 12, 9, 14, 11, 18, 6] },
      { name: "Kontrol", data: [5, 7, 8, 6, 9, 10, 3] },
    ],
  },
  monthly: {
    categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    series: [
      { name: "Baru", data: [120, 145, 132, 165, 150, 190, 178, 210, 195, 220, 205, 240] },
      { name: "Kontrol", data: [80, 95, 88, 110, 102, 125, 118, 140, 130, 148, 138, 160] },
    ],
  },
};

const revenueData = {
  weekly: {
    categories: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    series: [
      { name: "Konsultasi", data: [1.2, 1.8, 1.5, 2.1, 1.7, 2.8, 0.9] },
      { name: "Tindakan", data: [0.8, 1.1, 1.0, 1.3, 1.2, 1.6, 0.6] },
      { name: "Obat", data: [0.5, 0.7, 0.6, 0.9, 0.8, 1.1, 0.4] },
    ],
  },
  monthly: {
    categories: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
    series: [
      { name: "Konsultasi", data: [18, 22, 20, 26, 24, 30, 28, 34, 32, 36, 34, 40] },
      { name: "Tindakan", data: [12, 15, 14, 18, 16, 21, 20, 24, 22, 26, 24, 28] },
      { name: "Obat", data: [8, 10, 9, 12, 11, 14, 13, 16, 15, 17, 16, 19] },
    ],
  },
};

type Tab = "visit" | "revenue";
type Period = "weekly" | "monthly";

export function VisitRevenueChart() {
  const [tab, setTab] = useState<Tab>("visit");
  const [period, setPeriod] = useState<Period>("weekly");

  const chartData = tab === "visit" ? visitData[period] : revenueData[period];

  const visitOptions: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
      fontFamily: "Manrope, sans-serif",
      stacked: false,
    },
    colors: ["#0F766E", "#0284C7"],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "45%",
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: chartData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px", fontFamily: "Manrope, sans-serif", colors: "#64748B" } },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", fontFamily: "Manrope, sans-serif", colors: "#64748B" } },
    },
    grid: { strokeDashArray: 4, borderColor: "#E2E8F0" },
    legend: {
      position: "top",
      fontFamily: "Manrope, sans-serif",
      fontSize: "12px",
      markers: { size: 6 },
    },
    tooltip: { y: { formatter: (val) => `${val} pasien` } },
    fill: { opacity: 1 },
  };

  const revenueOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      fontFamily: "Manrope, sans-serif",
    },
    colors: ["#0F766E", "#0284C7", "#22C55E"],
    fill: {
      type: "gradient",
      gradient: { opacityFrom: 0.45, opacityTo: 0.05 },
    },
    stroke: { curve: "smooth", width: 2 },
    dataLabels: { enabled: false },
    xaxis: {
      categories: chartData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px", fontFamily: "Manrope, sans-serif", colors: "#64748B" } },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", fontFamily: "Manrope, sans-serif", colors: "#64748B" },
        formatter: (val) => `Rp ${val}Jt`,
      },
    },
    grid: { strokeDashArray: 4, borderColor: "#E2E8F0" },
    legend: {
      position: "top",
      fontFamily: "Manrope, sans-serif",
      fontSize: "12px",
      markers: { size: 6 },
    },
    tooltip: { y: { formatter: (val) => `Rp ${val} Juta` } },
  };

  const options = tab === "visit" ? visitOptions : revenueOptions;

  // Summary stats
  const visitSummary = { total: 34, baru: 22, kontrol: 12, target: 40 };
  const revenueSummary = {
    total: "Rp 4,8 Jt",
    konsultasi: "Rp 2,1 Jt",
    tindakan: "Rp 1,4 Jt",
    obat: "Rp 1,3 Jt",
  };

  return (
    <div className="rounded-xl border border-stroke bg-white shadow-1 dark:bg-gray-dark">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stroke px-5 py-4">
        <div className="flex items-center gap-1 rounded-lg bg-gray-2 p-1">
          <button
            onClick={() => setTab("visit")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
              tab === "visit"
                ? "bg-white text-primary shadow-card"
                : "text-dark-5 hover:text-dark",
            )}
          >
            Kunjungan Pasien
          </button>
          <button
            onClick={() => setTab("revenue")}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
              tab === "revenue"
                ? "bg-white text-primary shadow-card"
                : "text-dark-5 hover:text-dark",
            )}
          >
            Pendapatan
          </button>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-gray-2 p-1">
          {(["weekly", "monthly"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-semibold transition-colors",
                period === p
                  ? "bg-white text-primary shadow-card"
                  : "text-dark-5 hover:text-dark",
              )}
            >
              {p === "weekly" ? "Mingguan" : "Bulanan"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary row */}
      {tab === "visit" ? (
        <div className="grid grid-cols-4 divide-x divide-stroke border-b border-stroke">
          {[
            { label: "Total Hari Ini", value: visitSummary.total, color: "text-dark" },
            { label: "Pasien Baru", value: visitSummary.baru, color: "text-teal-700" },
            { label: "Kontrol", value: visitSummary.kontrol, color: "text-sky-med" },
            { label: "Target", value: visitSummary.target, color: "text-dark-5" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-3">
              <span className={cn("text-xl font-bold", s.color)}>{s.value}</span>
              <span className="text-[10px] text-dark-6">{s.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 divide-x divide-stroke border-b border-stroke">
          {[
            { label: "Total Hari Ini", value: revenueSummary.total, color: "text-dark" },
            { label: "Konsultasi", value: revenueSummary.konsultasi, color: "text-teal-700" },
            { label: "Tindakan", value: revenueSummary.tindakan, color: "text-sky-med" },
            { label: "Obat", value: revenueSummary.obat, color: "text-mint-med" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-3">
              <span className={cn("text-base font-bold", s.color)}>{s.value}</span>
              <span className="text-[10px] text-dark-6">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Chart */}
      <div className="px-3 pb-4 pt-2">
        <Chart
          key={`${tab}-${period}`}
          options={options}
          series={chartData.series}
          type={tab === "visit" ? "bar" : "area"}
          height={260}
        />
      </div>
    </div>
  );
}
