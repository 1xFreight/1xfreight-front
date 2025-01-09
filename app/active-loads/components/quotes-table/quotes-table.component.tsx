"use client";

import "./styles.css";
import { QuotePreviewI } from "@/common/interfaces/quote-preview.interface";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import { formatDate } from "@/common/utils/date.utils";
import Image from "next/image";
import Link from "next/link";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import Arrow from "@/public/icons/40px/Arrow 1.svg";
import { useDebouncedCallback } from "use-debounce";
import {
  deleteCache,
  getWithAuth,
  postWithAuth,
} from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { clearText, toShortId } from "@/common/utils/data-convert.utils";
import TableHeaderComponent from "@/app/active-loads/components/quotes-table/components/table-header.component";
import { getCurrencySymbol } from "@/common/utils/currency";
import QuoteModalPreviewComponent from "@/common/components/quote-modal-preview/quote-modal-preview.component";

interface QuotesTableI {
  rows: QuotePreviewI[];
}

export default function QuotesTableComponent({ rows }: QuotesTableI) {
  const { showToast } = useStore();
  const [selectedQuoteForPreview, setSelectedQuoteForPreview] =
    useState<any>(null);

  const prefetchQuoteURL = useDebouncedCallback((prefetchQuoteId) => {
    getWithAuth(`/quote/active-loads?limit=1&id=${prefetchQuoteId}`).then(
      (data) => {},
    );
  }, 50);

  return (
    <>
      <div className={"al-quotes-table"}>
        <table>
          <thead>
            <TableHeaderComponent />
          </thead>
          <tbody className={"fade-in"}>
            {rows?.map(
              (
                {
                  _id,
                  addresses,
                  equipments,
                  currency,
                  type,
                  quote_type,
                  details,
                  carrier_bid,
                  user,
                  deadline_date,
                  status,
                  references,
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
                const qUser = user[0];

                return (
                  <Fragment key={_id}>
                    <tr
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
                      </td>
                      <td>
                        <div className={"main-text"}>
                          {numberCommaFormat(shipment?.weight)}{" "}
                          {shipment?.weight_unit}
                        </div>
                      </td>
                      <td>
                        <div className={"main-text"}>
                          {references[0] ?? "N/A"}
                        </div>
                      </td>
                      <td>
                        {carrier_bid && (
                          <div className={"end"}>
                            <div className={"price"}>
                              <div className={"full-price"}>
                                <span>{getCurrencySymbol(currency)}</span>
                                {numberCommaFormat(carrier_bid.amount)}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>
                      <td onClick={(ev) => ev.stopPropagation()}>
                        <div className={"av-actions"}>
                          <Link
                            href={`/active-loads/${_id}`}
                            prefetch
                            onMouseEnter={() => prefetchQuoteURL(_id)}
                          >
                            <button className={"variant2"}>View</button>
                          </Link>
                        </div>
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
                            hideActions
                          />
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
