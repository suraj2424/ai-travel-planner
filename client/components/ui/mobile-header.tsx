"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plane, Compass, Plus, LogOut, ChevronDown } from "lucide-react";
import Dropdown, { DropdownItem, DropdownDivider } from "./dropdown";
import { ThemeToggle } from "../theme-toggle";

interface MobileHeaderProps {
  totalTrips?: number;
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
  onLogout?: () => void;
}

export default function MobileHeader({
  totalTrips = 0,
  user,
  onLogout,
}: MobileHeaderProps) {
  const pathname = usePathname();

  const isTripsActive = pathname === "/trips";
  const isCreateActive = pathname === "/trips/new";
  const isDetailActive =
    !!pathname?.startsWith("/trips/") && pathname !== "/trips/new";
  const getInitials = () => {
    if (!user) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) {
      return user.firstName[0].toUpperCase();
    }
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getDisplayName = () => {
    if (!user) return "Account";
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user.firstName) return user.firstName;
    if (user.email) return user.email.split("@")[0];
    return "Account";
  };

  const initials = getInitials();
  const displayName = getDisplayName();
  const email = user?.email || "";

  return (
    <header className="lg:hidden sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/85 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-text-primary)]"
            aria-label="AI Travel Planner Home"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--color-brand-600)] text-white shadow-sm shrink-0">
              <Plane className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold tracking-tight text-base">
              AI Travel <span className="text-[var(--color-brand-600)]">Planner</span>
            </span>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            {user && (
              <Dropdown
                align="right"
                width="w-60"
                trigger={
                  <button
                    className="flex items-center gap-1.5 p-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] cursor-pointer"
                    aria-label="User menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[var(--color-brand-600)] to-[var(--color-brand-500)] flex items-center justify-center text-white font-bold text-xs">
                      {initials}
                    </div>
                    <ChevronDown className="w-3 h-3 text-[var(--color-text-tertiary)]" />
                  </button>
                }
              >
                <div className="px-4 py-2.5 border-b border-[var(--color-border)] mb-1">
                  <p className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                    {displayName}
                  </p>
                  {email && (
                    <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
                      {email}
                    </p>
                  )}
                </div>

                {onLogout && (
                  <DropdownItem onClick={onLogout} destructive>
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </DropdownItem>
                )}
              </Dropdown>
            )}
          </div>
        </div>

        {/* Mobile View Navigation Tabs */}
        <div className="flex items-center gap-2 pb-3 border-t border-[var(--color-border)]/50 pt-2.5">
          <Link
            href="/trips"
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isTripsActive || isDetailActive
                ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40 dark:text-[var(--color-brand-300)] border border-[var(--color-border)]"
                : "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>My Trips</span>
            {totalTrips > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[var(--color-surface)] border border-[var(--color-border)]">
                {totalTrips}
              </span>
            )}
          </Link>

          <Link
            href="/trips/new"
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isCreateActive
                ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[var(--color-brand-900)]/40 dark:text-[var(--color-brand-300)] border border-[var(--color-border)]"
                : "bg-[var(--color-surface-muted)] text-[var(--color-text-secondary)]"
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Plan Trip</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
