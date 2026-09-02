"use client";

import { use } from "react";
import ItineraryView from "@/components/trips/ItineraryView";

export default function TripDetailPage({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) {
  const { tripId } = use(params);
  return <ItineraryView tripId={tripId} />;
}
