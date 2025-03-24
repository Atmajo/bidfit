import type { Metadata } from "next";
import { Varela } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Toaster } from "@/components/ui/sonner";

const varela = Varela({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "BidFit",
  description: "Bid to buy and sell products in a fun and interactive way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col justify-between min-h-screen ${varela.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
