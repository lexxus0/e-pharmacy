"use client";

import Header from "@/components/layout/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/store/provider";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { refreshUser } from "@/store/auth/operations";
import { useAppDispatch } from "@/store/stores/hooks";
import type { Metadata } from "next";

const metadata: Metadata = {
  title: {
    default: "E-Pharmacy - Online Medicine Store",
    template: "%s | E-Pharmacy",
  },
  description: "Your trusted online pharmacy for fast medicine delivery.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>E-Pharmacy</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/3.0.1/modern-normalize.css"
          integrity="sha512-gnAN+RgTMylunXI7AMg+PtcUGpKZFkZJoFIkAWvdPFRrFJz3p2tx4+9xbjILRfN7CzoViMgS8vSf06fSQzWZjA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${inter.className} relative`}>
        <Providers>
          <ReduxInitializer />
          <header>
            <Header />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </Providers>
      </body>
    </html>
  );
}

function ReduxInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return null;
}
