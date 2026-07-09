import type { Metadata } from "next";
import localFont from "next/font/local";
import { Great_Vibes, Nunito_Sans } from "next/font/google";
import "./globals.css";

const amsterdam = localFont({
  src: "../fonts/Amsterdam Handwriting.ttf",
  variable: "--font-amsterdam",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Living Room Café",
  description: "Reserve your space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${amsterdam.variable} ${greatVibes.variable} ${nunito.variable} min-h-full flex flex-col antialiased`}
      >
        {children}
      </body>
    </html>
  );
}