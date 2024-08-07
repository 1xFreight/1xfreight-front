import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { mockData } from "@/app/quotes/components/quotes-table/mock-data";
import { mockBids } from "@/app/quotes/[quote_id]/mockBids";

interface QuoteContextI {
  quote: any;
  setQuoteId: Dispatch<SetStateAction<string>>;
  getRequest: (request_id: string) => any;
  breadcrumbs: any[];
  refreshBreadcrumbs: () => void;
}

const defaultContextValues: QuoteContextI = {
  quote: {},
  setQuoteId: () => {},
  getRequest: () => {},
  breadcrumbs: [],
  refreshBreadcrumbs: () => {},
};

export const QuoteContext = createContext(defaultContextValues);

export const QuoteContextProvider = ({ children }: { children: ReactNode }) => {
  const [quote, setQuote] = useState<any>(null);
  const [requests, setRequests] = useState([]);
  const [quoteId, setQuoteId] = useState();
  const [breadcrumbs, setBreadcrumbs] = useState<any>([
    {
      title: "Quotes",
      href: "/quotes",
    },
  ]);

  useEffect(() => {
    if (!quoteId) return;
    setQuote(mockData[0]);
    setRequests(mockBids);
    setBreadcrumbs([
      ...breadcrumbs,
      {
        title: `Load #${quoteId}`,
      },
    ]);
  }, [quoteId]);

  const getRequest = (request_id: string) => {
    const request = requests.filter(({ id }) => id === request_id)[0];
    if (!request) return;

    setBreadcrumbs([
      {
        title: "Quotes",
        href: "/quotes",
      },
      {
        title: `Load #${quoteId}`,
      },
      {
        title: request.company,
      },
    ]);

    return request;
  };

  const refreshBreadcrumbs = () => {
    if (!quoteId) return;

    setBreadcrumbs([
      {
        title: "Quotes",
        href: "/quotes",
      },
      {
        title: `Load #${quoteId}`,
      },
    ]);
  };

  return (
    <QuoteContext.Provider
      value={
        {
          quote,
          setQuoteId,
          getRequest,
          breadcrumbs,
          refreshBreadcrumbs,
        } as QuoteContextI
      }
    >
      {children}
    </QuoteContext.Provider>
  );
};
