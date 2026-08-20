"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials, logout } from "@/lib/redux/features/auth/authSlice";
import { useRefreshMutation } from "@/services/api";

export default function AuthInitializer() {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const result = await refresh().unwrap();

        dispatch(
          setCredentials({
            accessToken: result.data.accessToken,
            user: result.data.user,
          }),
        );
      } catch {
        dispatch(logout());
      }
    };

    initializeAuth();
  }, [dispatch, refresh]);

  return null;
}