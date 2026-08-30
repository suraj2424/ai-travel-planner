import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Trips · AI Travel Planner",
  description: "Plan, track, and manage all your adventures.",
};

export default function TripsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[var(--color-surface)]">{children}</div>;
}
