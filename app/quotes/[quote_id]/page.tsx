"use client";

import QTableComponent from "@/app/quotes/[quote_id]/components/q-table.component";
import { mockBids } from "@/app/quotes/[quote_id]/mockBids";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import { useEffect } from "react";

enum StatusEnum {
  ACTIVE = "active",
  EXPIRED = "expired",
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
  const { setQuoteId, refreshBreadcrumbs } = useQuoteContext();

  useEffect(() => {
    setQuoteId(params.quote_id);
    refreshBreadcrumbs();
  }, []);

  return (
    <div className={"quote-bids-page page"}>
      <div className={"filters-panel container"}>
        <TypeSelectorComponent typeEnum={StatusEnum} />
        <TypeSelectorComponent typeEnum={SortEnum} />
      </div>
      <div className={"container"}>
        <QTableComponent quotes={mockBids} />
      </div>
    </div>
  );
}
