"use client";

import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import Info from "@/public/icons/14px/info-circle.svg";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import { formatDate } from "@/common/utils/date.utils";
import numberCommaFormat from "@/common/utils/number-comma.utils";

export default function QPreviewComponent() {
  const { quote } = useQuoteContext();
  const pickupAddress = quote?.addresses.filter(
    ({ address_type }) => address_type === "pickup",
  );
  const dropAddress = quote?.addresses.filter(
    ({ address_type }) => address_type === "drop",
  );

  const details = quote?.details[0];

  return (
    <>
      {quote && (
        <table className={"table-quote-preview slide-in-top"}>
          <thead>
            <tr>
              <th></th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Details</th>
              <th>Ref#</th>
              <th>Equipment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={"main-text"}>{quote.type}</div>
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
                        <ExtraAddressWindowComponent stops={pickupAddress} />
                      </div>
                    </>
                  )}
                </div>
                <div className={"date sub-text"}>
                  {formatDate(pickupAddress[0].date)}
                  {!!pickupAddress[0].date && " / "}
                  {pickupAddress[0].time_start}
                  {!!pickupAddress[0].time_end && " - "}
                  {pickupAddress[0].time_end}
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
                        <ExtraAddressWindowComponent stops={dropAddress} />
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
              </td>
              <td>
                <div className={"main-text"}>
                  {numberCommaFormat(details.weight)} {details.weight_unit}
                </div>
                <div
                  className={"sub-text"}
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {details.packing_method?.replace("_", " ")}/
                  {details.commodity}
                </div>
              </td>
              <td>
                <div className={"main-text"}>
                  {quote?.references?.length
                    ? quote?.references[0]
                    : "#0000000000"}
                </div>
                <div className={"sub-text"}>
                  Value:
                  {" " +
                    numberCommaFormat(details.goods_value) +
                    ` ${quote?.currency} /`}
                  {" " + quote?.quote_type.replace("_", " ")}
                </div>
              </td>
              <td>
                <div className={"main-text"}>
                  {quote?.equipments?.join(",")}
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}
