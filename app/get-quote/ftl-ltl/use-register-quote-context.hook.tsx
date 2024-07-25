import { useContext } from "react";
import { RegisterQuoteContext } from "@/app/get-quote/ftl-ltl/register-quote.context";

const useRegisterQuoteContext = () => {
  return useContext(RegisterQuoteContext);
};

export default useRegisterQuoteContext;
