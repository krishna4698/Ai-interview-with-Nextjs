import type { Metadata } from "next";
import {Mona_Sans } from "next/font/google";
import "./globals.css";

const Mono_Sans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "An I powered  interview prep website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        // className={`${Mona_Sans}  antialiased pattern`}
      >
        {children}
      </body>
    </html>
  );
}
