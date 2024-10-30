"use client";

import "./styles.css";
import QuoteStatusComponent from "@/app/quotes/components/quotes-table/components/quote-status.component";
import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import Info from "@/public/icons/14px/info-circle.svg";
import QuoteActionButtonComponent from "@/app/quotes/components/quotes-table/components/action-button.component";
import { QuotePreviewI } from "@/common/interfaces/quote-preview.interface";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import { toShortId } from "@/common/utils/data-convert.utils";
import { formatDate, formatTime } from "@/common/utils/date.utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import Point from "@/public/icons/35px/map-marker.svg";
import Calendar from "@/public/icons/24px/calendar.svg";
import { filters } from "css-select";
import useStore from "@/common/hooks/use-store.context";
import QuoteTableHeader from "@/app/quotes/components/quotes-table/components/table-header.component";
import Arrow from "@/public/icons/40px/Arrow 1.svg";

interface QuotesTableI {
  rows: QuotePreviewI[];
}

export default function QuotesTableComponent({ rows }: QuotesTableI) {
  return (
    <>
      <div className={"quotes-table-placeholder"}></div>
      <div className={"quotes-table"}>
        <table>
          <thead>
            <QuoteTableHeader />
          </thead>
          <tbody id={"quotes-tbody fast-in-fast"}>
            {rows?.map(
              ({
                _id,
                status,
                addresses,
                currency,
                references,
                type,
                quote_type,
                details,
                equipments,
                bids,
              }) => {
                const pickupAddress = addresses.filter(
                  ({ address_type }) => address_type === "pickup",
                );
                const dropAddress = addresses.filter(
                  ({ address_type }) => address_type === "drop",
                );

                const pickupWithDate = pickupAddress.filter((address) =>
                  address.hasOwnProperty("date"),
                );

                const dropWithDate = dropAddress.filter((address) =>
                  address.hasOwnProperty("date"),
                );

                const shipment = details[0];
                const bidsNumber = bids?.length;
                const btnStatus =
                  status == QuoteStatusEnum.CANCELED
                    ? QuoteStatusEnum.CANCELED
                    : bidsNumber && bidsNumber > 0
                      ? QuoteStatusEnum.BOOKED
                      : QuoteStatusEnum.REQUESTED;

                let viewLink;

                switch (btnStatus) {
                  case "booked":
                    viewLink = `/quotes/${_id}`;
                    break;
                  case "canceled":
                    viewLink = `/quotes/view/${_id}`;
                    break;
                  case "requested":
                    viewLink = `/quotes/view/${_id}`;
                    break;
                }

                return (
                  <tr key={_id}>
                    <td>
                      <div className={"id-number"}>{toShortId(_id)}</div>
                      <QuoteStatusComponent status={status} />
                    </td>
                    <td>
                      <div className={"main-text"}>{type}</div>
                    </td>
                    <td className={"pickup"}>
                      <div className={"location-styling"}>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <div className={"location main-text"}>
                            {pickupAddress[0]?.partial_address ??
                              pickupAddress[0]?.address}

                            {pickupAddress.length >= 2 && (
                              <>
                                <div className={"extra-address"}>
                                  +{pickupAddress.length - 1}
                                  <Info />
                                  <ExtraAddressWindowComponent
                                    stops={pickupAddress}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className={"arrow-styling"}>
                          <Arrow />
                        </div>
                      </div>
                      <div className={"sub-text"}>
                        {pickupAddress[0]?.company_name}
                      </div>
                    </td>
                    <td className={"drop"}>
                      <div className={"location-styling"}>
                        <div
                          style={{
                            width: "100%",
                          }}
                        >
                          <div className={"location main-text"}>
                            {dropAddress[0]?.partial_address ??
                              dropAddress[0]?.address}

                            {dropAddress.length >= 2 && (
                              <>
                                <div className={"extra-address"}>
                                  +{dropAddress.length - 1}
                                  <Info />
                                  <ExtraAddressWindowComponent
                                    stops={dropAddress}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={"sub-text"}>
                        {dropAddress[0]?.company_name}
                      </div>
                    </td>
                    <td>
                      {pickupWithDate.length >= 1 && (
                        <>
                          <div
                            className={"main-text tooltip"}
                            style={{
                              cursor: "pointer",
                              minWidth: "6rem",
                            }}
                          >
                            <div
                              className={"main-text"}
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {formatDate(pickupWithDate[0].date)}
                            </div>
                            <div
                              className={"sub-text"}
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                textTransform: "uppercase",
                                color: "#545454",
                                fontWeight: 500,
                                opacity: 0.5,
                              }}
                            >
                              {formatTime(pickupWithDate[0].time_start)}
                              {pickupWithDate[0].time_end
                                ? " - " + formatTime(pickupWithDate[0].time_end)
                                : ""}
                            </div>

                            <span
                              className={"tooltiptext tooltip-datetime-box"}
                            >
                              {pickupWithDate.map((address, index) => (
                                <div
                                  className={"main-text tooltip-datetime-item"}
                                  key={
                                    address._id + index + address.address_type
                                  }
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    textAlign: "left",
                                  }}
                                >
                                  <div className={"point-on-map-svg"}>
                                    <Point />

                                    <h5
                                      style={{
                                        textTransform: "capitalize",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {" "}
                                      {address.address}{" "}
                                    </h5>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "1rem",
                                    }}
                                  >
                                    <div className={"calendar-svg"}>
                                      <Calendar />

                                      {formatDate(address.date)}
                                    </div>

                                    <div
                                      className={"sub-text tooltip-datetime"}
                                    >
                                      {formatTime(address.time_start)}
                                      {address.time_end
                                        ? " - " + formatTime(address.time_end)
                                        : ""}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </span>
                          </div>
                        </>
                      )}
                    </td>

                    <td>
                      {dropWithDate.length >= 1 && (
                        <>
                          <div
                            className={"main-text tooltip"}
                            style={{
                              cursor: "pointer",
                              minWidth: "6rem",
                            }}
                          >
                            <div
                              className={"main-text"}
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {formatDate(dropWithDate[0].date)}
                            </div>
                            <div
                              className={"sub-text"}
                              style={{
                                display: "flex",
                                gap: "0.5rem",
                                textTransform: "uppercase",
                                color: "#545454",
                                fontWeight: 500,
                                opacity: 0.5,
                              }}
                            >
                              {formatTime(dropWithDate[0].time_start)}
                              {dropWithDate[0].time_end
                                ? " - " + formatTime(dropWithDate[0].time_end)
                                : ""}
                            </div>

                            <span
                              className={"tooltiptext tooltip-datetime-box"}
                            >
                              {dropWithDate.map((address, index) => (
                                <div
                                  className={"main-text tooltip-datetime-item"}
                                  key={
                                    address._id + index + address.address_type
                                  }
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    textAlign: "left",
                                  }}
                                >
                                  <div className={"point-on-map-svg"}>
                                    <Point />

                                    <h5
                                      style={{
                                        textTransform: "capitalize",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {" "}
                                      {address.address}{" "}
                                    </h5>
                                  </div>

                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "1rem",
                                    }}
                                  >
                                    <div className={"calendar-svg"}>
                                      <Calendar />

                                      {formatDate(address.date)}
                                    </div>

                                    <div
                                      className={"sub-text tooltip-datetime"}
                                    >
                                      {formatTime(address.time_start)}
                                      {address.time_end
                                        ? " - " + formatTime(address.time_end)
                                        : ""}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </span>
                          </div>
                        </>
                      )}
                    </td>
                    <td>
                      <div className={"main-text"}>
                        {numberCommaFormat(shipment?.weight)}{" "}
                        {shipment?.weight_unit}
                      </div>
                      <div
                        className={"sub-text"}
                        style={{
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {shipment?.packing_method?.replace("_", " ") ??
                          shipment?.quantity + " items"}
                      </div>

                      <div
                        className={"sub-text"}
                        style={{
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {shipment?.commodity}
                      </div>
                    </td>
                    <td>
                      <div className={"main-text"}>
                        {references?.length ? references[0] : "#0000000000"}
                      </div>
                      <div
                        className={"sub-text"}
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Value:
                        {" " +
                          numberCommaFormat(shipment?.goods_value) +
                          ` ${currency}`}
                      </div>
                      <div
                        className={"sub-text"}
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        {" " + quote_type.replace("_", " ")}
                      </div>
                    </td>
                    <td>
                      <div className={"main-text equipments-table-box"}>
                        {equipments?.join(",")}
                      </div>
                    </td>
                    <td>
                      <Link href={viewLink ? viewLink : ""}>
                        <QuoteActionButtonComponent
                          status={btnStatus}
                          number={bidsNumber}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
