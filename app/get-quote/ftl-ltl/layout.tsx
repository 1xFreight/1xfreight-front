import { ReactNode } from "react";
import RqContextProvider from "@/app/get-quote/ftl-ltl/rq-context.provider";

export default function GetQuoteLayout({ children }: { children: ReactNode }) {
  return <RqContextProvider>{children}</RqContextProvider>;
}
