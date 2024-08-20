import { BreadcrumbsItem } from "@/app/components/breadcrumbs/breadcrumbs.component";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";
import { convertQuoteToApiFormat } from "@/common/utils/data-convert.utils";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";

export enum PageStateEnum {
  CAN_CHANGE = "CAN_CHANGE",
  INVALID = "INVALID",
  CHECK = "CHECK",
  NO_VALIDITY = "NO_VALIDITY",
}

export interface DataCollectorI {
  form: string;
  data: any;
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
  saveData: () => boolean;
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
  saveData: () => false,
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
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [type, setType] = useState<QuoteTypeEnum | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsItem[]>([
    {
      title: "Request Quote",
    },
  ]);
  const [canChangePage, setCanChangePage] = useState<PageStateEnum>(
    PageStateEnum.INVALID,
  );
  const [dataCollector, setDataCollector] = useState<Array<any>>([]);
  const { session } = useStore();

  const getLastDataDebounced = useDebouncedCallback(() => {
    getWithAuth("/quote?limit=1").then((res) => {
      let _default = {};
      let addresses = [];
      if (session.auto_commodity) {
        _default["details"] = [
          {
            commodity: res[0].details[0].commodity,
          },
        ];
      }

      if (session.auto_pickup) {
        const pickupA = res[0].addresses.filter(
          ({ address_type }) => address_type === "pickup",
        );

        pickupA.map(({ address_type, address }) => {
          addresses.push({
            address,
            address_type,
          });
        });
      }

      if (session.auto_delivery) {
        const dropA = res[0].addresses.filter(
          ({ address_type }) => address_type === "drop",
        );

        dropA.map(({ address_type, address }) => {
          addresses.push({
            address,
            address_type,
          });
        });
      }

      if (addresses.length) {
        _default["addresses"] = addresses;
      }

      _default["quote_type"] = session.quote_type;
      _default["currency"] = session.currency;

      addData({
        form: "default",
        data: _default,
      });
    });
  }, 500);
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

  const saveData = useCallback(async () => {
    return postWithAuth(
      "/quote/create",
      convertQuoteToApiFormat(dataCollector, type!),
    );
  }, [dataCollector, type]);

  useEffect(() => {
    if (canChangePage === PageStateEnum.CAN_CHANGE) {
      setStepNumber(stepNumber + 1);
      setCanChangePage(PageStateEnum.INVALID);
    }
  }, [canChangePage]);

  useEffect(() => {
    if (
      session &&
      (session.auto_commodity ||
        session.auto_delivery ||
        session.auto_pickup ||
        session.quote_type)
    ) {
      getLastDataDebounced();
    }
  }, []);

  useEffect(() => {
    console.log("new data added to collector");
    console.log(dataCollector);
  }, [dataCollector]);

  useEffect(() => {
    if (stepNumber == 9) {
      console.log(convertQuoteToApiFormat(dataCollector, type!));
    }
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
          validateAndGoForward,
          setCanChangePage,
          canChangePage,
          addData,
          addBreadcrumb,
          getData,
          saveData,
        } as RegisterQuoteContextI
      }
    >
      {children}
    </RegisterQuoteContext.Provider>
  );
};
