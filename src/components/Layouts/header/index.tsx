"use client";

import { SearchIcon } from "@/assets/icons";
import Link from "next/link";
import { useState } from "react";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { MenuIcon } from "./icons";
import { Notification } from "./notification";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";

export function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-stroke bg-white px-3 py-3 shadow-1 dark:border-stroke-dark dark:bg-gray-dark md:px-5 md:py-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="grid size-10 shrink-0 place-items-center rounded-lg border dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">Toggle Sidebar</span>
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-1 hidden min-[430px]:block">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-sm font-extrabold text-white">
            7C
          </span>
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          7Care Command Center
        </h1>
        <p className="font-medium">
          Jadwal pasien, follow up kontrol, rekam medis, obat, dan finansial
        </p>
      </div>

      <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 min-[430px]:gap-3">
        <div className="relative hidden w-full max-w-[300px] min-[720px]:block">
          <input
            type="search"
            placeholder="Cari pasien, no. RM, dokter..."
            className="flex w-full items-center gap-3.5 rounded-full border bg-gray-2 py-3 pl-[53px] pr-5 outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div>

        <button
          type="button"
          onClick={() => setIsSearchOpen((open) => !open)}
          className="grid size-10 shrink-0 place-items-center rounded-full border bg-gray-2 text-dark outline-none transition hover:text-primary focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white min-[720px]:hidden"
          aria-expanded={isSearchOpen}
          aria-controls="mobile-header-search"
        >
          <span className="sr-only">Cari</span>
          <SearchIcon className="size-5" />
        </button>

        <div className="shrink-0 max-[360px]:hidden">
          <ThemeToggleSwitch />
        </div>

        <Notification />

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>

      {isSearchOpen && (
        <div
          id="mobile-header-search"
          className="absolute left-3 right-3 top-full z-40 mt-2 rounded-xl border border-stroke bg-white p-3 shadow-2 dark:border-stroke-dark dark:bg-gray-dark min-[720px]:hidden"
        >
          <div className="relative">
            <input
              autoFocus
              type="search"
              placeholder="Cari pasien, no. RM, dokter..."
              className="h-12 w-full rounded-full border bg-gray-2 pl-12 pr-20 text-sm font-medium outline-none transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus-visible:border-primary"
            />
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2" />
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-3 py-1.5 text-sm font-semibold text-dark-6 hover:bg-gray-2 dark:hover:bg-dark-2"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
