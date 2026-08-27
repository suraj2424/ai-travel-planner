import SiteHeader from "@/components/landing/site-header";
import HeroSection from "@/components/landing/hero-section";
import PlanDemo from "@/components/landing/plan-demo";
import ProofBand from "@/components/landing/proof-band";
import CtaSection from "@/components/landing/cta-section";
import SiteFooter from "@/components/landing/site-footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <PlanDemo />
        <ProofBand />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
