"use client";

import { ReactNode } from "react";
import { RegisterQuoteContextProvider } from "@/app/get-quote/register-quote.context";

export default function RqContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RegisterQuoteContextProvider>{children}</RegisterQuoteContextProvider>
  );
}
