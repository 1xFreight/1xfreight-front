"use client";

import { ReactNode } from "react";
import { StoreContextProvider } from "@/common/contexts/store.context";
import AuthProvider from "@/app/auth/auth.provider";
import ToasterComponent from "@/common/components/toaster/toaster.component";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreContextProvider>
      <ToasterComponent />
      <AuthProvider>{children}</AuthProvider>
    </StoreContextProvider>
  );
}
