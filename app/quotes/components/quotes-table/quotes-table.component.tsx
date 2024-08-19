import "./styles.css";
import QuoteStatusComponent from "@/app/quotes/components/quotes-table/components/quote-status.component";
import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import Info from "@/public/icons/14px/info-circle.svg";
import QuoteActionButtonComponent from "@/app/quotes/components/quotes-table/components/action-button.component";
import { QuotePreviewI } from "@/common/interfaces/quote-preview.interface";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import Link from "next/link";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import { toShortId } from "@/common/utils/data-convert.utils";

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
            <tr>
              <th>Quote#</th>
              <th>Type</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Details</th>
              <th>Ref#</th>
              <th>Equipment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!!rows.length &&
              rows.map(
                ({
                  _id,
                  status,
                  addresses,
                  ref,
                  refDetails,
                  equipment,
                  currency,
                  references,
                  price,
                  type,
                  quote_type,
                  details,
                  goods_value,
                }) => {
                  const pickupAddress = addresses.filter(
                    ({ address_type }) => address_type === "pickup",
                  );
                  const dropAddress = addresses.filter(
                    ({ address_type }) => address_type === "drop",
                  );
                  const shipment = details[0];
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
                        <div className={"location main-text"}>
                          <ArrowUp />
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
                          {pickupAddress[0].date}
                        </div>
                      </td>
                      <td className={"drop"}>
                        <div className={"location main-text"}>
                          <ArrowDown />
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
                          {dropAddress[0].date}
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
                          {shipment.packing_method.replace("_", " ")}/
                          {shipment.commodity}
                        </div>
                      </td>
                      <td>
                        <div className={"main-text"}>
                          {references?.length ? references[0] : "#0000000000"}
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
                        <div className={"main-text"}>{equipment}</div>
                      </td>
                      <td>
                        <div className={"end"}>
                          <div></div>
                          {/*<div className={"price"}>*/}
                          {/*  <div className={"full-price"}>*/}
                          {/*    <span>$</span>*/}
                          {/*    {numberCommaFormat(shipment.goods_value)}*/}
                          {/*  </div>*/}
                          {/*  <div className={"currency"}>{currency}</div>*/}
                          {/*</div>*/}

                          <QuoteActionButtonComponent
                            status={status.toUpperCase() as QuoteStatusEnum}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                },
              )}
          </tbody>
        </table>
        {!rows.length && <div className={"no-data"}>no data placeholder</div>}
      </div>
    </>
  );
}
