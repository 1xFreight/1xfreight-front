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

  // Reusable function to set [startDate, endDate] for “X days” or “1 year”
  const setLastDates = (days: number) => {
    const start = new Date();
    start.setDate(start.getDate() - (days - 1));
    setStartDate(formatDateLocal(start));
    setEndDate("");
  };

  return (
    <div className={"date-pick-analytics"}>
      <div className={"date-input-analytics"}>
        <div className={"date-input-analytics-wrapper"}>
          {/*<h5>Start Date</h5>*/}
          <Calendar />
          <input
            type={"date"}
            onChange={(ev) => debouncedSetStartDate(ev.target.value)}
            value={startDate}
            className={startDate ? "" : "hide-date start"}
          />
        </div>
        <div className={"date-input-analytics-wrapper"}>
          {/*<h5>End Date</h5>*/}
          <Calendar />
          <input
            type={"date"}
            onChange={(ev) => debouncedSetEndDate(ev.target.value)}
            value={endDate}
            className={endDate ? "" : "hide-date end"}
          />
        </div>

        <div className={"last-days-buttons"}>
          <button onClick={() => setLastDates(7)}>7 Days</button>
          <button onClick={() => setLastDates(30)}>30 Days</button>
          <button onClick={() => setLastDates(90)}>90 Days</button>
          <button onClick={() => setLastDates(180)}>180 Days</button>
          <button onClick={() => setLastDates(365)}>365 Days</button>
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
    </div>
  );
}
