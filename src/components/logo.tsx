export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Medical cross icon in teal */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-sm">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
        >
          <rect x="6.5" y="1" width="5" height="16" rx="2" fill="white" />
          <rect x="1" y="6.5" width="16" height="5" rx="2" fill="white" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-tight text-dark dark:text-white">
          MedCare<span className="text-primary">7</span>
        </span>
        <span className="text-[9px] font-medium uppercase tracking-widest text-dark-5 dark:text-dark-6">
          Klinik Digital
        </span>
      </div>
    </div>
  );
}
