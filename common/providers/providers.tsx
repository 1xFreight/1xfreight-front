"use client";

import { ReactNode } from "react";
import { StoreContextProvider } from "@/common/contexts/store.context";
import AuthProvider from "@/app/auth/auth.provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreContextProvider>
      <AuthProvider>{children}</AuthProvider>
    </StoreContextProvider>
  );
}
