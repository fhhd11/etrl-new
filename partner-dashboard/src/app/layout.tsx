import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://partners.etrl.chat"),
  title: {
    default: "ETRL Partner Dashboard",
    template: "%s | ETRL Partner Dashboard",
  },
  description: "Партнерский кабинет ETRL с аналитикой по рефералам, оплатам, выручке и начислениям в реальном времени.",
  applicationName: "ETRL Partner Dashboard",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "ETRL Partner Dashboard",
    description: "Партнерский кабинет ETRL с аналитикой по рефералам, оплатам, выручке и начислениям в реальном времени.",
    siteName: "ETRL Partner Dashboard",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ETRL Partner Dashboard",
    description: "Партнерский кабинет ETRL с аналитикой по рефералам, оплатам, выручке и начислениям в реальном времени.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-slate-50 text-slate-950 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
