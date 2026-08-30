"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Search,
  Mountain,
  Sun,
  Landmark,
  Gem,
  Wallet,
} from "lucide-react";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { logout as logoutAction } from "@/lib/redux/features/auth/authSlice";
import { useGetTripsQuery, Trip } from "@/services/api";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CreateTripForm from "@/components/trips/CreateTripForm";
import TripList from "@/components/trips/TripList";
import Sidebar from "@/components/ui/sidebar";
import MobileHeader from "@/components/ui/mobile-header";
import Select from "@/components/ui/select";

type ViewMode = "trips" | "create";

const FILTER_STYLES = [
  { value: "ADVENTURE", label: "Adventure", icon: <Mountain className="w-4 h-4" /> },
  { value: "RELAXED", label: "Relaxed", icon: <Sun className="w-4 h-4" /> },
  { value: "CULTURAL", label: "Cultural", icon: <Landmark className="w-4 h-4" /> },
  { value: "LUXURY", label: "Luxury", icon: <Gem className="w-4 h-4" /> },
  { value: "BUDGET", label: "Budget", icon: <Wallet className="w-4 h-4" /> },
];

export default function TripPageContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [view, setView] = useState<ViewMode>("trips");
  const [searchQuery, setSearchQuery] = useState("");
  const [styleFilter, setStyleFilter] = useState("");

  const { data } = useGetTripsQuery({ page: 1, limit: 50 });
  const trips: Trip[] = data?.data || [];
  const totalTrips = trips.length;

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--color-surface)] text-[var(--color-text-primary)]">
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          activeView={view}
          onSelectView={setView}
          totalTrips={totalTrips}
          user={user}
          onLogout={handleLogout}
        />

        {/* Mobile Header Bar */}
        <MobileHeader
          activeView={view}
          onSelectView={setView}
          totalTrips={totalTrips}
          user={user}
          onLogout={handleLogout}
        />

        {/* Main Content Panel */}
        <main
          className={`flex-1 min-w-0 max-w-7xl mx-auto w-full ${
            view === "create"
              ? "p-4 sm:p-5 lg:px-7 lg:py-4 space-y-3"
              : "p-4 sm:p-6 lg:p-8 space-y-6"
          }`}
        >
          {/* Header & Controls Toolbar */}
          <div
            className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--color-border)] ${
              view === "create" ? "pb-3" : "pb-4 sm:pb-5"
            }`}
          >
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)] flex items-center gap-2.5">
                {view === "trips" ? "My Trips" : "Plan a New Trip"}
                {view === "trips" && totalTrips > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-900)]/40 text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)] border border-[var(--color-border)]">
                    {totalTrips}
                  </span>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-[var(--color-text-tertiary)] mt-0.5">
                {view === "trips"
                  ? "Plan, track, and manage your travel itineraries."
                  : "Enter your destination, dates, budget, and travel preferences."}
              </p>
            </div>

            {/* Filter & Search Bar (visible when viewing trips) */}
            {view === "trips" && totalTrips > 0 && (
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-56">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations..."
                    className="w-full h-10 pl-9 pr-4 text-sm rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/20 focus:border-[var(--color-brand-500)] transition-colors"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--color-text-tertiary)] pointer-events-none" />
                </div>

                <div className="w-40">
                  <Select
                    value={styleFilter}
                    onChange={(e) => setStyleFilter(e.target.value)}
                    options={FILTER_STYLES}
                    placeholder="All Styles"
                    size="sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Body Section */}
          <section aria-live="polite">
            {view === "create" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <CreateTripForm onSuccess={() => setView("trips")} />
              </div>
            )}

            {view === "trips" && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                <TripList
                  searchQuery={searchQuery}
                  styleFilter={styleFilter}
                  onNavigateToCreate={() => setView("create")}
                />
              </div>
            )}
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}