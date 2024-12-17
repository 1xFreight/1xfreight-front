"use client";

import { useDebouncedCallback } from "use-debounce";
import { Fragment, useEffect, useState } from "react";

import "./styles.css";
import Truck from "@/public/icons/truck.svg";
import { clearText } from "@/common/utils/data-convert.utils";
import numberCommaFormat from "@/common/utils/number-comma.utils";

export default function ExtraBottomMenuComponent({ status, request }) {
  const [showMenuStatus, setShowMenuStatus] = useState(false);
  const [showMenuRequest, setShowMenuRequest] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const animationTopOffsetPX = 100;
    const animation2TopOffsetPX = 300;

    if (scrollPosition >= animationTopOffsetPX) {
      setShowMenuStatus(true);
    }

    if (scrollPosition < animationTopOffsetPX) {
      setShowMenuStatus(false);
    }

    if (scrollPosition >= animation2TopOffsetPX) {
      setShowMenuRequest(true);
    }

    if (scrollPosition < animation2TopOffsetPX) {
      setShowMenuRequest(false);
    }
  };

  const debouncedHandleScroll = useDebouncedCallback(() => handleScroll(), 1);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return (
    <div className={"extra-bottom-menu"}>
      <div className={"status-div-wrapper"}>
        <div
          className={"status-div"}
          style={{
            width: showMenuStatus ? "9rem" : "0rem",
            minWidth: showMenuStatus ? "9rem" : "0rem",
            opacity: showMenuStatus ? "1" : "0",
            borderRadius: showMenuStatus ? "0.75rem" : "2rem",
            transition: "250ms ease-in-out",
          }}
        >
          {clearText(status)}
        </div>
      </div>
      <div
        className={"request-extra-menu"}
        style={{
          opacity: showMenuRequest ? "1" : "0",
          transition: "250ms linear",
        }}
      >
        <div className={"request-amount"}>
          ${numberCommaFormat(request?.amount)} {request?.currency}
        </div>
        <div className={"request-partner"}>{request?.carrierName}</div>
        <div className={"request-partner"}>{request?.transit_time} days</div>
      </div>
      <div className={"cancel-load-div-wrapper"}>
        <div
          className={"cancel-load-div"}
          onClick={() => {
            document.getElementById("confirm-cancel-load").style.display =
              "flex";
          }}
          style={{
            width: showMenuStatus ? "9rem" : "0rem",
            opacity: showMenuStatus ? "1" : "0",
            borderRadius: showMenuStatus ? "0.75rem" : "2rem",
            transition: "250ms ease-in-out",
          }}
        >
          cancel load
        </div>
      </div>
    </div>
  );
}
