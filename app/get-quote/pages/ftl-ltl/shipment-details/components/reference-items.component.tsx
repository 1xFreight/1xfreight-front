"use client";

import { useState } from "react";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";

export default function ReferenceItemsComponent() {
  const [itemsNumb, setItemsNumb] = useState<number>(1);

  return (
    <div className={"reference-no-wrapper"}>
      {Array(itemsNumb)
        .fill(1)
        .map((x, index) => (
          <div className={"reference-item"} key={`ref-item-${index}`}>
            <h5>
              PO/Reference No. <span>(optional)</span>
            </h5>

            <div>
              <select name={`reference_type${index}`} defaultValue={"0"}>
                <option value={"0"} disabled>
                  Choose an option
                </option>
                <option>Unknown</option>
                <option>Unknown</option>
              </select>

              <input
                type={"text"}
                placeholder={"Set reference No."}
                name={`reference_no${index}`}
              />
            </div>
          </div>
        ))}

      <div className={"reference-no-actions"}>
        <button
          onClick={() => (itemsNumb > 1 ? setItemsNumb(itemsNumb - 1) : "")}
          disabled={itemsNumb <= 1}
          className={"delete"}
        >
          Delete
        </button>

        <button
          onClick={() => (itemsNumb < 5 ? setItemsNumb(itemsNumb + 1) : "")}
          disabled={itemsNumb >= 5}
          className={"add"}
        >
          <PlusCircle />
          Add Reference No.
        </button>
      </div>
    </div>
  );
}
