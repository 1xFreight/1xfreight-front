"use client";

import FilterAlt from "@/public/icons/24px/filter-alt.svg";
import Cross from "@/public/icons/24px/cross.svg";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import SelectOwnerComponent from "@/common/components/more-filters/select-owner.component";
import "./styles.css";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { paginationConfig } from "@/common/config/pagination.config";

function MoreFiltersComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const [owners, setOwners] = useState<Array<any>>([]);
  const { filters, setFilters } = useStore();
  const isAnyFiltersSelected = useMemo(
    () => !!(filters.pickupDate || filters?.dropDate || filters?.owners),
    [filters],
  );

  const applyFilters = () => {
    const newFilters: any = {};
    const pickupDate = document.getElementById(
      "filter-pickup-date",
    ) as HTMLInputElement;
    const dropDate = document.getElementById(
      "filter-drop-date",
    ) as HTMLInputElement;

    newFilters.pickupDate = pickupDate.value ?? null;
    newFilters.dropDate = dropDate.value ?? null;
    newFilters.owners = owners.length ? owners : null;

    setFilters({ ...filters, ...newFilters });
    setOpen(false);
  };

  const removeFilters = () => {
    setFilters({ ...filters, pickupDate: null, dropDate: null, owners: null });
    setOwners([]);
    setOpen(false);
  };

  return (
    <div>
      <button
        className={`more-filters ${isAnyFiltersSelected ? "selected" : ""}`}
        onClick={() => setOpen(true)}
      >
        Filters
        {isAnyFiltersSelected ? (
          <div
            className={"more-filters-svg cross"}
            onClick={(e) => {
              e.stopPropagation();
              removeFilters();
              setOpen(false);
            }}
          >
            <Cross width={16} height={16} />
          </div>
        ) : (
          <div className={"more-filters-svg"}>
            <FilterAlt />{" "}
          </div>
        )}
      </button>

      {open && (
        <div className={"more-filters-modal"}>
          <div className={"backdrop"} onClick={() => setOpen(false)}></div>

          <div className={"modal fade-in-top"}>
            <div className={"header"}>
              <h3>Filters</h3>

              <div onClick={() => setOpen(false)}>
                <Cross />
              </div>
            </div>

            <div className={"body"}>
              <div className={"item"}>
                <h5>Pickup Date</h5>

                <div className={"date-input"}>
                  <input
                    type={"date"}
                    id={"filter-pickup-date"}
                    defaultValue={filters?.pickupDate}
                  />
                </div>
              </div>

              <div className={"item"}>
                <h5>Drop Date</h5>

                <div className={"date-input"}>
                  <input
                    type={"date"}
                    id={"filter-drop-date"}
                    defaultValue={filters?.dropDate}
                  />
                </div>
              </div>

              <div className={"item"}>
                <h5>Owner</h5>

                <SelectOwnerComponent owners={owners} setOwners={setOwners} />
              </div>
            </div>

            <div className={"actions"}>
              <button className={"remove"} onClick={() => removeFilters()}>
                remove filters
              </button>
              <button
                className={"apply variant2"}
                onClick={() => applyFilters()}
              >
                apply filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(MoreFiltersComponent);
