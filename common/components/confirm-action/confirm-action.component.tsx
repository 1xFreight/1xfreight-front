"use client";

import "./styles.css";
import { memo } from "react";

function ConfirmActionComponent({
  title,
  action,
  id,
  open,
}: {
  title: string;
}) {
  return (
    <div className={"ca-wrapper"} id={id}>
      <div className={"ca-backdrop"}></div>
      <div className={"confirm-action"}>
        <div className={"ca-title"}>{title}</div>
        <div className={"ca-actions"}>
          <button
            onClick={() => {
              action();
              document.getElementById(id).style.display = "none";
            }}
          >
            Confirm
          </button>
          <button
            onClick={() => {
              document.getElementById(id).style.display = "none";
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ConfirmActionComponent);
