import { BreadcrumbsItem } from "@/app/components/breadcrumbs/breadcrumbs.component";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { RegisterQuoteStepsEnum } from "@/app/get-quote/ftl-ltl/enums/steps.enum";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";

interface RegisterQuoteContextI {
  breadcrumbs: BreadcrumbsItem[];
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
  type: QuoteTypeEnum | null;
  setType: Dispatch<SetStateAction<QuoteTypeEnum>>;
}

const defaultContextValues: RegisterQuoteContextI = {
  breadcrumbs: [
    {
      title: "Request Quote",
    },
  ],
  stepNumber: 1,
  setStepNumber: () => {},
  type: null,
  setType: () => {},
};

export const RegisterQuoteContext =
  createContext<RegisterQuoteContextI>(defaultContextValues);

export const RegisterQuoteContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [stepNumber, setStepNumber] = useState<number>(2);
  const [type, setType] = useState<QuoteTypeEnum | null>(QuoteTypeEnum.FCL);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsItem[]>([
    {
      title: "Request Quote",
    },
  ]);

  useEffect(() => {
    if (breadcrumbs.length >= stepNumber) return;

    setBreadcrumbs([
      ...breadcrumbs,
      {
        title: Object.values(RegisterQuoteStepsEnum)[stepNumber - 1],
      },
    ]);
  }, [stepNumber]);

  return (
    <RegisterQuoteContext.Provider
      value={
        {
          breadcrumbs,
          stepNumber,
          setStepNumber,
          type,
          setType,
        } as RegisterQuoteContextI
      }
    >
      {children}
    </RegisterQuoteContext.Provider>
  );
};
