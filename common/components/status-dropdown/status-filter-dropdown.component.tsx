"use client";

import { memo, useState } from "react";
import ChevronDown from "@/public/icons/24px/chevron-down.svg";
import Checked from "@/public/icons/24px/checked-tick.svg";
import "./styles.css";
import { clearText } from "@/common/utils/data-convert.utils";
import Cross from "@/public/icons/24px/cross.svg";

enum QuoteStatusEnum {
  BOOKED = "booked",
  DISPATCHED = "dispatched",
  AT_PICKUP = "at_pickup",
  IN_TRANSIT = "in_transit",
  AT_DESTINATION = "at_destination",
  DELIVERED = "delivered",
}

function StatusFilterDropdownComponent({ status, setStatus }: any) {
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
      <button
        className={`status-filter-dropdown ${open || status.length ? "active" : ""}`}
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <span className="status-filter-text">
          {status.length
            ? status.map((status) => clearText(status)).join(",")
            : "Filter by Status"}
        </span>
        {status.length ? (
          <div
            className={"status-svg cross"}
            onClick={(e) => {
              e.stopPropagation();
              setStatus([]);
              setOpen(false);
            }}
          >
            <Cross width={16} height={16} />
          </div>
        ) : (
          <div className={"status-svg"}>
            <ChevronDown />
          </div>
        )}
      </button>

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
                className={`item ${isStatusSelected(QuoteStatusEnum[key]) ? "active" : ""}`}
                onClick={() => toggleStatus(QuoteStatusEnum[key])}
              >
                {clearText(QuoteStatusEnum[key])}

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

export default memo(StatusFilterDropdownComponent);
