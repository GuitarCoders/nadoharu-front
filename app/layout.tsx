import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JotaiProviders from "@/components/providers/jotai-providers";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <JotaiProviders>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <GlobalAlertDialog />
          <GlobalToast />
        </body>
      </JotaiProviders>
    </html>
  );
}
