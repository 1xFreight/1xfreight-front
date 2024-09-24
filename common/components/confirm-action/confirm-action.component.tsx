"use client";

import "./styles.css";
import { memo, useEffect } from "react";
import Warning from "@/public/icons/circle-wavy-warning.svg";
import Cross from "@/public/icons/24px/cross.svg";

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
      <div className={"confirm-action"} id={id + id}>
        <div className={"icon"}>
          <Warning />
        </div>
        <div
          className={"close"}
          onClick={() => {
            document.getElementById(id).style.display = "none";
          }}
        >
          <Cross />
        </div>
        <div className={"ca-title"}>{title}</div>
        {/*<h6>This action is irreversible</h6>*/}
        <div className={"ca-actions"}>
          <button
            onClick={() => {
              document.getElementById(id).style.display = "none";
            }}
            className={"cancel"}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              action();
              document.getElementById(id).style.display = "none";
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ConfirmActionComponent);
