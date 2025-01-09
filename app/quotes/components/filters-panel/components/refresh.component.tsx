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
    <div
      style={{
        display: "flex",
        gap: "2.25rem",
        alignItems: "center",
        marginLeft: "auto",
      }}
    >
      <p>Last refreshed at: {time}</p>

      <button
        style={{
          width: "3rem",
          height: "3rem",
          background: "white",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0.65rem",
          display: "flex",
        }}
        onClick={() => setFilters({ ...filters, ignoreCache: true })}
      >
        <Refresh />
      </button>
    </div>
  );
}
