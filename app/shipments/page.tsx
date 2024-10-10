"use client";

import "./styles.css";
import FiltersPanelComponent from "@/app/shipments/components/filters-panel.component";
import Excel from "@/public/icons/20px/excel 1.svg";
import ShipmentsTableComponent from "@/app/shipments/components/shipments-table.component";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import QuotesTableComponent from "@/app/quotes/components/quotes-table/quotes-table.component";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getShipmentsDebounced = useDebouncedCallback(() => {
    getWithAuth(
      `/quote/shipments?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}`,
    ).then((data) => {
      setShipments(data);
      setLoading(false);
    });
  }, 350);

  useEffect(() => {
    setLoading(true);
    getShipmentsDebounced();
  }, [page]);

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
