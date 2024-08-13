"use client";

import "./styles.css";
import StatusFilterDropdownComponent from "@/common/components/status-dropdown/status-filter-dropdown.component";
import MoreFiltersComponent from "@/common/components/more-filters/more-filters.component";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import RefreshComponent from "@/app/quotes/components/filters-panel/components/refresh.component";
import { useState } from "react";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";

export enum TypeFilterEnum {
  ALL = "ALL",
  FTL = "FTL",
  LTL = "LTL",
  FCL = "FCL",
  AIR = "AIR",
}

export default function FiltersPanelComponent() {
  const [type, setType] = useState<TypeFilterEnum>(TypeFilterEnum.ALL);
  const [status, setStatus] = useState<Array<QuoteStatusEnum>>([]);

  return (
    <div className={"quote-filter-panel"}>
      <TypeSelectorComponent
        type={type}
        setType={setType}
        typeEnum={TypeFilterEnum}
      />

      <StatusFilterDropdownComponent status={status} setStatus={setStatus} />

      <MoreFiltersComponent />

      <SearchInputComponent
        width={"20rem"}
        placeholder={"Quote#, BOL#, Pickup, Delivery..."}
      />

      <RefreshComponent />
    </div>
  );
}
