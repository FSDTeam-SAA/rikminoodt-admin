import type { Metadata } from "next";
import "./globals.css";
import { MainProviders } from "@/Providers/MainProviders";

export const metadata: Metadata = {
  title: "Boekerello — Admin Dashboard",
  description: "Platform management dashboard for Boekerello printing and book generation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,600;0,6..12,700;0,6..12,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#E88DA0]/20 selection:text-[#E88DA0]">
        <MainProviders>{children}</MainProviders>
      </body>
    </html>
  );
}
