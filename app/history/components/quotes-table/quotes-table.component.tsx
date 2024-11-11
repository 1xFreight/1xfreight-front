import "./styles.css";
import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import Info from "@/public/icons/14px/info-circle.svg";
import { QuotePreviewI } from "@/common/interfaces/quote-preview.interface";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import { formatDate } from "@/common/utils/date.utils";
import Image from "next/image";
import Link from "next/link";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import Cross from "@/public/icons/24px/cross.svg";

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
            <tr className={"fade-in"}>
              <th></th>
              <th>Type</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Details</th>
              <th>Ref#</th>
              <th>Equipment</th>
              <th>Your offer (per load)</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={"fade-in"}>
            {rows?.map(
              ({
                _id,
                status,
                addresses,
                equipments,
                currency,
                references,
                type,
                quote_type,
                details,
                goods_value,
                carrier_bid,
                user,
              }) => {
                const pickupAddress = addresses.filter(
                  ({ address_type }) => address_type === "pickup",
                );
                const dropAddress = addresses.filter(
                  ({ address_type }) => address_type === "drop",
                );
                const shipment = details[0];
                const qUser = user[0];

                return (
                  <tr key={_id}>
                    <td>
                      {qUser?.logo && (
                        <div className={"quote-shipper-logo"}>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/file-system/image/${qUser?.logo}`}
                            alt={"logo"}
                            width={150}
                            height={150}
                          />
                        </div>
                      )}

                      {!qUser?.logo && qUser.name}
                    </td>
                    <td>
                      <div className={"main-text"}>{type}</div>
                    </td>
                    <td className={"pickup"}>
                      <div className={"location-styling"}>
                        <ArrowUp />
                        <div>
                          <div className={"location main-text"}>
                            {pickupAddress[0].address}

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
                            {formatDate(pickupAddress[0].date)}
                            {!!pickupAddress[0].date && " / "}
                            {pickupAddress[0].time_start}
                            {" - "}
                            {pickupAddress[0].time_end}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={"drop"}>
                      <div className={"location-styling"}>
                        <ArrowDown />

                        <div>
                          <div className={"location main-text"}>
                            {dropAddress[0].address}

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
                            {formatDate(dropAddress[0].date)}
                            {!!dropAddress[0].date && " / "}
                            {dropAddress[0].time_start}
                            {!!dropAddress[0].time_end && " - "}
                            {dropAddress[0].time_end}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={"main-text"}>
                        {numberCommaFormat(shipment.weight)}{" "}
                        {shipment.weight_unit}
                      </div>
                      <div
                        className={"sub-text"}
                        style={{
                          textTransform: "capitalize",
                        }}
                      >
                        {shipment.packing_method?.replace("_", " ")}/
                        {shipment.commodity}
                      </div>
                    </td>
                    <td>
                      <div className={"main-text"}>
                        {references?.length ? references[0] : "N/A"}
                      </div>
                      <div className={"sub-text"}>
                        Value:
                        {" " +
                          numberCommaFormat(shipment.goods_value) +
                          ` ${currency} /`}
                        {" " + quote_type.replace("_", " ")}
                      </div>
                    </td>
                    <td>
                      <div className={"main-text"}>{equipments?.join(",")}</div>
                    </td>
                    <td>
                      {carrier_bid && (
                        <div className={"end"}>
                          <div className={"price"}>
                            <div className={"full-price"}>
                              <span>$</span>
                              {numberCommaFormat(carrier_bid.amount)}
                            </div>
                            <div className={"currency"}>{currency}</div>
                          </div>
                        </div>
                      )}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Link href={`/available-quotes/${_id}`}>
                          <button>Quote</button>
                        </Link>

                        <div
                          onClick={() => {
                            document.getElementById(
                              "decline-action",
                            ).style.display = "flex";
                          }}
                          style={{
                            width: "2rem",
                          }}
                        >
                          <Cross />
                        </div>

                        <ConfirmActionComponent
                          title={"Decline Quote ?"}
                          id={"decline-action"}
                        />
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
