import { useContext } from "react";
import { QuoteContext } from "@/app/quotes/[quote_id]/quote.context";

const useQuoteContext = () => {
  return useContext(QuoteContext);
};

export default useQuoteContext;
