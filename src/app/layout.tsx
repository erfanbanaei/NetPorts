import "./globals.css";
import "@/styles/custom.css";

import { HydrationFix } from "@/components/HydrationFix";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

const IranSans = localFont({
  preload: true,
  display: "swap",
  src: [
    {
      path: "../../public/fonts/IranSans_Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranSans.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranSans_Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/IranSans_Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://netports.ir"),
  title: {
    default: "NetPorts | مرجع پورت‌های شبکه",
    template: "%s | NetPorts",
  },
  description: "جستجوی هوشمند و آفلاین پورت‌های شبکه",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NetPorts",
  },
  openGraph: {
    title: "NetPorts | مرجع پورت‌های شبکه",
    description: "جستجوی هوشمند و آفلاین پورت‌های شبکه",
    url: "https://netports.ir",
    siteName: "NetPorts",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NetPorts | مرجع پورت‌های شبکه",
    description: "جستجوی هوشمند و آفلاین پورت‌های شبکه",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${IranSans.className} antialiased`}>
        <HydrationFix />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}