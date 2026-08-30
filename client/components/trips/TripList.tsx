"use client";

import { useGetTripsQuery, useDeleteTripMutation, Trip } from "@/services/api";
import TripCard from "./TripCard";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";

interface TripListProps {
  searchQuery?: string;
  styleFilter?: string;
  onNavigateToCreate?: () => void;
}

export default function TripList({
  searchQuery = "",
  styleFilter = "",
  onNavigateToCreate,
}: TripListProps) {
  const { data, isLoading, error } = useGetTripsQuery({ page: 1, limit: 50 });
  const [deleteTrip, { isLoading: isDeleting }] = useDeleteTripMutation();

  if (isLoading) return <LoadingState count={6} />;

  if (error) {
    return (
      <EmptyState
        title="Unable to load trips"
        description="Something went wrong while fetching your trips. Please try again."
        actionLabel="Retry"
        onAction={() => window.location.reload()}
      />
    );
  }

  const allTrips: Trip[] = data?.data || [];

  // Apply search & filter
  const filteredTrips = allTrips.filter((trip) => {
    const matchesSearch = searchQuery
      ? trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesStyle = styleFilter
      ? trip.travelStyle?.toUpperCase() === styleFilter.toUpperCase()
      : true;
    return matchesSearch && matchesStyle;
  });

  if (allTrips.length === 0) {
    return (
      <EmptyState
        title="No trips yet"
        description="Start planning your next adventure by creating your first trip."
        actionLabel="Create Trip"
        onAction={onNavigateToCreate}
      />
    );
  }

  if (filteredTrips.length === 0) {
    return (
      <EmptyState
        title="No matching trips found"
        description="Try adjusting your search query or travel style filter."
        actionLabel="Clear Filters"
        onAction={() => {}}
      />
    );
  }

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="list"
      aria-label="Your trips"
    >
      {filteredTrips.map((trip) => (
        <TripCard
          key={trip.id}
          trip={trip}
          onDelete={deleteTrip}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}