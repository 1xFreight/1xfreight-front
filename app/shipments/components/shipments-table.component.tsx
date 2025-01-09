"use client";

import Arrow from "@/public/icons/40px/Arrow 1.svg";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import { formatDate, formatTime } from "@/common/utils/date.utils";
import { clearText, toShortId } from "@/common/utils/data-convert.utils";
import Link from "next/link";
import ShipmentsTableHeader from "@/app/shipments/components/table-header.component";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { useRouter } from "next/navigation";
import CancelLoadShipTable from "@/app/shipments/components/canel-ship-load.component";
import { getCurrencySymbol } from "@/common/utils/currency";
import QuoteModalPreviewComponent from "@/common/components/quote-modal-preview/quote-modal-preview.component";
import { useState } from "react";

export default function ShipmentsTableComponent({ shipments }) {
  const [selectedQuoteForPreview, setSelectedQuoteForPreview] =
    useState<any>(null);
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
      <div className={"shipments-table-wrapper"}>
        <table>
          <thead>
            <ShipmentsTableHeader />
          </thead>

          <tbody>
            {!!shipments?.length &&
              shipments.map(
                (
                  {
                    type,
                    status,
                    addresses,
                    details,
                    _id,
                    carrier,
                    bid,
                    currency,
                    local_carrier,
                  },
                  index,
                ) => {
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
                    <>
                      <tr
                        key={_id}
                        onClick={(ev) => {
                          const quote = shipments[index];

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
                            {local_carrier?.name}
                          </div>
                          <div className={"sub-text"}>{carrier?.email}</div>
                        </td>
                        <td>
                          <div className={"price"}>
                            <div className={"full-price"}>
                              <span>{getCurrencySymbol(currency)}</span>
                              {numberCommaFormat(bid?.amount)}
                            </div>
                            <div className={"currency"}>{currency}</div>
                          </div>
                        </td>

                        <td
                          onClick={(ev) => {
                            ev.stopPropagation();
                          }}
                        >
                          <Link
                            href={`/shipments/${_id}`}
                            onMouseEnter={() => {
                              prefetchQuoteURL(`/shipments/${_id}`, _id);
                            }}
                          >
                            <button className={"view-details-btn"}>
                              View Details
                            </button>
                          </Link>
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
                              shipmentsButtons
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
    </>
  );
}
