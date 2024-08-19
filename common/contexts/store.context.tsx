import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface StoreDataI {
  name: string;
  data: any;
}

interface StoreContextI {
  addToStore: (newData: StoreDataI) => any;
  getFromStore: (name: string) => any;
  session: any;
  setSession: Dispatch<SetStateAction<any>>;
}

const defaultContextValues = {
  addToStore: () => {},
  getFromStore: () => {},
  setSession: () => {},
};

export const StoreContext = createContext<StoreContextI>(defaultContextValues);

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreDataI[]>([]);
  const [session, setSession] = useState();

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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
