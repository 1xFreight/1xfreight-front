"use client";

import "./styles.css";
import StatusFilterDropdownComponent from "@/common/components/status-dropdown/status-filter-dropdown.component";
import MoreFiltersComponent from "@/common/components/more-filters/more-filters.component";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import RefreshComponent from "@/app/quotes/components/filters-panel/components/refresh.component";
import { memo, useEffect, useState } from "react";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
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
  const { setFilters } = useStore();

  useEffect(() => {
    setFilters({
      searchText,
    });
  }, [searchText]);

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

      {/*<StatusFilterDropdownComponent status={status} setStatus={setStatus} />*/}

      <MoreFiltersComponent />

      <SearchInputComponent
        width={"20rem"}
        placeholder={"Quote#, Pickup, Delivery, Reference..."}
        setSearch={setSearchDebounced}
      />

      <RefreshComponent />
    </div>
  );
}

export default memo(FiltersPanelComponent);
