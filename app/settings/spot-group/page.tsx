"use client";

import SearchInputComponent from "@/common/components/search-input/search-input.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import "@/app/get-quote/pages/team-members/styles.css";
import "./styles.css";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import SpotTableComponent from "@/app/settings/components/spot-table.component";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";
import AddEditModalComponent from "@/app/settings/spot-group/components/add-edit-modal.component";

export default function SpotSettingsPage() {
  const [open, setOpen] = useState<boolean>(false);
  const [spotGroups, setSpotGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carriers, setCarriers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getCarriersDebounced = useDebouncedCallback((searchText = null) => {
    getWithAuth(`/carrier?searchText=${searchText ?? ""}&limit=5`).then(
      (data) => {
        setCarriers(data.carriers);
        setLoading(false);
      },
    );
  }, 350);

  const getSpotGroupsDebounced = useDebouncedCallback((ignoreCache = false) => {
    getWithAuth(
      `/carrier/spot?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${search ?? ""}`,
      ignoreCache,
    ).then((data) => {
      setSpotGroups(data);
      setLoading(false);
    });
  }, 350);

  useEffect(() => {
    getSpotGroupsDebounced();
  }, [page, search]);

  useEffect(() => {
    if (open && !carriers.length) {
      getCarriersDebounced();
    }
  }, [open]);

  const setSearchDebounced = useDebouncedCallback(
    (text) => setSearch(text),
    300,
  );

  return (
    <div className={"spot-group-page"}>
      <h2>Spot Group Emails</h2>

      <div className={"spot-group-filters"}>
        <div>
          <SearchInputComponent
            setSearch={setSearchDebounced}
            placeholder={"Search tags..."}
            width={"20rem"}
          />
        </div>

        <button onClick={() => setOpen(true)} className={"variant2"}>
          <PlusCircle /> Add group
        </button>
      </div>

      <div className={"tm-wrapper"}>
        {loading ? (
          <Loading2Component />
        ) : (
          <>
            <SpotTableComponent members={spotGroups?.spots} />
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
                pages={spotGroups?.totalSpot}
              />
            </div>
          </>
        )}
      </div>
      <AddEditModalComponent
        open={open}
        setOpen={setOpen}
        getCarriersDebounced={getCarriersDebounced}
        getSpotGroupsDebounced={getSpotGroupsDebounced}
        carriers={carriers}
      />
    </div>
  );
}
