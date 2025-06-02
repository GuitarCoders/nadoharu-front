import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JotaiProvider from "@/components/providers/jotai-provider";
import GlobalAlertDialog from "@/components/layouts/alert-dialog";
import GlobalToast from "@/components/layouts/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 나도하루",
    default: "나도하루",
  },
  description: "나도하루 소셜 미디어",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "나도하루",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "나도하루",
    "application-name": "나도하루",
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <JotaiProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <GlobalAlertDialog />
          <GlobalToast />
        </body>
      </JotaiProvider>
    </html>
  );
}
