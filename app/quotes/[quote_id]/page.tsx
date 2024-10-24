"use client";

import QTableComponent from "@/app/quotes/[quote_id]/components/q-table.component";
import { mockBids } from "@/app/quotes/[quote_id]/mockBids";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import { useEffect, useState } from "react";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";
import { useDebouncedCallback } from "use-debounce";
import { isFetchCached, postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import path from "node:path";
import { usePathname } from "next/navigation";

enum StatusEnum {
  ALL = "All",
  ACTIVE = "Active",
  EXPIRED = "Expired",
}

enum SortEnum {
  LOWEST = "Lowest Price",
  HIGHEST = "Highest Price",
}

export default function QuoteBids({
  params,
}: {
  params: { quote_id: string };
}) {
  const { setQuoteId, refreshBreadcrumbs, requests, quote } = useQuoteContext();
  const [reqSorted, serReqSorted] = useState(requests);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sort, setSort] = useState("LOWEST");

  useEffect(() => {
    setQuoteId(params.quote_id);
    refreshBreadcrumbs();
  }, []);

  useEffect(() => {
    serReqSorted(requests);
  }, [requests]);

  useEffect(() => {
    let reqSF = requests;

    switch (statusFilter) {
      case "ACTIVE":
        reqSF = requests.filter(({ status }) => status === "active");
        break;
      case "EXPIRED":
        reqSF = requests.filter(({ status }) => status === "expired");
        break;
      case "ALL":
        break;
    }

    switch (sort) {
      case "LOWEST":
        reqSF = reqSF.sort((a, b) => a.amount - b.amount);
        break;
      case "HIGHEST":
        reqSF = reqSF.sort((a, b) => b.amount - a.amount);
        break;
    }

    serReqSorted(reqSF);
  }, [statusFilter, sort]);

  return (
    <div className={"quote-bids-page page"}>
      {!quote ? (
        <Loading2Component />
      ) : (
        <>
          <div className={"filters-panel container"}>
            <TypeSelectorComponent
              typeEnum={StatusEnum}
              setType={setStatusFilter}
              type={statusFilter}
            />
            <TypeSelectorComponent
              typeEnum={SortEnum}
              type={sort}
              setType={setSort}
            />
          </div>
          <div className={"container"}>
            <QTableComponent
              quotes={reqSorted}
              estimatedMiles={quote?.total_miles}
              loadNumbers={quote?.load_number}
            />
          </div>
        </>
      )}
    </div>
  );
}
