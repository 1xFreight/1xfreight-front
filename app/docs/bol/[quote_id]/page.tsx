"use client";

import { useEffect, useState } from "react";
import { toShortId } from "@/common/utils/data-convert.utils";
import "./styles.css";
import PointOnMap from "@/public/icons/point-on-map.svg";

export default function ViewBOLPage({
  params,
}: {
  params: { quote_id: string };
}) {
  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {}, []);

  return (
    <div className={"bol-page"}>
      <div className={"container"}>
        <div className={"bol-page-title"}>
          <h2>BOL</h2>
          <h5>#{toShortId(params.quote_id)}</h5>
        </div>

        <div className={"bol"}>
          <div className={"bol-title"}>
            <h2>TRUCKING CO</h2>
            <h5>Master BOL/293123892</h5>
          </div>

          <div className={"locations"}>
            <div className={"pickup"}>
              <h3>Pickup</h3>

              <div className={"location-item"}>
                <PointOnMap />
                <h5>
                  Saints Peter and Paul Catholic Church, North Ellsworth Street,
                  Naperville, IL
                </h5>
                <h5>
                  Limited Access Fee, Notify Prior To Delivery, Inside Delivery
                </h5>
                <h5>August 27, 2024 1:00 AM</h5>
              </div>

              <div className={"location-item"}>
                <PointOnMap />
                <h5>
                  Sateen Alterations, Lonsdale Avenue, North Vancouver, BC,
                  Canada
                </h5>
                <h5>
                  Limited Access Fee, Notify Prior To Delivery, Inside Delivery
                </h5>
                <h5>August 27, 2024 1:00 AM</h5>
              </div>
            </div>

            <div className={"drop"}>
              <h3>Delivery</h3>

              <div className={"location-item"}>
                <PointOnMap />
                <h5>Sancerre Atlee Station, Atlee Road, Mechanicsville, VA</h5>
                <h5>
                  Limited Access Fee, Notify Prior To Delivery, Inside Delivery
                </h5>
                <h5>August 27, 2024 1:00 AM</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
