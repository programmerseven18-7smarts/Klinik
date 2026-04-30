import { CriticalStock } from "./_components/critical-stock";
import { DoctorScheduleToday } from "./_components/doctor-schedule-today";
import { FollowUpControl } from "./_components/follow-up-control";
import { OperationalSummary } from "./_components/operational-summary";
import { PatientJourneyBoard } from "./_components/patient-journey-board";
import { UnpaidInvoice } from "./_components/unpaid-invoice";
import { VisitRevenueChart } from "./_components/visit-revenue-chart";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Row 1: Operational summary stats */}
      <OperationalSummary />

      {/* Row 2: Patient Journey Board (full width) */}
      <PatientJourneyBoard />

      {/* Row 3: Left (jadwal dokter + charts) | Right (follow up, stok, invoice) */}
      <div className="grid grid-cols-12 gap-5">
        {/* Left column: jadwal dokter + charts */}
        <div className="col-span-12 flex flex-col gap-5 xl:col-span-8">
          <DoctorScheduleToday />
          <VisitRevenueChart />
        </div>

        {/* Right column: follow up, stok kritis, invoice */}
        <div className="col-span-12 flex flex-col gap-5 xl:col-span-4">
          <FollowUpControl />
          <CriticalStock />
          <UnpaidInvoice />
        </div>
      </div>
    </div>
  );
}
