"use client";

import "./styles.css";
import MoreFiltersComponent from "@/common/components/more-filters/more-filters.component";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import RefreshComponent from "@/app/quotes/components/filters-panel/components/refresh.component";
import { memo, useEffect, useState } from "react";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";

export enum TypeFilterEnum {
  ALL = "ALL",
  FTL = "FTL",
  LTL = "LTL",
  FCL = "FCL",
  AIR = "AIR",
}

export enum StatusFilterEnum {
  ALL = "ALL",
  REQUESTED = "REQUESTED",
  CANCELED = "CANCELED",
}

function FiltersPanelComponent() {
  const [type, setType] = useState<TypeFilterEnum>(TypeFilterEnum.ALL);
  const [status, setStatus] = useState<StatusFilterEnum>(StatusFilterEnum.ALL);
  const [searchText, setSearch] = useState("");
  const { setFilters, filters } = useStore();

  useEffect(() => {
    const formattedType = type === TypeFilterEnum.ALL ? "" : type;
    const formattedStatus = status === StatusFilterEnum.ALL ? "" : status;

    setFilters({
      ...filters,
      searchText,
      type: formattedType,
      status: formattedStatus,
    });
  }, [searchText, type, status]);

  useEffect(() => {
    const formattedType = type === TypeFilterEnum.ALL ? "" : type;
    const formattedStatus = status === StatusFilterEnum.ALL ? "" : status;

    setFilters({
      sort: "{}",
      searchText,
      type: formattedType,
      status: formattedStatus,
    });
  }, []);

  const setSearchDebounced = useDebouncedCallback(
    (text) => setSearch(text),
    300,
  );

  return (
    <div className={"quote-filter-panel"}>
      <TypeSelectorComponent
        type={type}
        setType={setType}
        typeEnum={TypeFilterEnum}
      />

      <TypeSelectorComponent
        type={status}
        setType={setStatus}
        typeEnum={StatusFilterEnum}
      />

      <MoreFiltersComponent />

      <SearchInputComponent
        width={"20rem"}
        placeholder={"Quote#, Pickup, Delivery, Reference..."}
        setSearch={setSearchDebounced}
      />

      <button
        className={"remove-filters"}
        onClick={() => setFilters({ ...filters, sort: "{}" })}
        style={{
          display: filters?.sort && filters?.sort != "{}" ? "block" : "none",
        }}
      >
        Remove Sort
      </button>

      <RefreshComponent />
    </div>
  );
}

export default memo(FiltersPanelComponent);
