"use client";

import React, { useState } from "react";
import "./styles.css";
interface TypeSelectorI {
  typeEnum: any;
  inputName: string;
  type;
  setType: any;
}

function TypeSelectorComponent({
  typeEnum,
  inputName,
  type,
  setType,
}: TypeSelectorI) {
  const [localType, setLocalType] = useState<keyof typeof typeEnum>(
    Object.keys(typeEnum)[0],
  );

  if (!type && !setType) {
    type = localType;
    setType = setLocalType;
  }

  return (
    <div className={"general-type-selector"}>
      {(Object.keys(typeEnum) as Array<keyof typeof typeEnum>).map(
        (key, index) => (
          <div
            key={index + "type-selector" + Object.keys(typeEnum).length}
            className={`type-selector ${type === key ? "active" : ""}`}
            onClick={() => setType(key)}
          >
            {typeEnum[key]}
          </div>
        ),
      )}
      <input
        type={"text"}
        style={{
          display: "none",
        }}
        value={type as string}
        onChange={() => {}}
        name={inputName}
      />
    </div>
  );
}

export default React.memo(TypeSelectorComponent);
