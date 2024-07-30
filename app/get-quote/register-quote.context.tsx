import { BreadcrumbsItem } from "@/app/components/breadcrumbs/breadcrumbs.component";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";
import { FtlLtlStepsEnum } from "@/app/get-quote/enums/ftl-ltl-steps.enum";
import { number } from "prop-types";

export enum PageStateEnum {
  CAN_CHANGE = "CAN_CHANGE",
  INVALID = "INVALID",
  CHECK = "CHECK",
  NO_VALIDITY = "NO_VALIDITY",
}

interface RegisterQuoteContextI {
  breadcrumbs: BreadcrumbsItem[];
  stepNumber: number;
  setStepNumber: Dispatch<SetStateAction<number>>;
  type: QuoteTypeEnum | null;
  setType: Dispatch<SetStateAction<QuoteTypeEnum>>;
  setCanChangePage: Dispatch<SetStateAction<PageStateEnum>>;
  canChangePage: PageStateEnum;
  validateAndGoForward: () => void;
  addData: (data: any) => void;
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
  setCanChangePage: () => {},
  validateAndGoForward: () => {},
  addData: () => {},
  canChangePage: PageStateEnum.INVALID,
};

export const RegisterQuoteContext =
  createContext<RegisterQuoteContextI>(defaultContextValues);

export const RegisterQuoteContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [stepNumber, setStepNumber] = useState<number>(3);
  const [type, setType] = useState<QuoteTypeEnum | null>(QuoteTypeEnum.FTL);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsItem[]>([
    {
      title: "Request Quote",
    },
  ]);
  const [canChangePage, setCanChangePage] = useState<PageStateEnum>(
    PageStateEnum.INVALID,
  );
  const [lastPage, setLastPage] = useState<number>(1);
  const [dataCollector, setDataCollector] = useState<Array<any>>([]);

  const validateAndGoForward = () => {
    if (canChangePage === PageStateEnum.NO_VALIDITY)
      return setCanChangePage(PageStateEnum.CAN_CHANGE);
    if (canChangePage === PageStateEnum.CHECK) return;
    setCanChangePage(PageStateEnum.CHECK);
  };

  const addData = (data: any) => {
    setDataCollector((prevState) => [...prevState, data]);
  };

  useEffect(() => {
    if (canChangePage === PageStateEnum.CAN_CHANGE) {
      setStepNumber(stepNumber + 1);
      setCanChangePage(PageStateEnum.INVALID);
    }
  }, [canChangePage]);

  useEffect(() => {
    if (stepNumber > lastPage) {
      setLastPage(stepNumber);
    }
    if (breadcrumbs.length >= stepNumber) return;

    setBreadcrumbs([
      ...breadcrumbs,
      {
        title: Object.values(FtlLtlStepsEnum)[stepNumber - 1],
      },
    ]);
  }, [stepNumber]);

  useEffect(() => {
    console.log("new data added to collector");
    console.log(dataCollector);
  }, [dataCollector]);

  return (
    <RegisterQuoteContext.Provider
      value={
        {
          breadcrumbs,
          stepNumber,
          setStepNumber,
          type,
          setType,
          validateAndGoForward,
          setCanChangePage,
          canChangePage,
          addData,
        } as RegisterQuoteContextI
      }
    >
      {children}
    </RegisterQuoteContext.Provider>
  );
};
