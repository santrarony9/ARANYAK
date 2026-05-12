import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aranyak Jewellers | Premium Gold & Diamond Jewellery in Tripura",
  description: "Discover exquisite gold, diamond, and silver jewellery at Aranyak Jewellers. Multiple stores across Tripura offering the finest craftsmanship and authentic astrological stones.",
  keywords: ["Aranyak Jewellers", "Jewellery in Tripura", "Gold Jewellery", "Diamond Rings", "Silver Ornaments", "Astrological Stones", "Bengali Jewellery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
