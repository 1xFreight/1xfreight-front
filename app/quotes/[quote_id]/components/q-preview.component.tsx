"use client";

import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import Info from "@/public/icons/14px/info-circle.svg";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import { formatDate } from "@/common/utils/date.utils";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import QuoteModalPreviewComponent from "@/common/components/quote-modal-preview/quote-modal-preview.component";
import { useEffect, useState } from "react";
import { toShortId } from "@/common/utils/data-convert.utils";
import QuoteStatusComponent from "@/app/quotes/components/quotes-table/components/quote-status.component";
import Arrow from "@/public/icons/40px/Arrow 1.svg";
import QuoteActionButtonComponent from "@/app/quotes/components/quotes-table/components/action-button.component";

export default function QPreviewComponent() {
  const [selectedQuoteForPreview, setSelectedQuoteForPreview] = useState(false);
  const { quote } = useQuoteContext();

  const pickupAddress = quote?.addresses?.filter(
    ({ address_type }) => address_type === "pickup",
  );
  const dropAddress = quote?.addresses?.filter(
    ({ address_type }) => address_type === "drop",
  );

  return (
    <div className={"container q-preview-select-request-wrapper"}>
      {quote && (
        <>
          <table className={"q-preview-select-request"}>
            <tbody>
              <tr
                onClick={(ev) => {
                  setSelectedQuoteForPreview((prevState) => !prevState);
                }}
                className={`${selectedQuoteForPreview ? "current-open-preview" : ""}`}
              >
                <td>
                  <div className={"main-text"}>{quote?.type}</div>
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
                    {formatDate(pickupAddress[0]?.date)}
                  </div>
                </td>

                <td>
                  <div className={"main-text"}>
                    {formatDate(dropAddress[0]?.date)}
                  </div>
                </td>
                <td>
                  <div className={"main-text"}>
                    {numberCommaFormat(quote?.details[0]?.weight)}{" "}
                    {quote?.details[0]?.weight_unit}
                  </div>
                </td>
                <td>
                  <div
                    className={"main-text"}
                    dangerouslySetInnerHTML={{
                      __html: quote?.references?.length
                        ? quote?.references[0]
                            ?.replace(/ /g, "&nbsp;")
                            .replace("/", " ")
                        : "N/A",
                    }}
                  ></div>
                </td>
                <td>
                  <div className={"main-text equipments-table-box"}>
                    {quote?.equipments?.join(",")}
                  </div>
                </td>
                {/*<td*/}
                {/*    onClick={(ev) => {*/}
                {/*      ev.preventDefault();*/}
                {/*    }}*/}
                {/*>*/}
                {/*  <QuoteActionButtonComponent*/}
                {/*      status={btnStatus}*/}
                {/*      number={bidsNumber}*/}
                {/*      viewLink={viewLink}*/}
                {/*      prefetchQuoteId={_id}*/}
                {/*  />*/}
                {/*  /!*</Link>*!/*/}
                {/*</td>*/}
              </tr>
              {selectedQuoteForPreview && (
                <tr className={"selected-quote-preview-tr"}>
                  <td
                    colSpan={10}
                    style={{
                      position: "relative",
                    }}
                  >
                    <QuoteModalPreviewComponent
                      quote={quote}
                      // setQuote={setSelectedQuoteForPreview}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
