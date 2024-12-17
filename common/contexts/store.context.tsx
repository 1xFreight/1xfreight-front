import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import IToast from "@/common/interfaces/toast.interface";
import { usePathname } from "next/navigation";

interface StoreDataI {
  name: string;
  data: any;
}

interface StoreContextI {
  addToStore: (newData: StoreDataI) => any;
  getFromStore: (name: string) => any;
  deleteFromStore: (name: string) => any;
  session: any;
  setSession: Dispatch<SetStateAction<any>>;
  setFilters: Dispatch<SetStateAction<any>>;
  filters: any;
  toasts: IToast[];
  showToast: (config: IToast) => any;
  killToast: (id: string) => any;
  triggerUpdate: any;
  currencies: any;
  setTriggerUpdate: Dispatch<SetStateAction<any>>;
  setCurrencies: Dispatch<SetStateAction<any>>;
}

const defaultContextValues = {
  addToStore: () => {},
  getFromStore: () => {},
  deleteFromStore: () => {},
  setSession: () => {},
  setFilters: () => {},
  showToast: () => {},
  killToast: () => {},
  toasts: [],
  session: {},
  filters: {},
  triggerUpdate: null,
  currencies: null,
  setTriggerUpdate: () => {},
  setCurrencies: () => {},
};

export const StoreContext = createContext<StoreContextI>(defaultContextValues);

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreDataI[]>([]);
  const [session, setSession] = useState();
  const [toasts, setToasts] = useState([]);
  const [filters, setFilters] = useState({});
  const [triggerUpdate, setTriggerUpdate] = useState<any>(null);
  const [currencies, setCurrencies] = useState<any>(null);

  const killToast = (toastId: string) => {
    document.getElementById(toastId)?.classList.toggle("slide-out-top");
    setTimeout(
      () =>
        setToasts((prevToasts) =>
          prevToasts.filter(({ id }) => id !== toastId),
        ),
      300,
    );
  };

  function generateId() {
    const S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4();
  }

  const showToast = (config: IToast) => {
    const toast = { ...config, id: generateId() };

    if (!toast.hasOwnProperty("duration")) toast.duration = 5000;

    setToasts((prevToasts) => [toast, ...prevToasts]);

    if (toast.duration !== 0) {
      setTimeout(() => {
        killToast(toast.id);
      }, toast.duration);
    }
  };
  const clearToasts = () => {
    setToasts([]);
  };

  const addToStore = (newData: StoreDataI) => {
    setStore((prevState) => {
      return prevState.filter(({ name }) => name !== newData.name);
    });

    setStore((prevState) => [...prevState, newData]);
  };

  const deleteFromStore = (name: string) => {
    setStore((prevState) => {
      return prevState.filter((store) => store.name !== name);
    });
  };

  const getFromStore = (dataName: string) => {
    const _store = store.find(({ name }) => name === dataName);
    return _store ? _store : null;
  };

  return (
    <StoreContext.Provider
      value={{
        addToStore,
        getFromStore,
        session,
        setSession,
        showToast,
        toasts,
        killToast,
        filters,
        setFilters,
        triggerUpdate,
        setTriggerUpdate,
        deleteFromStore,
        currencies,
        setCurrencies,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
