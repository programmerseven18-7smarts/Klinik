export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 place-items-center rounded-xl bg-primary text-base font-extrabold text-white shadow-card">
        7C
      </div>

      <div className="leading-tight">
        <div className="text-xl font-extrabold tracking-normal text-dark dark:text-white">
          7Care
        </div>
        <div className="text-xs font-semibold text-primary">
          Klinik Command Center
        </div>
      </div>
    </div>
  );
}
