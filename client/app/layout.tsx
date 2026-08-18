import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  Geist
} from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400"]
})


export const metadata: Metadata = {
  title: "AI Travel Planner",
  description:
    "Tell it a feeling, get back a flight plan. This app turns half-sentences into day-by-day itineraries with local secrets baked in.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
