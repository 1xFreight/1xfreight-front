"use client";

import "./styles.css";
import QuotesTableComponent from "@/app/quotes/components/quotes-table/quotes-table.component";
import { mockData } from "@/app/quotes/components/quotes-table/mock-data";
import FiltersPanelComponent from "@/app/quotes/components/filters-panel/filters-panel.component";
import { useEffect, useMemo, useState } from "react";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import LoadingComponent from "@/common/components/loading/loading.component";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { useDebouncedCallback } from "use-debounce";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState();
  const [loading, setLoading] = useState(true);

  const getQuotesDebounced = useDebouncedCallback(() => {
    setLoading(true);
    getWithAuth("/quote").then((data) => setQuotes(data));
    setTimeout(() => setLoading(false), 500);
  }, 1000);

  useEffect(() => {
    getQuotesDebounced();
  }, []);

  return (
    <div className={"quotes-page page"}>
      <div className={"container page-header"}>
        <h4 className={"title"}>Quotes</h4>
      </div>

      <div className={"container"}>
        <FiltersPanelComponent />
      </div>

      <div className={"container"}>
        {loading ? (
          <Loading2Component />
        ) : (
          <QuotesTableComponent rows={quotes} />
        )}
      </div>
    </div>
  );
}
