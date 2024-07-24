"use client";

import { useState } from "react";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import ChevronDown from "@/public/icons/24px/chevron-down.svg";
import Checked from "@/public/icons/24px/checked-tick.svg";

export default function StatusFilterDropdownComponent() {
  const [status, setStatus] = useState<Array<QuoteStatusEnum>>([]);
  const [open, setOpen] = useState<boolean>(false);

  const isStatusSelected = (key) => {
    return status.find((st) => st === key);
  };

  const toggleStatus = (key) => {
    if (isStatusSelected(key)) {
      setStatus(status.filter((st) => st !== key));
    } else {
      setStatus([...status, key]);
    }
  };

  return (
    <div className={"status-dropdown"}>
      <div
        className={`status-filter-dropdown ${open ? "active" : ""}`}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        Filter by Status <ChevronDown />
      </div>

      {open && (
        <>
          <div className={"backdrop"} onClick={() => setOpen(false)}></div>

          <div className={"status-dropdown-menu fade-in-top"}>
            {(
              Object.keys(QuoteStatusEnum) as Array<
                keyof typeof QuoteStatusEnum
              >
            ).map((key) => (
              <div
                key={key}
                className={`item ${isStatusSelected(key) ? "active" : ""}`}
                onClick={() => toggleStatus(key)}
              >
                {key.toLowerCase()}

                <div>
                  <Checked />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
