import React, { useState } from "react";
import "./styles.css";
interface TypeSelectorI {
  typeEnum: any;
}

function TypeSelectorComponent({ typeEnum }: TypeSelectorI) {
  const [type, setType] = useState<keyof typeof typeEnum>(
    Object.keys(typeEnum)[0],
  );

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
    </div>
  );
}

export default React.memo(TypeSelectorComponent);
