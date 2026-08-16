import { Ticker, Nav, Footer } from "@/components/Chrome";
import Hero from "@/components/Hero";
import Planner from "@/components/Planner";
import { HowItWorks, Testimonials, Pricing } from "@/components/Sections";
import Postcards from "@/components/Postcards";
import Board from "@/components/Board";
import FAQ from "@/components/FAQ";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main className="bg-ink text-bone">
      <Ticker />
      <Nav />
      <Hero />
      <Planner />
      <HowItWorks />
      <Postcards />
      <Board />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  );
}
