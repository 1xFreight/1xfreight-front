"use client";

import "./styles.css";
import FiltersPanelComponent from "@/app/shipments/components/filters-panel.component";
import ShipmentsTableComponent from "@/app/shipments/components/shipments-table.component";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useMemo, useState } from "react";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";
import useStore from "@/common/hooks/use-store.context";
import Link from "next/link";
import EmptyTableComponent from "@/common/components/empty-table.component";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { filters, setFilters } = useStore();

  const getShipmentsDebounced = useDebouncedCallback(() => {
    const ignoreCache = filters?.ignoreCache ?? false;

    getWithAuth(
      `/quote/shipments?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${filters?.searchText ?? ""}&pickupDate=${filters?.pickupDate ?? ""}&dropDate=${filters?.dropDate ?? ""}&owner=${filters?.owners?.map(({ _id }) => _id) || []}&status=${filters?.status}&type=${filters?.type}&sort=${filters?.sort ?? ""}&currency=${filters?.currency ?? ""}`,
      ignoreCache,
    ).then((data) => {
      setShipments(data);
      // setShipments([]);
      setLoading(false);
      if (ignoreCache) {
        setFilters((prevState) => {
          return { ...prevState, ignoreCache: false };
        });
      }
    });
  }, 200);

  useEffect(() => {
    setLoading(true);
    getShipmentsDebounced();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getShipmentsDebounced();
  }, [filters]);

  const getQuoteButton = (
    <Link href={"/get-quote"} prefetch>
      <button
        style={{
          width: "10rem",
          height: "3rem",
          borderRadius: "0.75rem",
        }}
        className={"variant2"}
      >
        GET QUOTE
      </button>
    </Link>
  );

  return (
    <div className={"shipments-page page"}>
      <div className={"container page-header"}>
        <h4 className={"title"}>Shipments</h4>
      </div>

      <div className={"container"}>
        <FiltersPanelComponent totalQuotes={shipments?.totalQuotes} />
      </div>

      <div className={"container"}>
        {loading ? (
          <Loading2Component />
        ) : !shipments?.quotes?.length ? (
          <div
            style={{
              width: "100%",
              height: "calc(100vh - 15rem)",
            }}
          >
            <EmptyTableComponent button={getQuoteButton} />
          </div>
        ) : (
          <>
            <ShipmentsTableComponent shipments={shipments?.quotes} />
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
                pages={shipments?.totalQuotes}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
