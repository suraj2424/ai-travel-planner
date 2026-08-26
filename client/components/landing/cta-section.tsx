import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-28 px-6">
      <div className="relative max-w-4xl mx-auto rounded-[2rem] bg-[var(--color-cta)] px-8 py-16 md:py-20 text-center shadow-2xl shadow-black/20 overflow-hidden">
        <div
          className="absolute inset-0 bg-noise opacity-[0.06] pointer-events-none"
          aria-hidden
        />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-white mb-5">
            <span className="font-serif italic font-normal">Chalo,</span>{" "}
            plan karte hain.
          </h2>
          <p className="text-white/75 text-lg leading-relaxed max-w-md mx-auto mb-9">
            Join early access — your first AI-planned trip is free while
            we&apos;re in beta.
          </p>
          <Button
            href="/auth/signup"
            className="!bg-white !text-[#0e7490] hover:!bg-[var(--color-brand-50)] !shadow-none !text-base !px-8 !rounded-full"
          >
            Get early access <ArrowRight className="w-4 h-4" />
          </Button>
          <p className="mt-5 text-white/55 text-sm">No credit card required</p>
        </div>
      </div>
    </section>
  );
}