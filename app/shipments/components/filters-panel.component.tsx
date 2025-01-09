"use client";

import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import { TypeFilterEnum } from "@/app/quotes/components/filters-panel/filters-panel.component";
import { memo, useEffect, useState } from "react";
import StatusFilterDropdownComponent from "@/common/components/status-dropdown/status-filter-dropdown.component";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import MoreFiltersComponent from "@/common/components/more-filters/more-filters.component";
import Excel from "@/public/icons/20px/excel 1.svg";
import { useDebouncedCallback } from "use-debounce";
import useStore from "@/common/hooks/use-store.context";

export enum CurrencyFilterEnum {
  ALL = "ALL",
  USD = "USD",
  CAD = "CAD",
  MXN = "MXN",
}

function FiltersPanelComponent({ totalQuotes }) {
  const [type, setType] = useState<keyof typeof TypeFilterEnum>(
    TypeFilterEnum.ALL,
  );
  const [status, setStatus] = useState<Array<QuoteStatusEnum>>([]);
  const [searchText, setSearchText] = useState("");
  const { setFilters, filters } = useStore();
  const [currency, setCurrency] = useState(CurrencyFilterEnum.ALL);

  useEffect(() => {
    const formattedType = type === TypeFilterEnum.ALL ? "" : type;

    setFilters({
      ...filters,
      searchText,
      type: formattedType,
      status: JSON.stringify(status),
      currency: currency != CurrencyFilterEnum.ALL ? currency : "",
    });
  }, [searchText, type, status, currency]);

  useEffect(() => {
    const formattedType = type === TypeFilterEnum.ALL ? "" : type;

    setFilters({
      sort: "{}",
      searchText,
      type: formattedType,
      status: JSON.stringify(status),
      currency: "",
    });
  }, []);

  const setSearchDebounced = useDebouncedCallback(
    (text) => setSearchText(text),
    300,
  );

  return (
    <div className={"shipments-filters-panel"}>
      <div>
        <TypeSelectorComponent
          typeEnum={TypeFilterEnum}
          type={type}
          setType={setType}
        />

        <TypeSelectorComponent
          typeEnum={CurrencyFilterEnum}
          type={currency}
          setType={setCurrency}
        />

        <StatusFilterDropdownComponent status={status} setStatus={setStatus} />

        <MoreFiltersComponent />

        <SearchInputComponent
          width={"20rem"}
          placeholder={"Quote#, BOL#, Pickup, Delivery..."}
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
      </div>

      <div>
        <h6>{totalQuotes ? totalQuotes + " Shipments" : ""} </h6>

        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/quote/shipments/export?searchText=${filters?.searchText ?? ""}&pickupDate=${filters?.pickupDate ?? ""}&dropDate=${filters?.dropDate ?? ""}&owner=${filters?.owners?.map(({ _id }) => _id) || []}&status=${filters?.status}&type=${filters?.type}&sort=${filters?.sort ?? ""}&currency=${filters?.currency ?? ""}`}
          style={{
            height: "100%",
          }}
        >
          <button className={"excel-export"}>
            <Excel /> Export to Excel
          </button>
        </a>
      </div>
    </div>
  );
}

export default memo(FiltersPanelComponent);
