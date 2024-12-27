import { disablePastDates, formatDate } from "@/common/utils/date.utils";
import Calendar from "@/public/icons/30px/calendar.svg";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import Cross from "@/public/icons/24px/cross.svg";

export default function DatePickRangeComponent({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  const [open, setOpen] = useState(false);
  const debouncedSetStartDate = useDebouncedCallback(
    (date: any) => setStartDate(date),
    300,
  );
  const debouncedSetEndDate = useDebouncedCallback(
    (date: any) => setEndDate(date),
    300,
  );

  const formatDateLocal = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Reusable function to set [startDate, endDate] for “Last X days” or “Last 1 year”
  const setLastDates = (days: number) => {
    const start = new Date();
    start.setDate(start.getDate() - (days - 1));
    setStartDate(formatDateLocal(start));
  };

  return (
    <div className={"date-pick-analytics"}>
      <button
        className={"open-date-pick-analytics"}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Calendar /> {!startDate && !endDate && "Pick a Date Range"}
        {startDate && "from " + formatDate(startDate)}{" "}
        {endDate && "till " + formatDate(endDate)}
      </button>

      {open && (
        <>
          <div
            className={"backdrop-pick-range"}
            onClick={() => setOpen(false)}
          ></div>

          <div className={"date-input-analytics"}>
            <div className={"close-modal"}>
              <h5>Pick a Date Range</h5>

              <div
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Cross />
              </div>
            </div>
            <div className={"date-input-analytics-wrapper"}>
              <h5>Start Date</h5>
              <input
                type={"date"}
                onChange={(ev) => debouncedSetStartDate(ev.target.value)}
                value={startDate}
              />
            </div>
            <div className={"date-input-analytics-wrapper"}>
              <h5>End Date</h5>
              {/* DisablePastDates return today date */}
              <input
                type={"date"}
                onChange={(ev) => debouncedSetEndDate(ev.target.value)}
                value={endDate}
              />
            </div>

            <div className={"last-days-buttons"}>
              <button onClick={() => setLastDates(7)}>Last 7 Days</button>
              <button onClick={() => setLastDates(30)}>Last 30 Days</button>
              <button onClick={() => setLastDates(90)}>Last 90 Days</button>
              <button onClick={() => setLastDates(180)}>Last 180 Days</button>
              <button onClick={() => setLastDates(365)}>Last 365 Days</button>
              <button
                className={"close-btn"}
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setOpen(false);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
