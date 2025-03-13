import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/store/provider";
import Footer from "@/components/Footer";

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
      <body className={`${inter.className}  relative`}>
        <Providers>
          <header>
            <Header />
          </header>
          <main>{children}</main>
          <footer>{/* <Footer /> */}</footer>
        </Providers>
      </body>
    </html>
  );
}
