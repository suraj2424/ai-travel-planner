"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Compass,
  LogOut,
  Plane,
  Plus,
} from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------------------------- tooltip -------------------------------- */

function Tooltip({
  label,
  show,
  children,
}: {
  label: string;
  show: boolean;
  children: ReactNode;
}) {
  if (!show) return <>{children}</>;

  return (
    <div className="group/tt relative flex w-full justify-center">
      {children}
      <div
        role="tooltip"
        className="pointer-events-none absolute left-full top-1/2 z-50 ml-2.5 -translate-y-1/2 scale-90 whitespace-nowrap rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-text-primary)] opacity-0 shadow-lg transition-all duration-150 group-hover/tt:scale-100 group-hover/tt:opacity-100 group-hover/tt:delay-200"
      >
        <span
          aria-hidden="true"
          className="absolute -left-1 top-1/2 h-2 w-2 -translate-y-1/2 rotate-45 border-b border-l border-[var(--color-border)] bg-[var(--color-surface-elevated)]"
        />
        {label}
      </div>
    </div>
  );
}

/* --------------------------------- dropdown -------------------------------- */

const DropdownContext = createContext<{ close: () => void }>({
  close: () => {},
});

function Dropdown({
  trigger,
  children,
  align = "bottom",
  width = "w-56",
  className,
}: {
  trigger: ReactNode | ((open: boolean) => ReactNode);
  children: ReactNode;
  align?: "bottom" | "top" | "side";
  width?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const position =
    align === "side"
      ? "bottom-0 left-full ml-2 origin-bottom-left"
      : align === "top"
        ? "bottom-full left-0 mb-2 origin-bottom-left"
        : "top-full left-0 mt-2 origin-top-left";

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <div onClick={() => setOpen((value) => !value)}>
        {typeof trigger === "function" ? trigger(open) : trigger}
      </div>

      {open && (
        <DropdownContext.Provider value={{ close: () => setOpen(false) }}>
          <div
            role="menu"
            className={cn(
              "absolute z-50 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-1 shadow-xl shadow-black/10 animate-in fade-in zoom-in-95 duration-150",
              width,
              position
            )}
          >
            {children}
          </div>
        </DropdownContext.Provider>
      )}
    </div>
  );
}

function DropdownItem({
  onClick,
  destructive = false,
  children,
}: {
  onClick?: () => void;
  destructive?: boolean;
  children: ReactNode;
}) {
  const { close } = useContext(DropdownContext);

  return (
    <button
      type="button"
      role="menuitem"
      onClick={() => {
        onClick?.();
        close();
      }}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] font-medium transition-colors",
        destructive
          ? "text-red-500 hover:bg-red-500/10"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
      )}
    >
      {children}
    </button>
  );
}

function DropdownDivider() {
  return <div className="mx-1 my-1 h-px bg-[var(--color-border)]" />;
}

/* -------------------------------- user menu -------------------------------- */

function UserMenuContent({
  initials,
  displayName,
  email,
  onPlanNew,
  onLogout,
}: {
  initials: string;
  displayName: string;
  email: string;
  onPlanNew: () => void;
  onLogout?: () => void;
}) {
  return (
    <>
      <div className="mb-1 border-b border-[var(--color-border)] px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--color-brand-600)] to-[var(--color-brand-500)] text-[10px] font-bold text-white shadow-xs">
            {initials}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-bold text-[var(--color-text-primary)]">
              {displayName}
            </span>
            {email && (
              <span className="block truncate text-[10px] text-[var(--color-text-tertiary)]">
                {email}
              </span>
            )}
          </span>
        </div>
      </div>

      <DropdownItem onClick={onPlanNew}>
        <Plus className="h-3.5 w-3.5 text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]" />
        <span>Plan New Trip</span>
      </DropdownItem>

      {onLogout && (
        <>
          <DropdownDivider />
          <DropdownItem onClick={onLogout} destructive>
            <LogOut className="h-3.5 w-3.5" />
            <span>Log out</span>
          </DropdownItem>
        </>
      )}
    </>
  );
}

/* --------------------------------- nav item -------------------------------- */

function NavItem({
  href,
  active,
  collapsed,
  icon,
  label,
  tooltip,
  badge,
}: {
  href: string;
  active: boolean;
  collapsed: boolean;
  icon: ReactNode;
  label: string;
  tooltip?: string;
  badge?: ReactNode;
}) {
  return (
    <Tooltip label={tooltip ?? label} show={collapsed}>
      <Link
        href={href}
        aria-label={label}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex h-9 w-full items-center rounded-lg border text-[13px] font-semibold transition-all duration-200",
          collapsed ? "justify-center" : "justify-between px-2.5",
          active
            ? "border-[var(--color-brand-200)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)] shadow-xs dark:border-[var(--color-brand-800)]/60 dark:bg-[var(--color-brand-950)]/50 dark:text-[var(--color-brand-300)]"
            : "border-transparent text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
        )}
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {icon}
          {!collapsed && <span className="truncate">{label}</span>}
        </span>
        {!collapsed && badge}
      </Link>
    </Tooltip>
  );
}

/* ---------------------------------- sidebar -------------------------------- */

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

  const getInitials = () => {
    if (!user) return "U";
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    if (user.firstName) return user.firstName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
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

  const menuContent = (
    <UserMenuContent
      initials={initials}
      displayName={displayName}
      email={email}
      onPlanNew={goToCreate}
      onLogout={onLogout}
    />
  );

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 select-none flex-col justify-between overflow-visible border-r border-[var(--color-border)]/70 bg-[var(--color-surface)] p-2.5 transition-[width] duration-300 ease-in-out lg:flex",
        isCollapsed ? "w-16" : "w-60"
      )}
    >
      <div className="space-y-4">
        {/* brand + collapse toggle */}
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "flex-col gap-2" : "h-9 justify-between px-0.5"
          )}
        >
          {isCollapsed ? (
            <Tooltip label="AI Travel Planner — Home" show={isCollapsed}>
              <Link
                href="/"
                aria-label="AI Travel Planner home"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-brand-600)] text-white shadow-xs transition-opacity hover:opacity-90"
              >
                <Plane className="h-4 w-4" />
              </Link>
            </Tooltip>
          ) : (
            <Link
              href="/"
              aria-label="AI Travel Planner home"
              className="flex min-w-0 items-center gap-2 text-[var(--color-text-primary)] transition-opacity hover:opacity-90"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand-600)] text-white shadow-xs">
                <Plane className="h-4 w-4" />
              </span>
              <span className="truncate text-sm font-bold tracking-tight">
                AI Travel{" "}
                <span className="text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]">
                  Planner
                </span>
              </span>
            </Link>
          )}

          <Tooltip
            label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            show={isCollapsed}
          >
            <button
              type="button"
              onClick={() => setIsCollapsed((value) => !value)}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] transition-all hover:border-[var(--color-brand-500)]/40 hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text-primary)]"
            >
              {isCollapsed ? (
                <ChevronRight className="h-3.5 w-3.5" />
              ) : (
                <ChevronLeft className="h-3.5 w-3.5" />
              )}
            </button>
          </Tooltip>
        </div>

        {/* navigation */}
        <nav className="space-y-1" aria-label="Primary">
          {!isCollapsed && (
            <div className="px-2.5 pb-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--color-text-tertiary)]">
              Navigation
            </div>
          )}

          <NavItem
            href="/trips"
            active={isTripsActive || isDetailActive}
            collapsed={isCollapsed}
            icon={
              <Compass
                className={cn(
                  "h-4 w-4 shrink-0",
                  (isTripsActive || isDetailActive) &&
                    "text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]"
                )}
              />
            }
            label="My Trips"
            tooltip={`My Trips${totalTrips > 0 ? ` (${totalTrips})` : ""}`}
            badge={
              totalTrips > 0 ? (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-px text-[10px] font-bold tabular-nums",
                    isTripsActive || isDetailActive
                      ? "bg-[var(--color-brand-200)]/60 text-[var(--color-brand-800)] dark:bg-[var(--color-brand-900)]/80 dark:text-[var(--color-brand-200)]"
                      : "border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-text-tertiary)]"
                  )}
                >
                  {totalTrips}
                </span>
              ) : null
            }
          />

          <NavItem
            href="/trips/new"
            active={isCreateActive}
            collapsed={isCollapsed}
            icon={
              <Plus
                className={cn(
                  "h-4 w-4 shrink-0",
                  isCreateActive &&
                    "text-[var(--color-brand-600)] dark:text-[var(--color-brand-400)]"
                )}
              />
            }
            label="Plan New Trip"
          />
        </nav>
      </div>

      {/* footer */}
      <div className="space-y-2.5 border-t border-[var(--color-border)]/70 pt-2.5">
        {!isCollapsed && (
          <div className="flex items-center justify-between px-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-tertiary)]">
              Appearance
            </span>
            <ThemeToggle />
          </div>
        )}

        {isCollapsed ? (
          <div className="flex flex-col items-center gap-2">
            <Tooltip label="Toggle theme" show={isCollapsed}>
              <ThemeToggle />
            </Tooltip>

            {user && (
              <Dropdown
                align="side"
                width="w-56"
                trigger={
                  <button
                    type="button"
                    aria-label="User profile menu"
                    className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-elevated)] transition-colors hover:border-[var(--color-brand-500)]/40"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--color-brand-600)] to-[var(--color-brand-500)] text-[9px] font-bold text-white shadow-xs">
                      {initials}
                    </span>
                    <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-500 ring-2 ring-[var(--color-surface)]" />
                  </button>
                }
              >
                {menuContent}
              </Dropdown>
            )}
          </div>
        ) : (
          user && (
            <Dropdown
              align="top"
              width="w-56"
              className="w-full"
              trigger={(open) => (
                <button
                  type="button"
                  aria-label="User profile menu"
                  className={cn(
                    "group flex w-full items-center justify-between rounded-xl border p-1.5 shadow-2xs transition-all",
                    open
                      ? "border-[var(--color-brand-500)]/40 bg-[var(--color-surface-muted)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-brand-500)]/30 hover:bg-[var(--color-surface-muted)]"
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="relative shrink-0">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[var(--color-brand-600)] to-[var(--color-brand-500)] text-[10px] font-bold text-white shadow-xs">
                        {initials}
                      </span>
                      <span className="absolute -bottom-px -right-px h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-[var(--color-surface-elevated)]" />
                    </span>
                    <span className="min-w-0 text-left">
                      <span className="block truncate text-xs font-bold text-[var(--color-text-primary)]">
                        {displayName}
                      </span>
                      {email && (
                        <span className="block truncate text-[10px] text-[var(--color-text-tertiary)]">
                          {email}
                        </span>
                      )}
                    </span>
                  </span>
                  <ChevronUp
                    className={cn(
                      "ml-1 h-3.5 w-3.5 shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-200 group-hover:text-[var(--color-text-primary)]",
                      open && "rotate-180"
                    )}
                  />
                </button>
              )}
            >
              {menuContent}
            </Dropdown>
          )
        )}
      </div>
    </aside>
  );
}