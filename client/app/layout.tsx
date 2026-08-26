import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import ReduxProvider from "@/lib/redux/provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "AI Travel Planner — Plan trips made for Indian travellers",
  description:
    "AI itineraries for Indian travellers: visa-free picks, ₹ budgets, veg-friendly food, and plans your whole group agrees on.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="antialiased">
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                const d = t === 'dark' || (!t && matchMedia('(prefers-color-scheme:dark)').matches);
                if (d) document.documentElement.classList.add('dark');
              } catch(e) {}
            `,
          }}
        />
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
