"use client";

import { ReactNode } from "react";
import { QuoteContextProvider } from "@/app/quotes/[quote_id]/quote.context";

export default function QuoteContextProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <QuoteContextProvider>{children}</QuoteContextProvider>;
}
