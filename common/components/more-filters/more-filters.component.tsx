"use client";

import FilterAlt from "@/public/icons/24px/filter-alt.svg";
import Cross from "@/public/icons/24px/cross.svg";
import { memo, useState } from "react";
import SelectOwnerComponent from "@/common/components/more-filters/select-owner.component";
import "./styles.css";

function MoreFiltersComponent({ setFilters, filters }) {
  const [open, setOpen] = useState<boolean>(false);
  const [owners, setOwners] = useState<Array<any>>([]);

  const applyFilters = () => {
    const filters: any = {};
    const pickupDate = document.getElementById(
      "filter-pickup-date",
    ) as HTMLInputElement;
    const dropDate = document.getElementById(
      "filter-drop-date",
    ) as HTMLInputElement;

    if (pickupDate.value) {
      filters.pickupDate = pickupDate.value;
    }

    if (dropDate.value) {
      filters.dropDate = dropDate.value;
    }

    if (owners.length) {
      filters.owners = owners;
    }

    setFilters(filters);
    setOpen(false);
  };

  const removeFilters = () => {
    setFilters(null);
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
                  <input type={"date"} id={"filter-drop-date"} />
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
