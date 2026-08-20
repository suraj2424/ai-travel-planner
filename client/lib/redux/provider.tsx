"use client";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthInitializer from "@/components/auth/AuthInitializer";

type Props = {
  children: React.ReactNode
};

export default function ReduxProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <AuthInitializer />
      {children}
    </Provider>
  );
}