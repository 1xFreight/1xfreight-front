"use client";

import React, { useState } from "react";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import "../styles.css";
import { EquipmentsEnum } from "@/common/enums/equipments.enum";
import { ReferencesEnum } from "@/common/enums/references-number.enum";

export default function ReferenceItemsComponent({
  _default,
}: {
  _default?: any;
}) {
  const [itemsNumb, setItemsNumb] = useState<number>(
    _default?.references?.length ?? 1,
  );

  return (
    <div className={"reference-no-wrapper"}>
      {Array(itemsNumb)
        .fill(1)
        .map((x, index) => {
          let defType = null;
          let defNumber = null;

          if (_default?.references?.length) {
            defType = _default?.references[index]?.split("/")[0];
            defNumber = _default?.references[index]?.split("/")[1];
          }

          return (
            <div className={"reference-item"} key={`ref-item-${index}`}>
              <h5>PO/Reference No.</h5>

              <div>
                <select
                  name={`reference_type${index}`}
                  defaultValue={defType ?? "Unknown"}
                >
                  <option value={"Unknown"} disabled>
                    Choose an option
                  </option>
                  {Object.values(ReferencesEnum).map((ref, index) => (
                    <option key={ref + index} value={ref}>
                      {ref}
                    </option>
                  ))}
                </select>

                <input
                  type={"text"}
                  placeholder={"Set reference No."}
                  name={`reference_no${index}`}
                  defaultValue={defNumber}
                />
              </div>
            </div>
          );
        })}

      <div className={"reference-no-actions"}>
        <button
          onClick={() => (itemsNumb > 1 ? setItemsNumb(itemsNumb - 1) : "")}
          disabled={itemsNumb <= 1}
          className={"delete"}
          type={"button"}
        >
          Delete
        </button>

        <button
          onClick={() => (itemsNumb < 5 ? setItemsNumb(itemsNumb + 1) : "")}
          disabled={itemsNumb >= 5}
          className={"add"}
          type={"button"}
        >
          <PlusCircle />
          Add Reference No.
        </button>
      </div>
    </div>
  );
}
