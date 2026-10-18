import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TurfTime — Premium Sports Venue Booking | Mumbai",
  description:
    "Discover and book FIFA-certified football turfs, box cricket arenas, badminton courts, and sports facilities in Mumbai. Your game. Your ground. Your time.",
  keywords: [
    "Turf booking Mumbai",
    "Football turf Andheri",
    "Box cricket BKC",
    "Badminton courts Powai",
    "Sports venue booking",
    "TurfTime",
    "Mumbai sports arenas",
  ],
  authors: [{ name: "TurfTime Sports Technologies" }],
  openGraph: {
    title: "TurfTime — Premium Sports Venue Booking",
    description: "Discover and request bookings for premium football turfs, cricket arenas, and sports courts in Mumbai.",
    siteName: "TurfTime",
    locale: "en_IN",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#060c08",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} scroll-smooth dark`}>
      <body className="min-h-screen bg-[#060c08] text-[#f4f6f5] font-sans antialiased selection:bg-[#22c55e]/20 selection:text-[#a3e635]">
        {children}
      </body>
    </html>
  );
}
