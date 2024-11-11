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
import { clearText } from "@/common/utils/data-convert.utils";
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
                        {references?.length ? references[0] : "N/A"}
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
                      <div>
                        <div className={"end"}>
                          <div className={"price"}>
                            <div className={"full-price"}>
                              <span>$</span>
                              {numberCommaFormat(carrier_bid.amount)}
                            </div>
                            <div className={"currency"}>{currency}</div>
                          </div>
                        </div>
                        <div
                          className={`table-status ${status}`}
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {clearText(status)}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Link href={`/active-loads/${_id}`}>
                          <button>View</button>
                        </Link>
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
