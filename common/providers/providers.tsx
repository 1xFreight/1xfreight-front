"use client";

import { ReactNode } from "react";
import { StoreContextProvider } from "@/common/contexts/store.context";

export default function Providers({ children }: { children: ReactNode }) {
  return <StoreContextProvider>{children}</StoreContextProvider>;
}
