"use client";

import { useRouter } from "next/navigation";
import CreateTripForm from "@/components/trips/CreateTripForm";
import { Trip } from "@/services/api";

export default function NewTripPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--color-border)] pb-4 sm:pb-5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Plan a New Trip
        </h1>
        <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] mt-0.5">
          Enter your destination, dates, budget, and travel preferences.
        </p>
      </div>

      <section aria-live="polite">
        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
          <CreateTripForm
            onSuccess={(trip?: Trip) => {
              if (trip?.id) {
                router.push(`/trips/${trip.id}`);
              } else {
                router.push("/trips");
              }
            }}
          />
        </div>
      </section>
    </div>
  );
}
