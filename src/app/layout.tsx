import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const serifFont = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Good General Publications & Stationery | Custom Books & Stationery for Schools in Greater Accra",
  description:
    "Helping private school heads and bursars in Greater Accra coordinate custom exercise books, bulk stationery supply, and campus bookshops with dependable quality and reliable delivery.",
  openGraph: {
    title: "Good General Publications & Stationery | Custom Books & Stationery for Schools",
    description:
      "Helping private school heads and bursars in Greater Accra coordinate custom exercise books, bulk stationery supply, and campus bookshops.",
    locale: "en_GH",
    type: "website",
    images: [
      {
        url: "/brand/brand-cover-square.jpg",
        width: 1080,
        height: 1080,
        alt: "Good General Publications & Stationery",
      },
    ],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="min-h-screen flex flex-col bg-white text-stone-900 font-sans antialiased selection:bg-amber-100 selection:text-stone-900">
        <MantineProvider defaultColorScheme="light">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#0A1C33] focus:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 rounded text-sm font-medium"
          >
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
