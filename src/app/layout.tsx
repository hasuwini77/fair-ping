import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const barlow = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Fair Ping: free WoW Forever duel cups on EU realms",
  description:
    "Free 1v1 duel cups for WoW Forever on EU realms, every second Sunday at 19:00 CET. Same realm, same ping for everyone.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable} h-full`}>
      <body className="min-h-full bg-ink font-sans text-base text-paper">{children}</body>
    </html>
  );
}
