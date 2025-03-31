"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/store/provider";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { refreshUser } from "@/store/auth/operations";
import { useAppDispatch } from "@/store/stores/hooks";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../components/layout/Header"), {
  ssr: false,
});

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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Your trusted online pharmacy for fast medicine delivery."
        />
        <meta
          name="keywords"
          content="pharmacy, online medicine, buy medicine, healthcare, E-Pharmacy"
        />
        <meta name="author" content="E-Pharmacy Team" />

        <meta
          property="og:title"
          content="E-Pharmacy - Online Medicine Store"
        />
        <meta
          property="og:description"
          content="Your trusted online pharmacy for fast medicine delivery."
        />
        <meta property="og:type" content="website" />
        <link
          rel="preload"
          as="style"
          href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/3.0.1/modern-normalize.css"
          integrity="sha512-gnAN+RgTMylunXI7AMg+PtcUGpKZFkZJoFIkAWvdPFRrFJz3p2tx4+9xbjILRfN7CzoViMgS8vSf06fSQzWZjA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onLoad={(e) => {
            const link = e.currentTarget as HTMLLinkElement;
            link.onload = null;
            link.rel = "stylesheet";
          }}
        />
      </head>
      <body className={`${inter.className} relative`}>
        <Providers>
          <ReduxInitializer />
          <Toaster position="bottom-right" />
          <header>
            <Header />
          </header>
          <main className="flex-grow">{children}</main>
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
