"use client";

import "./styles.css";
import TypeFilterComponent from "@/app/quotes/components/filters-panel/components/type-filter.component";
import StatusFilterDropdownComponent from "@/app/quotes/components/filters-panel/components/status-filter-dropdown.component";
import MoreFiltersComponent from "@/app/quotes/components/filters-panel/components/more-filters.component";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import RefreshComponent from "@/app/quotes/components/filters-panel/components/refresh.component";
import { useState } from "react";

enum TypeFilterEnum {
  ALL = "ALL",
  FTL = "FTL",
  LTL = "LTL",
  FCL = "FCL",
  AIR = "AIR",
}

export default function FiltersPanelComponent() {
  const [type, setType] = useState<TypeFilterEnum>(TypeFilterEnum.ALL);

  return (
    <div className={"quote-filter-panel"}>
      <TypeFilterComponent
        type={type}
        setType={setType}
        typeEnum={TypeFilterEnum}
      />

      <StatusFilterDropdownComponent />

      <MoreFiltersComponent />

      <SearchInputComponent
        width={"20rem"}
        placeholder={"Quote#, BOL#, Pickup, Delivery..."}
      />

      <RefreshComponent />
    </div>
  );
}
