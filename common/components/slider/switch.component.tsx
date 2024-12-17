"use client";

import "./styles.css";
import { useEffect, useState } from "react";

interface SliderComponentI {
  defaultState?: boolean;
  inputName: string;
}

export default function SwitchComponent({
  defaultState,
  inputName,
  onClick,
}: SliderComponentI) {
  const [active, setActive] = useState<boolean>(defaultState || false);

  useEffect(() => {
    if (typeof defaultState === "undefined") return;

    setActive(defaultState);
  }, [defaultState]);

  return (
    <>
      <div
        className={`default-slider-wrapper ${active ? "active" : ""}`}
        onClick={(event) => {
          const newState = !active;
          setActive(newState);
          onClick ? onClick(newState) : "";
        }}
      >
        <div className={"slider-thumb"}></div>
      </div>
      <input
        type={"text"}
        style={{
          display: "none",
        }}
        value={active.toString()}
        name={inputName}
        readOnly
        id={inputName}
      />
    </>
  );
}
