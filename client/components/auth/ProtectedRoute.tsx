"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/redux/store";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();

  const { initialized, isAuthenticated } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace("/auth/signin");
    }
  }, [initialized, isAuthenticated, router]);

  // Auth state is still being restored.
  if (!initialized) {
    return null;
  }

  // Redirect is about to happen.
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}