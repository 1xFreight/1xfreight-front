"use client";

import Refresh from "@/public/icons/24px/refresh-right.svg";
import { useEffect, useState } from "react";
import useStore from "@/common/hooks/use-store.context";

export default function RefreshComponent() {
  const { filters, setFilters } = useStore();
  const [time, setTime] = useState("");

  function getFormattedTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes: number | string = now.getMinutes();

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    setTime(getFormattedTime);
  }, [filters]);

  return (
    <div className={"refresh"}>
      <p>Last refreshed at: {time}</p>

      <button
        className={"refresh-btn"}
        onClick={() => setFilters({ ...filters })}
      >
        <Refresh />
      </button>
    </div>
  );
}
