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
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { toShortId } from "@/common/utils/data-convert.utils";

interface QuoteContextI {
  quote: any;
  setQuoteId: Dispatch<SetStateAction<string>>;
  setIsMissingData: Dispatch<SetStateAction<string>>;
  getRequest: (request_id: string) => any;
  breadcrumbs: any[];
  refreshBreadcrumbs: () => void;
  requests: any;
  isMissingData: string;
}

const defaultContextValues: QuoteContextI = {
  quote: {},
  setQuoteId: () => {},
  getRequest: () => {},
  setIsMissingData: () => {},
  breadcrumbs: [],
  refreshBreadcrumbs: () => {},
  requests: [],
  isMissingData: "",
};

export const QuoteContext = createContext(defaultContextValues);

export const QuoteContextProvider = ({ children }: { children: ReactNode }) => {
  const [quote, setQuote] = useState<any>(null);
  const [requests, setRequests] = useState([]);
  const [quoteId, setQuoteId] = useState();
  const [isMissingData, setIsMissingData] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState<any>([
    {
      title: "Quotes",
      href: "/quotes",
    },
  ]);

  const isValid = (validUntil) => {
    const currentDate = new Date();
    const validUntilDate = new Date(validUntil);

    return (
      (currentDate.getFullYear() === validUntilDate.getFullYear() &&
        currentDate.getMonth() === validUntilDate.getMonth() &&
        currentDate.getDate() === validUntilDate.getDate()) ||
      currentDate < validUntilDate
    );
  };

  const getQuoteAndReq = useDebouncedCallback(() => {
    getWithAuth(`/quote?limit=1&id=${quoteId}`).then((data) => {
      if (!data) return;

      setQuote(data?.quotes[0]);
      const bids = data?.quotes[0].bids;
      const hydratedBids = bids.map((bid) => ({
        ...bid,
        status: isValid(bid.valid_until) ? "active" : "expired",
      }));

      setRequests(hydratedBids);
    });
  });

  useEffect(() => {
    if (!quoteId) return;
    getQuoteAndReq();
    setBreadcrumbs([
      ...breadcrumbs,
      {
        title: `Load #${toShortId(quoteId)}`,
      },
    ]);
  }, [quoteId]);

  const getRequest = (request_id: string) => {
    const request = requests.filter(({ _id }) => _id === request_id)[0];
    if (!request) return;

    setBreadcrumbs([
      {
        title: "Quotes",
        href: "/quotes",
      },
      {
        title: `Load #${toShortId(quoteId)}`,
        href: `/quotes/${quoteId}`,
      },
      {
        title: `Request #${toShortId(request._id)}`,
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
        title: `Load #${toShortId(quoteId)}`,
        href: `/quotes/${quoteId}`,
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
          requests,
          isMissingData,
          setIsMissingData,
        } as QuoteContextI
      }
    >
      {children}
    </QuoteContext.Provider>
  );
};
