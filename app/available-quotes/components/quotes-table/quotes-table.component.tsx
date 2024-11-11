"use client";

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
import Arrow from "@/public/icons/40px/Arrow 1.svg";
import { useDebouncedCallback } from "use-debounce";
import { deleteCache, postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toShortId } from "@/common/utils/data-convert.utils";

interface QuotesTableI {
  rows: QuotePreviewI[];
}

export default function QuotesTableComponent({ rows }: QuotesTableI) {
  const { showToast } = useStore();
  const router = useRouter();
  const [declineQuoteId, setDeclineQuoteId] = useState();

  const declineQuote = useDebouncedCallback(() => {
    if (!declineQuoteId) return;

    postWithAuth(`/quote/decline/${declineQuoteId}`, {}).then(
      async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          return showToast({
            type: ToastTypesEnum.ERROR,
            text: errorData.message || "Something went wrong",
            duration: 5000,
          });
        }

        showToast({
          type: ToastTypesEnum.SUCCESS,
          text: "Quote was declined",
          duration: 5000,
        });

        deleteCache();
        router.push("/");
      },
    );
  }, 350);

  return (
    <>
      <div className={"quotes-table-placeholder"}></div>
      <div className={"av-quotes-table"}>
        <table>
          <thead>
            <tr className={"fade-in"}>
              <th></th>
              <th>Type</th>
              <th>Pickup</th>
              <th>Drop</th>
              <th>Details</th>
              <th>Value</th>
              <th>Equipment</th>
              <th>Your offer (per load)</th>
              <th></th>
            </tr>
          </thead>
          <tbody className={"fade-in"}>
            {rows?.map(
              ({
                _id,
                addresses,
                equipments,
                currency,
                type,
                quote_type,
                details,
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
                        $
                        {" " +
                          numberCommaFormat(shipment.goods_value) +
                          ` ${currency}`}
                      </div>
                      <div className={"sub-text"}>
                        {" " + quote_type.replace("_", " ")}
                      </div>
                    </td>
                    <td>
                      <div className={"main-text equipments-table-box"}>
                        {equipments?.join(",")}
                      </div>
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
                      <div className={"av-actions"}>
                        <Link href={`/available-quotes/${_id}`}>
                          <button className={"variant2"}>View</button>
                        </Link>
                        <button
                          onClick={() => {
                            setDeclineQuoteId(_id);
                            document.getElementById(
                              "decline-action",
                            ).style.display = "flex";
                          }}
                        >
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
        <ConfirmActionComponent
          title={`Decline Quote ${declineQuoteId ? toShortId(declineQuoteId) : ""}?`}
          id={"decline-action"}
          action={declineQuote}
        />
      </div>
    </>
  );
}
