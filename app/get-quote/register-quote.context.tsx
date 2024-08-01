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

export enum PageStateEnum {
  CAN_CHANGE = "CAN_CHANGE",
  INVALID = "INVALID",
  CHECK = "CHECK",
  NO_VALIDITY = "NO_VALIDITY",
}

export interface DataCollectorI {
  form: string;
  data: any[];
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
  getData: (formName: string) => any[];
  addBreadcrumb: (title: string) => void;
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
  getData: () => [],
  addBreadcrumb: () => {},
  canChangePage: PageStateEnum.INVALID,
};

export const RegisterQuoteContext =
  createContext<RegisterQuoteContextI>(defaultContextValues);

export const RegisterQuoteContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [stepNumber, setStepNumber] = useState<number>(8);
  const [type, setType] = useState<QuoteTypeEnum | null>(QuoteTypeEnum.FTL);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsItem[]>([
    {
      title: "Request Quote",
    },
  ]);
  const [canChangePage, setCanChangePage] = useState<PageStateEnum>(
    PageStateEnum.INVALID,
  );
  const [dataCollector, setDataCollector] = useState<Array<any>>([]);

  const validateAndGoForward = () => {
    if (canChangePage === PageStateEnum.NO_VALIDITY)
      return setCanChangePage(PageStateEnum.CAN_CHANGE);
    if (canChangePage === PageStateEnum.CHECK) return;
    setCanChangePage(PageStateEnum.CHECK);
  };

  const addData = (data: DataCollectorI) => {
    dataCollector.map(({ form }) => {
      if (form === data.form) {
        setDataCollector((prevState) =>
          prevState.filter((storedData) => storedData.form !== data.form),
        );
      }
    });

    setDataCollector((prevState) => [...prevState, data]);
  };

  const getData = (formName: string) => {
    const formData = dataCollector.find(({ form }) => formName === form);
    return formData ? formData.data : null;
  };

  const addBreadcrumb = (title: string) => {
    setBreadcrumbs((prevBreadcrumbs) => {
      const newBreadcrumbs = [...prevBreadcrumbs];
      newBreadcrumbs[stepNumber] = { title };
      return newBreadcrumbs;
    });
  };

  useEffect(() => {
    if (canChangePage === PageStateEnum.CAN_CHANGE) {
      setStepNumber(stepNumber + 1);
      setCanChangePage(PageStateEnum.INVALID);
    }
  }, [canChangePage]);

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
          addBreadcrumb,
          getData,
        } as RegisterQuoteContextI
      }
    >
      {children}
    </RegisterQuoteContext.Provider>
  );
};
