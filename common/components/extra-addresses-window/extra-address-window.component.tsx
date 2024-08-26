import { QuoteAddressI } from "@/common/interfaces/quote-preview.interface";
import Arrow from "@/public/icons/20px/Arrow 2.svg";
import React from "react";
import "./styles.css";
import { formatDate } from "@/common/utils/date.utils";

interface ExtraAWI {
  stops: QuoteAddressI[];
}

function ExtraAddressWindowComponent({ stops }: ExtraAWI) {
  return (
    <div className={"extra-address-window"}>
      <h4>Stops</h4>

      <div className={"address-list location"}>
        {stops.map(({ address, date }, index) => (
          <div
            key={address + index}
            style={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
            }}
          >
            {index !== 0 && <Arrow />}

            <div className={"address"}>
              <div className={"main-text"}>{address}</div>

              <div className={"sub-text"}>{formatDate(date)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={"arrow-down"}></div>
    </div>
  );
}

export default React.memo(ExtraAddressWindowComponent);
