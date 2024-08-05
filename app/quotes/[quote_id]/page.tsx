"use client";

import BreadcrumbsComponent from "@/app/components/breadcrumbs/breadcrumbs.component";
import "./styles.css";
import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import Info from "@/public/icons/14px/info-circle.svg";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import { useState } from "react";
import { mockData } from "@/app/quotes/components/quotes-table/mock-data";
import QTableComponent from "@/app/quotes/[quote_id]/components/q-table.component";

export default function QuoteBids({
  params,
}: {
  params: { quote_id: string };
}) {
  const [quote, setQuote] = useState(mockData[0]);

  return (
    <div className={"quote-bids-page page"}>
      <div className={"page-breadcrumb"}>
        <BreadcrumbsComponent
          items={[
            {
              title: "Quotes",
              href: "/quotes",
            },
            {
              title: `Load# ${params.quote_id}`,
            },
          ]}
        />
      </div>

      {quote && (
        <table className={"table-quote-preview"}>
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

      <div></div>
      <div className={"container"}>
        <QTableComponent />
      </div>
    </div>
  );
}
