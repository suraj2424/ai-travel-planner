import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  Manrope,
  IBM_Plex_Mono,
  Fraunces,
} from "next/font/google";
import "./globals.css";

const briq = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-briq",
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["italic", "normal"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Atlas & Aire — AI Travel Planner",
  description:
    "Tell it a feeling, get back a flight plan. Atlas & Aire turns half-sentences into day-by-day itineraries with local secrets baked in.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${briq.variable} ${manrope.variable} ${plex.variable} ${fraunces.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
