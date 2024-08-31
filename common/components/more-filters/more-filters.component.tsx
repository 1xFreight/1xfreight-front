"use client";

import FilterAlt from "@/public/icons/24px/filter-alt.svg";
import Cross from "@/public/icons/24px/cross.svg";
import { memo, useState } from "react";
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

  const applyFilters = () => {
    const newFilters: any = {};
    const pickupDate = document.getElementById(
      "filter-pickup-date",
    ) as HTMLInputElement;
    const dropDate = document.getElementById(
      "filter-drop-date",
    ) as HTMLInputElement;

    if (pickupDate.value) {
      newFilters.pickupDate = pickupDate.value;
    }

    if (dropDate.value) {
      newFilters.dropDate = dropDate.value;
    }

    if (owners.length) {
      newFilters.owners = owners;
    }

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
      <div className={"more-filters"} onClick={() => setOpen(true)}>
        Filters
        <div>
          <FilterAlt />
        </div>
      </div>

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
              <button className={"apply"} onClick={() => applyFilters()}>
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
