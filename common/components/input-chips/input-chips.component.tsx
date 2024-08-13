"use client";

import Cross from "@/public/icons/24px/cross.svg";
import React, { useState } from "react";
import "./styles.css";
export default function InputChipsComponent() {
  const [list, setList] = useState([]);

  const removeItem = (email: string) => {
    setList(list.filter((em) => em !== email));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (event.target.value) {
        if (event.target.value) setList([...list, event.target.value]);
        event.target.value = "";
      }
    }
  };

  return (
    <div className={"input-chips-wrapper"}>
      {list &&
        list.map((email, index) => (
          <div key={email + index} className={"chip-item"}>
            {email}

            <div onClick={() => removeItem(email)}>
              <Cross />
            </div>
          </div>
        ))}
      <input
        type={"text"}
        className={"chip-input"}
        placeholder={"Type here..."}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
