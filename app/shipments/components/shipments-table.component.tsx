"use client";

import Arrow from "@/public/icons/40px/Arrow 1.svg";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import Doc from "@/public/icons/35px/document.svg";
import Archive from "@/public/icons/35px/archives 1.svg";
import Info from "@/public/icons/14px/info-circle.svg";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import { formatDate, formatTime } from "@/common/utils/date.utils";
import { clearText, toShortId } from "@/common/utils/data-convert.utils";
import Link from "next/link";
import Calendar from "@/public/icons/24px/calendar.svg";
import Point from "@/public/icons/35px/map-marker.svg";
import ShipmentsTableHeader from "@/app/shipments/components/table-header.component";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { useRouter } from "next/navigation";
import CancelLoadShipTable from "@/app/shipments/components/canel-ship-load.component";
import { getCurrencySymbol } from "@/common/utils/currency";

export default function ShipmentsTableComponent({ shipments }) {
  const router = useRouter();

  const prefetchQuoteURL = useDebouncedCallback(
    (viewLink: string, prefetchQuoteId: string) => {
      router.prefetch(viewLink);
      getWithAuth(`/quote/shipments?limit=1&id=${prefetchQuoteId}`).then(
        (data) => {},
      );
    },
    50,
  );

  return (
    <>
      <div className={"quotes-table-placeholder"}></div>
      <div className={"shipments-table-wrapper"}>
        <table>
          <thead>
            <ShipmentsTableHeader />
          </thead>

          <tbody>
            {!!shipments?.length &&
              shipments.map(
                ({
                  type,
                  status,
                  addresses,
                  details,
                  _id,
                  carrier,
                  load_number,
                  bid,
                  currency,
                  local_carrier,
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

                  return (
                    <tr key={_id}>
                      <td>
                        <div className={"id-number"}>{toShortId(_id)}</div>
                      </td>
                      <td>
                        <div
                          className={`main-text table-status ${status}`}
                          style={{
                            textTransform: "capitalize",
                            textAlign: "center",
                          }}
                        >
                          {clearText(status)}
                        </div>
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
                                  color: "#1e1e1e",
                                  fontWeight: 500,
                                  opacity: 0.5,
                                }}
                              >
                                {formatTime(pickupWithDate[0].time_start)}
                                {pickupWithDate[0].time_end
                                  ? " - " +
                                    formatTime(pickupWithDate[0].time_end)
                                  : ""}
                              </div>

                              <span
                                className={"tooltiptext tooltip-datetime-box"}
                              >
                                {pickupWithDate.map((address, index) => (
                                  <div
                                    className={
                                      "main-text tooltip-datetime-item"
                                    }
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
                                  color: "#1e1e1e",
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
                                    className={
                                      "main-text tooltip-datetime-item"
                                    }
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
                        <div className={"main-text"}>{local_carrier?.name}</div>
                        <div className={"sub-text"}>{carrier?.email}</div>
                      </td>
                      <td>
                        <div className={"price"}>
                          <div className={"full-price"}>
                            <span>$</span>
                            {numberCommaFormat(bid?.amount)}
                          </div>
                          <div className={"currency"}>{currency}</div>
                        </div>
                      </td>

                      <td>
                        <div className={"ship-table-actions"}>
                          <div className={"tooltip"}>
                            <button>
                              <Archive />
                            </button>
                            <span className={"tooltiptext"}>Duplicate</span>
                          </div>

                          <div className={"tooltip"}>
                            <Link
                              href={`/shipments/${_id}`}
                              onMouseEnter={() => {
                                prefetchQuoteURL(`/shipments/${_id}`, _id);
                              }}
                            >
                              <button>
                                <Doc />
                              </button>
                            </Link>
                            <span className={"tooltiptext"}>View</span>
                          </div>

                          <CancelLoadShipTable quote_id={_id} />
                        </div>
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
