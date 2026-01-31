import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as requested or standard modern font
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vehicle Booking Platform",
  description: "Rent Cars, Bikes, and Scooters easily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
