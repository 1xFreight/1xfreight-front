import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import IToast from "@/common/interfaces/toast.interface";

interface StoreDataI {
  name: string;
  data: any;
}

interface StoreContextI {
  addToStore: (newData: StoreDataI) => any;
  getFromStore: (name: string) => any;
  session: any;
  setSession: Dispatch<SetStateAction<any>>;
  setFilters: Dispatch<SetStateAction<any>>;
  filters: any;
  toasts: IToast[];
  showToast: (config: IToast) => any;
  killToast: (id: string) => any;
}

const defaultContextValues = {
  addToStore: () => {},
  getFromStore: () => {},
  setSession: () => {},
  setFilters: () => {},
  showToast: () => {},
  killToast: () => {},
  toasts: [],
  session: {},
  filters: {},
};

export const StoreContext = createContext<StoreContextI>(defaultContextValues);

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreDataI[]>([]);
  const [session, setSession] = useState();
  const [toasts, setToasts] = useState([]);
  const [filters, setFilters] = useState({});

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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
