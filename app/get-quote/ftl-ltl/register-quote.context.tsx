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

interface RegisterQuoteContextI {
  breadcrumbs: BreadcrumbsItem[];
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
}

const defaultContextValues: RegisterQuoteContextI = {
  breadcrumbs: [
    {
      title: "Request Quote",
    },
  ],
  stepNumber: 1,
  setStepNumber: () => {},
};

export const RegisterQuoteContext =
  createContext<RegisterQuoteContextI>(defaultContextValues);

export const RegisterQuoteContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsItem[]>([
    {
      title: "Request Quote",
    },
  ]);

  useEffect(() => {
    setBreadcrumbs([
      ...breadcrumbs,
      {
        title: Object.values(RegisterQuoteStepsEnum)[stepNumber - 1],
      },
    ]);
  }, [stepNumber]);

  return (
    <RegisterQuoteContext.Provider
      value={{
        breadcrumbs,
        stepNumber,
        setStepNumber,
      }}
    >
      {children}
    </RegisterQuoteContext.Provider>
  );
};
