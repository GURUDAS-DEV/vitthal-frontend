import type { Metadata } from "next";
import { Outfit, Montserrat } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components/Landing_Page";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vitthal | B2B Industrial Marketplace",
  description:
    "Source industrial products from verified vendors with transparent pricing, MOQ, and delivery timelines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body
        className={`${outfit.variable} ${montserrat.variable} min-h-full flex flex-col font-body`}
      >
        <Toaster position="top-right" richColors/>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
