import { createContext, ReactNode, useState } from "react";

interface StoreDataI {
  name: string;
  data: any;
}

interface StoreContextI {
  addToStore: (newData: StoreDataI) => any;
  getFromStore: (name: string) => any;
}

const defaultContextValues = {
  addToStore: () => {},
  getFromStore: () => {},
};

export const StoreContext = createContext<StoreContextI>(defaultContextValues);

export const StoreContextProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStore] = useState<StoreDataI[]>([]);

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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
