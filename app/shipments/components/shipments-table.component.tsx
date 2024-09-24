import Arrow from "@/public/icons/40px/Arrow 1.svg";
import Checkmark from "@/public/icons/14px/checkmark-circle.svg";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import Doc from "@/public/icons/35px/document.svg";
import Archive from "@/public/icons/35px/archives 1.svg";
import Info from "@/public/icons/14px/info-circle.svg";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import { formatDate, formatTime } from "@/common/utils/date.utils";
import { clearText, toShortId } from "@/common/utils/data-convert.utils";
import Link from "next/link";
import Cross from "@/public/icons/24px/cross.svg";

export default function ShipmentsTableComponent({ shipments }) {
  return (
    <table className={"fade-in"}>
      <thead>
        <tr>
          <th>Load ID</th>
          <th>Mode</th>
          <th>Origin</th>
          <th>Destination</th>
          <th>Pickup</th>
          <th>Delivery</th>
          <th>Carrier</th>
          <th>Cost</th>
          <th>Actions</th>
        </tr>
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
            }) => {
              const pickupAddress = addresses.filter(
                ({ address_type }) => address_type === "pickup",
              );
              const dropAddress = addresses.filter(
                ({ address_type }) => address_type === "drop",
              );

              const alreadyArrivedPickupAddresses = pickupAddress.filter(
                (address) => address.hasOwnProperty("arrival_time"),
              );

              const alreadyArrivedDropAddresses = dropAddress.filter(
                (address) => address.hasOwnProperty("arrival_time"),
              );

              const shipment = details[0];

              return (
                <tr key={_id}>
                  {/*<td>*/}
                  {/*  <div className={"svg-favorite"}>*/}
                  {/*    <Star />*/}
                  {/*  </div>*/}
                  {/*</td>*/}
                  <td>
                    <div className={"id-number"}>{toShortId(_id)}</div>
                    <div
                      className={`main-text table-status ${status}`}
                      style={{
                        textTransform: "capitalize",
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
                          {pickupAddress[0]?.address}

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
                        <div className={"date sub-text"}>
                          {formatDate(pickupAddress[0]?.date)}
                          {!!pickupAddress[0]?.date && " / "}
                          {pickupAddress[0]?.time_start}
                          {" - "}
                          {pickupAddress[0]?.time_end}
                        </div>
                      </div>
                      <div className={"arrow-styling"}>
                        <Arrow />
                      </div>
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
                          {dropAddress[0]?.address}

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
                        <div className={"date sub-text"}>
                          {formatDate(dropAddress[0]?.date)}
                          {!!dropAddress[0]?.date && " / "}
                          {dropAddress[0]?.time_start}
                          {!!dropAddress[0]?.time_end && " - "}
                          {dropAddress[0]?.time_end}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    {alreadyArrivedPickupAddresses.length === 0 && (
                      <>
                        <div className={"main-text"}>Awaiting</div>
                      </>
                    )}

                    {alreadyArrivedPickupAddresses.length === 1 &&
                      pickupAddress.length === 1 && (
                        <>
                          <div className={"main-text"}>
                            {formatDate(
                              alreadyArrivedPickupAddresses[0].arrival_date,
                            )}
                          </div>
                          <div
                            className={"sub-text active"}
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                            }}
                          >
                            <Checkmark />{" "}
                            {formatTime(
                              alreadyArrivedPickupAddresses[0].arrival_time,
                            )}
                          </div>
                        </>
                      )}

                    {pickupAddress.length > 1 &&
                      !!alreadyArrivedPickupAddresses.length && (
                        <>
                          <div
                            className={"main-text tooltip"}
                            style={{
                              textTransform: "lowercase",
                              cursor: "pointer",
                              color: "rgba(0, 32, 221, 0.7)",
                            }}
                          >
                            {`${alreadyArrivedPickupAddresses.length} of ${pickupAddress.length}`}

                            <span
                              className={"tooltiptext"}
                              style={{
                                bottom: "unset",
                                top: "100%",
                                padding: "1rem",
                                width: "30rem",
                              }}
                            >
                              {alreadyArrivedPickupAddresses.map(
                                (address, index) => (
                                  <div
                                    className={"main-text"}
                                    key={
                                      address._id + index + address.address_type
                                    }
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      textAlign: "left",
                                    }}
                                  >
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

                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "1rem",
                                      }}
                                    >
                                      {formatDate(address.arrival_date)}

                                      <div
                                        className={"sub-text active"}
                                        style={{
                                          display: "flex",
                                          gap: "0.5rem",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        <Checkmark />{" "}
                                        {formatTime(address.arrival_time)}
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </span>
                          </div>
                        </>
                      )}
                  </td>

                  <td>
                    {alreadyArrivedDropAddresses.length === 0 && (
                      <>
                        <div className={"main-text"}>Awaiting</div>
                      </>
                    )}

                    {alreadyArrivedDropAddresses.length === 1 &&
                      dropAddress.length === 1 && (
                        <>
                          <div className={"main-text"}>
                            {formatDate(
                              alreadyArrivedDropAddresses[0].arrival_date,
                            )}
                          </div>
                          <div
                            className={"sub-text active"}
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                            }}
                          >
                            <Checkmark />{" "}
                            {formatTime(
                              alreadyArrivedDropAddresses[0].arrival_time,
                            )}
                          </div>
                        </>
                      )}

                    {dropAddress.length > 1 &&
                      !!alreadyArrivedDropAddresses.length && (
                        <>
                          <div
                            className={"main-text tooltip"}
                            style={{
                              textTransform: "lowercase",
                              cursor: "pointer",
                              color: "rgba(0, 32, 221, 0.7)",
                            }}
                          >
                            {`${alreadyArrivedDropAddresses.length} of ${dropAddress.length}`}

                            <span
                              className={"tooltiptext"}
                              style={{
                                bottom: "unset",
                                top: "100%",
                                padding: "1rem",
                                width: "30rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                              }}
                            >
                              {alreadyArrivedDropAddresses.map(
                                (address, index) => (
                                  <div
                                    className={"main-text"}
                                    key={
                                      address._id + index + address.address_type
                                    }
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      textAlign: "left",
                                    }}
                                  >
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

                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "1rem",
                                      }}
                                    >
                                      {formatDate(address.arrival_date)}

                                      <div
                                        className={"sub-text active"}
                                        style={{
                                          display: "flex",
                                          gap: "0.5rem",
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        <Checkmark />{" "}
                                        {formatTime(address.arrival_time)}
                                      </div>
                                    </div>
                                  </div>
                                ),
                              )}
                            </span>
                          </div>
                        </>
                      )}
                  </td>

                  <td>
                    <div className={"main-text"}>{carrier?.email}</div>
                  </td>
                  <td>
                    <div className={"price"}>
                      <div className={"full-price"}>
                        <span>$</span>
                        {numberCommaFormat(load_number * bid?.amount)}
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
                        <span className={"tooltiptext"}>Action</span>
                      </div>

                      <div className={"tooltip"}>
                        <Link href={`/shipments/${_id}`}>
                          <button>
                            <Doc />
                          </button>
                        </Link>
                        <span className={"tooltiptext"}>View quote</span>
                      </div>

                      <div className={"tooltip"}>
                        <button
                          style={{
                            width: "2.5rem",
                          }}
                        >
                          <Cross />
                        </button>
                        <span className={"tooltiptext"}>Cancel load</span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            },
          )}
      </tbody>
    </table>
  );
}
