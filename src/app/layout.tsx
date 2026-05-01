import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { AppChrome } from "./app-chrome";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s | 7Care",
    default: "7Care - Klinik Management Dashboard",
  },
  description:
    "Dashboard operasional klinik untuk jadwal pasien, riwayat medis, inventory obat, dan keuangan.",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#0F766E" showSpinner={false} />
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
