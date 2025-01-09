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
import QuoteModalPreviewComponent from "@/common/components/quote-modal-preview/quote-modal-preview.component";

interface QuotesTableI {
  rows: QuotePreviewI[];
}

export default function QuotesTableComponent({ rows }: QuotesTableI) {
  const { filters, setFilters } = useStore();
  const [selectedQuoteForPreview, setSelectedQuoteForPreview] =
    useState<any>(null);

  return (
    <div className={"quotes-table"}>
      <table>
        <thead>
          <QuoteTableHeader />
        </thead>
        <tbody id={"quotes-tbody fade-in-fast"}>
          {rows?.map(
            (
              {
                _id,
                status,
                addresses,
                references,
                type,
                details,
                equipments,
                bids,
              },
              index,
            ) => {
              const pickupAddress = addresses.filter(
                ({ address_type }) => address_type === "pickup",
              );
              const dropAddress = addresses.filter(
                ({ address_type }) => address_type === "drop",
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
                <>
                  <tr
                    key={_id}
                    onClick={(ev) => {
                      const quote = rows[index];

                      setSelectedQuoteForPreview((prevState) => {
                        if (prevState?._id === quote._id) {
                          return null;
                        }

                        return quote;
                      });
                    }}
                    className={`${selectedQuoteForPreview?._id == _id ? "current-open-preview" : ""}`}
                  >
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
                                  {/*<Info />*/}
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
                                  {/*<Info />*/}
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
                        {numberCommaFormat(shipment?.weight)}{" "}
                        {shipment?.weight_unit}
                      </div>
                    </td>
                    <td>
                      <div
                        className={"main-text"}
                        dangerouslySetInnerHTML={{
                          __html: references?.length
                            ? references[0]
                                .replace(/ /g, "&nbsp;")
                                .replace("/", " ")
                            : "N/A",
                        }}
                      ></div>
                    </td>
                    <td>
                      <div className={"main-text equipments-table-box"}>
                        {equipments?.join(",")}
                      </div>
                    </td>
                    <td
                      onClick={(ev) => {
                        ev.stopPropagation();
                      }}
                    >
                      <QuoteActionButtonComponent
                        status={btnStatus}
                        number={bidsNumber}
                        viewLink={viewLink}
                        prefetchQuoteId={_id}
                      />
                    </td>
                  </tr>
                  {selectedQuoteForPreview?._id == _id && (
                    <tr className={"selected-quote-preview-tr"}>
                      <td
                        colSpan={10}
                        style={{
                          position: "relative",
                        }}
                      >
                        <QuoteModalPreviewComponent
                          quote={selectedQuoteForPreview}
                          setQuote={setSelectedQuoteForPreview}
                          refreshFn={() => {
                            setFilters((prevState) => {
                              return { ...prevState, ignoreCache: true };
                            });
                            // setSelectedQuoteForPreview(null);
                          }}
                        />
                      </td>
                    </tr>
                  )}
                </>
              );
            },
          )}
        </tbody>
      </table>
    </div>
  );
}
