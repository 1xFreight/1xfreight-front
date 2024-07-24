"use client";

import { useState } from "react";

enum TypeFilterEnum {
  ALL = "ALL",
  FTL = "FTL",
  LTL = "LTL",
  FCL = "FCL",
  AIR = "AIR",
}

export default function TypeFilterComponent() {
  const [type, setType] = useState<TypeFilterEnum>(TypeFilterEnum.ALL);

  return (
    <div className={"quote-type-filter-selector"}>
      {(Object.keys(TypeFilterEnum) as Array<keyof typeof TypeFilterEnum>).map(
        (key) => (
          <div
            key={key}
            className={`type-selector ${type === key ? "active" : ""}`}
            onClick={() => setType(TypeFilterEnum[key])}
          >
            {key}
          </div>
        ),
      )}
    </div>
  );
}
