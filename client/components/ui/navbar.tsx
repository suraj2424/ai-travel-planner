"use client";

import Link from "next/link";
import { Plane, LogOut, Compass, ChevronDown } from "lucide-react";
import Dropdown, { DropdownItem, DropdownDivider } from "./dropdown";
import { ThemeToggle } from "../theme-toggle";

interface NavbarProps {
  title?: string;
  subtitle?: string;
  user?: {
    id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  } | null;
  onLogout?: () => void;
}

export default function Navbar({
  title,
  subtitle,
  user,
  onLogout,
}: NavbarProps) {
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
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/85 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Page Header */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[var(--color-text-primary)] hover:opacity-90 transition-opacity"
              aria-label="AI Travel Planner Home"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-brand-600)] text-white shadow-sm shrink-0">
                <Plane className="w-4 h-4" />
              </span>
              <span className="font-bold tracking-tight text-base sm:text-lg">
                AI Travel{" "}
                <span className="text-[var(--color-brand-600)]">Planner</span>
              </span>
            </Link>

            {title && title !== "AI Travel Planner" && (
              <div className="hidden sm:flex items-center gap-2 border-l border-[var(--color-border)] pl-3 ml-1">
                <h1 className="text-sm font-semibold text-[var(--color-text-secondary)] truncate">
                  {title}
                </h1>
              </div>
            )}
          </div>

          {/* Right Actions Toolbar */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <ThemeToggle />

            {/* User Profile Pill Avatar & Menu */}
            {user && (
              <Dropdown
                align="right"
                width="w-64"
                trigger={
                  <button
                    className="group flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-brand-500)]/40 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/30 cursor-pointer"
                    aria-label="User menu"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--color-brand-600)] to-[var(--color-brand-500)] flex items-center justify-center text-white font-bold text-xs shadow-inner">
                        {initials}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[var(--color-surface-elevated)]" />
                    </div>
                    <span className="text-xs font-semibold text-[var(--color-text-primary)] hidden md:inline-block truncate max-w-[120px]">
                      {displayName}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)] transition-colors" />
                  </button>
                }
              >
                {/* Profile Header Inside Dropdown */}
                <div className="px-4 py-3 border-b border-[var(--color-border)] mb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[var(--color-brand-600)] to-[var(--color-brand-500)] flex items-center justify-center text-white font-bold text-sm shadow-sm shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[var(--color-text-primary)] truncate">
                        {displayName}
                      </p>
                      {email && (
                        <p className="text-xs text-[var(--color-text-tertiary)] truncate">
                          {email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Dropdown Items */}
                <DropdownItem>
                  <Link href="/trips" className="flex items-center gap-2.5 w-full">
                    <Compass className="w-4 h-4 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]" />
                    <span>My Trips</span>
                  </Link>
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
          </div>
        </div>
      </div>
    </header>
  );
}