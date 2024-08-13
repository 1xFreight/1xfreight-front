"use client";

import "./styles.css";
import { useState } from "react";

interface SliderComponentI {
  defaultState?: boolean;
  inputName: string;
}

export default function SliderComponent({
  defaultState,
  inputName,
}: SliderComponentI) {
  const [active, setActive] = useState<boolean>(defaultState || false);

  return (
    <>
      <div
        className={`default-slider-wrapper ${active ? "active" : ""}`}
        onClick={() => setActive((active) => !active)}
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
      />
    </>
  );
}
