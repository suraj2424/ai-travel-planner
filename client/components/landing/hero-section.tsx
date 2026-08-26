"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import IndiaMap from "@/components/ui/india-map";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease,
    },
  },
};

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative pt-20 pb-24 overflow-hidden">
      {/* ambient layers */}
      <div
        className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-noise opacity-[0.04] pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_0.85fr] gap-16 items-center">
        {/* Left: copy */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
        >
          <motion.p
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)]/80 backdrop-blur text-xs font-medium text-[var(--color-text-secondary)] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-500)] animate-pulse" />
            Early access · Built for Indian travellers
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-[-0.04em] leading-[1.05] text-[var(--color-text-primary)] mb-6"
          >
            From group chat to{" "}
            <span className="relative inline-block font-serif italic font-normal">
              boarding pass.
              <svg
                className="absolute left-0 -bottom-1.5 w-full"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden
              >
                <motion.path
                  d="M3 9 C 55 3, 110 13, 165 7 S 270 5, 297 8"
                  stroke="var(--color-accent-500)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={shouldReduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: shouldReduceMotion ? 0 : 0.8,
                    duration: shouldReduceMotion ? 0 : 0.8,
                    ease,
                  }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl leading-relaxed text-[var(--color-text-secondary)] max-w-lg mb-10"
          >
            AI trip plans made for the way Indians travel — visa-free picks
            for Indian passports, budgets in ₹, veg-friendly stops, and
            itineraries your whole group will actually agree on.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              href="/auth/signup"
              variant="primary"
              className="w-full sm:w-auto !text-base !px-7"
            >
              Start planning — free <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              href="#how-it-works"
              variant="outline"
              className="w-full sm:w-auto !text-base !px-7"
            >
              See how it works
            </Button>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-8 text-sm text-[var(--color-text-tertiary)]"
          >
            Free during beta · No credit card required
          </motion.p>
        </motion.div>

        {/* Right: map */}
        <motion.div
          className="hidden lg:block relative"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  scale: 0.98,
                  y: 16,
                }
          }
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            delay: shouldReduceMotion ? 0 : 0.45,
            duration: shouldReduceMotion ? 0 : 0.8,
            ease,
          }}
        >
          <div
            className="absolute -inset-8 bg-[var(--color-brand-500)]/10 blur-3xl rounded-full pointer-events-none"
            aria-hidden
          />
          <IndiaMap className="relative h-[620px] xl:h-[680px] w-full" />
        </motion.div>
      </div>
    </section>
  );
}