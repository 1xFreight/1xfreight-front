import "./styles.css";

import Calendar from "@/public/icons/30px/calendar.svg";
import Clock from "@/public/icons/30px/clock.svg";
import Cog from "@/public/icons/30px/cog.svg";
import Archive from "@/public/icons/30px/archive.svg";
import DollarSign from "@/public/icons/30px/dollar-sign.svg";
import Gym from "@/public/icons/30px/gym.svg";
import Database from "@/public/icons/30px/database.svg";
import EqTruck from "@/public/icons/30px/eq-truck.svg";
import Group from "@/public/icons/30px/group.svg";
import StickyNotes from "@/public/icons/30px/sticky-notes-2.svg";
import OpenBox from "@/public/icons/30px/open-box.svg";
import Routes from "@/public/icons/30px/routes.svg";
import Biohazard from "@/public/icons/30px/hazardous-material.svg";
import TempUp from "@/public/icons/30px/temperature-arrow-up(1).svg";
import TempDown from "@/public/icons/30px/temperature-arrow-down(1).svg";
import Checked from "@/public/icons/24px/checked-tick.svg";
import {
  clearText,
  extractAccesorialsShipment,
  extractAccessorialsFromObj,
  extractReferenceNo,
} from "@/common/utils/data-convert.utils";
import { formatDate, formatTime } from "@/common/utils/date.utils";
import { ShippingHoursEnum } from "@/app/get-quote/components/location-ftl-ltl-form/location-form.component";
import React from "react";
import QuoteItemsTableComponent from "@/app/components/quote-details/quote-items-table.component";

function QuoteFtlComponent({ quote }: any) {
  const reference = quote?.references;
  const pickup =
    quote?.addresses?.filter(({ address_type }) => address_type === "pickup") ??
    quote?.pickup;
  const drop =
    quote?.addresses?.filter(({ address_type }) => address_type === "drop") ??
    quote?.drop;
  const details = quote?.details ? quote?.details[0] : quote?.shipment_details;
  const items = quote?.items?.length ? quote.items : details?.items;

  return (
    <div className={"quote-ftl"}>
      <div className={"title"}>
        <h2>QUOTE DETAILS</h2>

        {/*<h3>{}</h3>*/}
      </div>

      <div className={"details-wrapper"}>
        <div>
          <Group />
          <h4>Type: </h4>
          <h3>{quote?.type}</h3>
        </div>

        {!!quote?.equipments?.length && (
          <div>
            <EqTruck />
            <h4>Equipment: </h4>
            <h3>{quote?.equipments?.join(",")}</h3>
          </div>
        )}

        {reference &&
          reference.map((ref, index) => (
            <div key={ref}>
              <span>{index + 1}</span>
              <h4>PO/Reference No: </h4>
              <h3>{ref}</h3>
            </div>
          ))}
      </div>

      <div className={"locations"}>
        <div className={"location-title"}>
          <div>
            <Routes />
            <h4>Locations</h4>
          </div>
        </div>

        <div className={`locations-wrapper`}>
          {pickup &&
            pickup.map((location, index) => {
              return (
                <div
                  className={`location-item  ${location.arrival_date ? "carrierArrived" : ""}`}
                  key={location.address + index}
                >
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      width: "7rem",
                    }}
                  >
                    {location?.address_type?.toUpperCase()}{" "}
                    {pickup.length > 1 ? index + 1 : ""}
                  </h3>

                  <div
                    className={`location-circle ${location.arrival_date ? "green-circle" : ""}`}
                  >
                    {location.arrival_date ? <Checked /> : ""}
                    <div className={"circle-line"}></div>
                  </div>

                  <div className={"location-info"}>
                    <h3>{location.address}</h3>

                    {(location.date || location.arrival_date) && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Calendar />
                        <h4>Date:</h4>
                        <h3
                          style={{
                            borderLeft: "0.1rem solid #ECECECFF",
                            paddingLeft: "0.5rem",
                            opacity: `${location.arrival_date ? "0.7" : "1"}`,
                          }}
                        >
                          {formatDate(location.date)}
                          {ShippingHoursEnum[location.shipping_hours]
                            ? "   ," +
                              ShippingHoursEnum[location.shipping_hours]
                            : ""}

                          <span
                            className={`arrival-text-span ${location?.arrival_status === "late" ? "late" : ""}`}
                          >
                            {formatDate(location.arrival_date)}
                          </span>
                        </h3>
                      </div>
                    )}

                    {(location.time_start || location.arrival_time) && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Clock />
                        <h4>Time:</h4>
                        <h3
                          style={{
                            borderLeft: "0.1rem solid #ECECECFF",
                            paddingLeft: "0.5rem",
                            opacity: `${location.arrival_date ? "0.7" : "1"}`,
                            // whiteSpace: "nowrap",
                          }}
                        >
                          {location.time_start}
                          {location.time_end ? " - " + location.time_end : ""}

                          <span className={"arrival-text-span"}>
                            {formatTime(location.arrival_time)}
                          </span>
                        </h3>
                      </div>
                    )}

                    {!!location.notes && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <StickyNotes />
                          <h4>Notes:</h4>
                        </div>
                        <h3>{location.notes}</h3>
                      </div>
                    )}

                    {!!location.accessorials?.length && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Cog />
                        <h4>Accessorials:</h4>
                        <h3>{location.accessorials?.join(", ")}</h3>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          {drop &&
            drop.map((location, index) => {
              return (
                <div
                  className={`location-item  ${location.arrival_date ? "carrierArrived" : ""}`}
                  key={location.address + index}
                >
                  <h3
                    style={{
                      whiteSpace: "nowrap",
                      width: "7rem",
                    }}
                  >
                    {location?.address_type?.toUpperCase()}{" "}
                    {drop.length > 1 ? index + 1 : ""}
                  </h3>

                  <div
                    className={`location-circle ${location.arrival_date ? "green-circle" : ""}`}
                  >
                    {location.arrival_date ? <Checked /> : ""}
                    <div className={"circle-line"}></div>
                  </div>

                  <div className={"location-info"}>
                    <h3>{location.address}</h3>

                    {(location.date || location.arrival_date) && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Calendar />
                        <h4>Date:</h4>
                        <h3
                          style={{
                            borderLeft: "0.1rem solid #ECECECFF",
                            paddingLeft: "0.5rem",
                            opacity: `${location.arrival_date ? "0.7" : "1"}`,
                          }}
                        >
                          {formatDate(location.date)}
                          {ShippingHoursEnum[location.shipping_hours]
                            ? "   ," +
                              ShippingHoursEnum[location.shipping_hours]
                            : ""}

                          <span
                            className={`arrival-text-span ${location?.arrival_status === "late" ? "late" : ""}`}
                          >
                            {formatDate(location.arrival_date)}
                          </span>
                        </h3>
                      </div>
                    )}

                    {(location.time_start || location.arrival_time) && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Clock />
                        <h4>Time:</h4>
                        <h3
                          style={{
                            borderLeft: "0.1rem solid #ECECECFF",
                            paddingLeft: "0.5rem",
                            opacity: `${location.arrival_date ? "0.7" : "1"}`,
                          }}
                        >
                          {location.time_start}
                          {location.time_end ? " - " + location.time_end : ""}

                          <span className={"arrival-text-span"}>
                            {formatTime(location.arrival_time)}
                          </span>
                        </h3>
                      </div>
                    )}

                    {!!location.notes && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <StickyNotes />
                          <h4>Notes:</h4>
                        </div>
                        <h3>{location.notes}</h3>
                      </div>
                    )}

                    {!!location.accessorials?.length && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Cog />
                        <h4>Accessorials:</h4>
                        <h3>{location.accessorials?.join(", ")}</h3>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        {!!items && <QuoteItemsTableComponent items={items} />}

        <div className={"details-wrapper"}>
          {!!details?.packing_method && (
            <div>
              <Database />
              <h4>Packing method: </h4>
              <h3
                style={{
                  textTransform: "capitalize",
                }}
              >
                {clearText(details?.packing_method)}
              </h3>
            </div>
          )}

          {!!details?.packing_type && (
            <div>
              <Archive />
              <h4>Packing type: </h4>
              <h3>{details?.packing_type}</h3>
            </div>
          )}

          {!!details?.commodity && (
            <div>
              <OpenBox />
              <h4>Commodity: </h4>
              <h3>{details?.commodity}</h3>
            </div>
          )}

          {!!details?.weight &&
            !!details?.weight_unit &&
            !!details?.quantity && (
              <div>
                <Gym />
                <h4>Weight: </h4>
                <h3>
                  {details?.weight +
                    " " +
                    details?.weight_unit +
                    ", " +
                    details?.quantity +
                    " units"}
                </h3>
              </div>
            )}

          <div>
            <DollarSign />
            <h4>Goods value: </h4>
            <h3>${details?.goods_value}.00</h3>
          </div>

          {!!details?.accessorials?.length && (
            <div>
              <Cog />
              <h4>Accessorials: </h4>
              <h3>{details?.accessorials?.join(", ")}</h3>
            </div>
          )}

          {details?.min_temp && details?.max_temp && (
            <>
              <div className={"temp-reefer"}>
                <TempUp />
                <h4>Max Temp: </h4>
                <h3>{details?.max_temp + " "}°F</h3>
              </div>

              <div className={"temp-reefer"}>
                <TempDown />
                <h4>Min Temp: </h4>
                <h3>{details?.min_temp + " "}°F</h3>
              </div>
            </>
          )}

          {!!quote?.load_number && (
            <div>
              <OpenBox />
              <h4>Load numbers: </h4>
              <h3>{quote?.load_number}</h3>
            </div>
          )}
        </div>

        {details?.hazardous_goods && (
          <div className={"hazard-warning"}>
            <Biohazard />

            <div className={"info"}>
              <h3>This shipment contains hazardous commodities!</h3>

              <div>
                <h4>UN: {quote?.shipment?.un_id_number}</h4>
                <h4>
                  Emergency Contact: {quote?.shipment?.emergency_name},{" "}
                  {quote?.shipment?.emergency_phone1}{" "}
                  {quote?.shipment?.emergency_phone2}
                </h4>
              </div>
            </div>
          </div>
        )}

        {!!details?.notes && (
          <div className={"special-instructions"}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <StickyNotes />
              <h4>Special instructions:</h4>
            </div>

            <h3>{details.notes}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(QuoteFtlComponent);
