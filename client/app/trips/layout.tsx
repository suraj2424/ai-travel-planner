"use client";

import { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { logout as logoutAction } from "@/lib/redux/features/auth/authSlice";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Sidebar from "@/components/ui/sidebar";
import MobileHeader from "@/components/ui/mobile-header";
import { useGetTripsQuery, Trip } from "@/services/api";

interface TripsLayoutProps {
  children: ReactNode;
}

export default function TripsLayout({ children }: TripsLayoutProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const { data } = useGetTripsQuery({ page: 1, limit: 50 });
  const trips: Trip[] = data?.data || [];
  const totalTrips = trips.length;

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--color-surface)] text-[var(--color-text-primary)]">
        <Sidebar totalTrips={totalTrips} user={user} onLogout={handleLogout} />

        <MobileHeader totalTrips={totalTrips} user={user} onLogout={handleLogout} />

        <main className="flex-1 min-w-0 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
