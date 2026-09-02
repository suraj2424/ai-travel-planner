"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Plane,
  Compass,
  Plus,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import Dropdown, { DropdownItem, DropdownDivider } from "./dropdown";
import { ThemeToggle } from "../theme-toggle";

interface SidebarProps {
  totalTrips?: number;
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
  onLogout?: () => void;
}

function TooltipWrapper({
  children,
  text,
  show,
}: {
  children: React.ReactNode;
  text: string;
  show: boolean;
}) {
  if (!show) return <>{children}</>;

  return (
    <div className="relative group/tooltip flex justify-center w-full">
      {children}
      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-primary)] shadow-lg whitespace-nowrap opacity-0 group-hover/tooltip:opacity-100 group-active/tooltip:opacity-0 transition-all duration-200 pointer-events-none z-50">
        {text}
      </div>
    </div>
  );
}

export default function Sidebar({
  totalTrips = 0,
  user,
  onLogout,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isTripsActive = pathname === "/trips";
  const isCreateActive = pathname === "/trips/new";
  const isDetailActive =
    !!pathname?.startsWith("/trips/") && pathname !== "/trips/new";

  const goToCreate = () => router.push("/trips/new");

  // Compute user initials cleanly
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

  // Compute display name
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
    <aside
      className={`hidden lg:flex flex-col justify-between border-r border-[var(--color-border)]/70 bg-[var(--color-surface)] p-3.5 pb-6 min-h-screen sticky top-0 h-screen overflow-visible shrink-0 select-none transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-18" : "w-64"
      }`}
    >
      <div className="space-y-6">
        {/* Brand Header & Toggle */}
        <div className="flex items-center justify-between h-10 min-w-0">
          {!isCollapsed && (
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[var(--color-text-primary)] hover:opacity-90 transition-opacity min-w-0 truncate"
              aria-label="AI Travel Planner Home"
            >
              <span className="flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-[var(--color-brand-600)] text-white shadow-xs shrink-0">
                <Plane className="w-4 h-4" />
              </span>
              <span className="font-bold tracking-tight text-[15px] whitespace-nowrap min-w-0 truncate">
                AI Travel <span className="text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">Planner</span>
              </span>
            </Link>
          )}

          <TooltipWrapper
            text={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            show={isCollapsed}
          >
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`w-8.5 h-8.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-brand-500)]/40 hover:bg-[var(--color-surface-muted)] transition-all flex items-center justify-center cursor-pointer shrink-0 ${
                isCollapsed ? "mx-auto" : ""
              }`}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </TooltipWrapper>
        </div>

        {/* Navigation Links */}
        <div className="space-y-1.5">
          {!isCollapsed && (
            <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)] transition-opacity duration-200">
              Navigation
            </div>
          )}

          {/* Trips Tab */}
          <TooltipWrapper
            text={`My Trips ${totalTrips > 0 ? `(${totalTrips})` : ""}`}
            show={isCollapsed}
          >
            <Link
              href="/trips"
              className={`w-full flex items-center h-10 px-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isTripsActive || isDetailActive
                  ? "bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-950)]/50 text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)] border border-[var(--color-brand-200)] dark:border-[var(--color-brand-800)]/60 shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] border border-transparent"
              } ${isCollapsed ? "justify-center" : "justify-between"}`}
            >
              <div className="flex items-center min-w-0">
                <Compass
                  className={`w-4.5 h-4.5 shrink-0 ${
                    isTripsActive || isDetailActive
                      ? "text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]"
                      : ""
                  }`}
                />
                {!isCollapsed && (
                  <span className="ml-2.5 truncate text-left font-semibold">
                    My Trips
                  </span>
                )}
              </div>

              {totalTrips > 0 && !isCollapsed && (
                <span
                  className={`rounded-full text-xs font-semibold px-2 py-0.5 shrink-0 transition-opacity duration-200 ${
                    isTripsActive || isDetailActive
                      ? "bg-[var(--color-brand-200)]/50 dark:bg-[var(--color-brand-900)]/80 text-[var(--color-brand-800)] dark:text-[var(--color-brand-200)]"
                      : "bg-[var(--color-surface-muted)] text-[var(--color-text-tertiary)] border border-[var(--color-border)]"
                  }`}
                >
                  {totalTrips}
                </span>
              )}
            </Link>
          </TooltipWrapper>

          {/* Plan Trip Tab */}
          <TooltipWrapper text="Plan New Trip" show={isCollapsed}>
            <Link
              href="/trips/new"
              className={`w-full flex items-center h-10 px-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isCreateActive
                  ? "bg-[var(--color-brand-50)] dark:bg-[var(--color-brand-950)]/50 text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)] border border-[var(--color-brand-200)] dark:border-[var(--color-brand-800)]/60 shadow-xs"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)] border border-transparent"
              } ${isCollapsed ? "justify-center" : "justify-between"}`}
            >
              <div className="flex items-center min-w-0">
                <Plus
                  className={`w-4.5 h-4.5 shrink-0 ${
                    isCreateActive
                      ? "text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]"
                      : ""
                  }`}
                />
                {!isCollapsed && (
                  <span className="ml-2.5 truncate text-left font-semibold">
                    Plan New Trip
                  </span>
                )}
              </div>
            </Link>
          </TooltipWrapper>
        </div>
      </div>

      {/* User Footer Profile & Settings */}
      <div className="border-t border-[var(--color-border)]/70 pt-4 space-y-3">
        {!isCollapsed && (
          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-[var(--color-text-tertiary)] font-medium">
              Appearance
            </span>
            <ThemeToggle />
          </div>
        )}

        {user && (
          <>
            {isCollapsed ? (
              /* Collapsed Avatar Dropdown */
              <div className="flex flex-col items-center gap-3">
                <TooltipWrapper text="Toggle Theme" show={isCollapsed}>
                  <ThemeToggle />
                </TooltipWrapper>

                <Dropdown
                  align="side"
                  width="w-56"
                  trigger={
                    <button
                      className="w-10 h-10 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-brand-500)]/40 flex items-center justify-center transition-colors cursor-pointer relative"
                      aria-label="User profile menu"
                    >
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[var(--color-brand-600)] to-[var(--color-brand-500)] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                        {initials}
                      </div>
                      <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[var(--color-surface)]" />
                    </button>
                  }
                >
                  <div className="px-4 py-3 border-b border-[var(--color-border)] mb-1">
                    <p className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                      {displayName}
                    </p>
                    {email && (
                      <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
                        {email}
                      </p>
                    )}
                  </div>

                  <DropdownItem onClick={goToCreate}>
                    <Plus className="w-4 h-4 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]" />
                    <span>Plan New Trip</span>
                  </DropdownItem>

                  <DropdownDivider />

                  {onLogout && (
                    <DropdownItem onClick={onLogout} destructive>
                      <LogOut className="w-4 h-4" />
                      <span>Log out</span>
                    </DropdownItem>
                  )}
                </Dropdown>
              </div>
            ) : (
              /* Expanded User Avatar Dropdown Pill */
              <Dropdown
                align="top"
                width="w-56"
                className="relative w-full"
                trigger={
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-muted)] hover:border-[var(--color-brand-500)]/30 transition-all cursor-pointer group shadow-2xs"
                    aria-label="User profile menu"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-brand-600)] to-[var(--color-brand-500)] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                          {initials}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--color-surface-elevated)]" />
                      </div>
                      <div className="min-w-0 text-left">
                        <p className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                          {displayName}
                        </p>
                        {email && (
                          <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
                            {email}
                          </p>
                        )}
                      </div>
                    </div>
                    <ChevronUp className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)] transition-colors shrink-0 ml-1" />
                  </button>
                }
              >
                <div className="px-4 py-3 border-b border-[var(--color-border)] mb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-[var(--color-brand-600)] to-[var(--color-brand-500)] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                        {displayName}
                      </p>
                      {email && (
                        <p className="text-[11px] text-[var(--color-text-tertiary)] truncate">
                          {email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <DropdownItem onClick={goToCreate}>
                  <Plus className="w-4 h-4 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]" />
                  <span>Plan New Trip</span>
                </DropdownItem>

                <DropdownDivider />

                {onLogout && (
                  <DropdownItem onClick={onLogout} destructive>
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </DropdownItem>
                )}
              </Dropdown>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
