"use client";

import "./styles.css";
import QuotesTableComponent from "@/app/quotes/components/quotes-table/quotes-table.component";
import FiltersPanelComponent from "@/app/quotes/components/filters-panel/filters-panel.component";
import { useEffect, useMemo, useState } from "react";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { useDebouncedCallback } from "use-debounce";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";
import useStore from "@/common/hooks/use-store.context";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState();
  const [page, setPage] = useState(1);
  const { filters, setFilters } = useStore();
  const [loading, setLoading] = useState(true);

  const getQuotesDebounced = useDebouncedCallback(() => {
    const ignoreCache = filters?.ignoreCache ?? false;

    getWithAuth(
      `/quote?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${filters?.searchText ?? ""}&pickupDate=${filters?.pickupDate ?? ""}&dropDate=${filters?.dropDate ?? ""}&owner=${filters?.owners?.map(({ _id }) => _id) || []}&status=${filters?.status}&type=${filters?.type}&sort=${filters?.sort ?? ""}`,
      ignoreCache,
    ).then((data) => {
      setQuotes(data);
      setLoading(false);
      if (ignoreCache) {
        setFilters((prevState) => {
          return { ...prevState, ignoreCache: false };
        });
      }
    });
  }, 200);

  useEffect(() => {
    getQuotesDebounced();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getQuotesDebounced();
  }, [filters]);

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
