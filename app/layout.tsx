import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Suspense } from "react";
import {
  LoadingProvider,
  NavigationLoader,
} from "@/provider/toploader-provider";

export const metadata: Metadata = {
  title: "BidFit",
  description: "BidFit is a bidding platform for your lifestyle needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistMono.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <LoadingProvider>
            <NavigationLoader />
            {children}
          </LoadingProvider>
        </Suspense>
      </body>
    </html>
  );
}
