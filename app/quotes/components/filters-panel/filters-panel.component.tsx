import "./styles.css";
import TypeFilterComponent from "@/app/quotes/components/filters-panel/components/type-filter.component";
import StatusFilterDropdownComponent from "@/app/quotes/components/filters-panel/components/status-filter-dropdown.component";
import MoreFiltersComponent from "@/app/quotes/components/filters-panel/components/more-filters.component";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import RefreshComponent from "@/app/quotes/components/filters-panel/components/refresh.component";

export default function FiltersPanelComponent() {
  return (
    <div className={"quote-filter-panel"}>
      <TypeFilterComponent />

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
