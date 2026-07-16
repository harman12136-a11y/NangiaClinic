import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CLINIC } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: CLINIC.name,
    template: `%s | ${CLINIC.shortName}`,
  },
  description:
    "Trusted dental care in Paonta Sahib since 1980. Cosmetic dentistry, root canal, implants, whitening & pediatric care by Dr. Rajat Nangia (BDS, MDS).",
  keywords: [
    "dental clinic Paonta Sahib",
    "Dr Nangia dentist",
    "cosmetic dentistry",
    "root canal",
    "dental implants",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
