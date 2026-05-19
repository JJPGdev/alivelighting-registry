import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Registrul Exemplarelor — AliveLighting",
  description:
    "Fiecare obiect are o poveste. Descopera autenticitatea si originea exemplarului tau AliveLighting.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="bg-[#0a0a0a] text-[#f0ede8] antialiased">
        {children}
      </body>
    </html>
  );
}