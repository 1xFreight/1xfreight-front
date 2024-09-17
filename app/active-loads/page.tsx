"use client";

import "./styles.css";
import QuotesTableComponent from "@/app/active-loads/components/quotes-table/quotes-table.component";
import { useEffect, useState } from "react";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { useDebouncedCallback } from "use-debounce";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";
import SearchInputComponent from "@/common/components/search-input/search-input.component";

export default function AvailableQuotes() {
  const [quotes, setQuotes] = useState();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getQuotesDebounced = useDebouncedCallback(() => {
    getWithAuth(
      `/quote/active-loads?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${search ?? ""}`,
    ).then((data) => {
      setQuotes(data);
      setLoading(false);
    });
  }, 700);

  useEffect(() => {
    setLoading(true);
    getQuotesDebounced();
  }, [page, search]);

  const setSearchDebounced = useDebouncedCallback(
    (text) => setSearch(text),
    400,
  );

  return (
    <div className={"av-quotes-page page"}>
      <div className={"container page-header"}>
        <h4 className={"title"}>Active Loads</h4>
      </div>

      <div className={"container filters-panel"}>
        <SearchInputComponent
          setSearch={setSearchDebounced}
          placeholder={"Search quotes..."}
        />
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
