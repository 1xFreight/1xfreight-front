"use client";

import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import Info from "@/public/icons/14px/info-circle.svg";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";

export default function QPreviewComponent() {
  const { quote } = useQuoteContext();

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
                  {quote.pickupAddress[0].address}

                  {quote.pickupAddress.length >= 2 && (
                    <>
                      <div className={"extra-address"}>
                        +{quote.pickupAddress.length - 1}
                        <Info />
                        <ExtraAddressWindowComponent
                          stops={quote.pickupAddress}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className={"date sub-text"}>
                  {quote.pickupAddress[0].date}
                </div>
              </td>
              <td className={"drop"}>
                <div className={"location main-text"}>
                  <ArrowDown />
                  {quote.dropAddress[0].address}

                  {quote.dropAddress.length >= 2 && (
                    <>
                      <div className={"extra-address"}>
                        +{quote.dropAddress.length - 1}
                        <Info />
                        <ExtraAddressWindowComponent
                          stops={quote.dropAddress}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div className={"date sub-text"}>
                  {quote.dropAddress[0].date}
                </div>
              </td>
              <td>
                <div className={"main-text"}>{quote.weight} lbs</div>
                <div className={"sub-text"}>{quote.weightDetails}</div>
              </td>
              <td>
                <div className={"main-text"}>{quote.ref}</div>
                <div className={"sub-text"}>{quote.refDetails}</div>
              </td>
              <td>
                <div className={"main-text"}>{quote.equipment}</div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}
