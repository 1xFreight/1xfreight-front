"use client";

import FilterAlt from "@/public/icons/24px/filter-alt.svg";
import Cross from "@/public/icons/24px/cross.svg";
import { useState } from "react";
import SelectOwnerComponent from "@/app/quotes/components/filters-panel/components/select-owner.component";

export default function MoreFiltersComponent() {
  const [open, setOpen] = useState<boolean>(false);

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
                  <input type={"date"} id={"filter-pickup-date"} />
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

                <SelectOwnerComponent />
              </div>
            </div>

            <div className={"actions"}>
              <button className={"remove"}>remove filters</button>
              <button className={"apply"}>apply filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
