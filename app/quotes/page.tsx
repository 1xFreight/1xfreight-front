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
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";
import useStore from "@/common/hooks/use-store.context";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { filters } = useStore();

  const getQuotesDebounced = useDebouncedCallback(() => {
    getWithAuth(
      `/quote?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${filters?.searchText ?? ""}&pickupDate=${filters?.pickupDate ?? ""}&dropDate=${filters?.dropDate ?? ""}&owner=${filters?.owners?.map(({ _id }) => _id) || []}&status=${filters?.status}&type=${filters?.type}`,
    ).then((data) => {
      setQuotes(data);
      setLoading(false);
    });
  }, 300);

  useEffect(() => {
    setLoading(true);
    getQuotesDebounced();
  }, [page, filters]);

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
          <>
            <QuotesTableComponent rows={quotes?.quotes} />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "end",
              }}
            >
              <PaginationComponent
                page={page}
                setPage={setPage}
                pages={quotes?.totalQuotes}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
