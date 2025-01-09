"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import ChatComponent from "@/common/components/chat/chat.component";
import BreadcrumbsComponent from "@/app/components/breadcrumbs/breadcrumbs.component";
import ShipmentStatusComponent from "@/app/shipments/[quote_id]/components/shipment-status.component";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import { clearText, toShortId } from "@/common/utils/data-convert.utils";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import AddArrivalTimeComponent from "@/app/active-loads/[quote_id]/components/add-arrival-time.component";
import ViewChatDocsComponent from "@/app/active-loads/[quote_id]/components/view-chat-docs.component";
import { getCurrencySymbol } from "@/common/utils/currency";

export default function ShipmentIdPage({
  params,
}: {
  params: {
    quote_id: string;
  };
}) {
  const [request, setRequest] = useState<any>();
  const [quote, setQuote] = useState<any>();
  const [openArrivalModal, setOpenArrivalModal] = useState(false);
  const [openDocs, setOpenDocs] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const { showToast } = useStore();

  const getQuoteAndReq = useDebouncedCallback((ignoreCache = false) => {
    getWithAuth(
      `/quote/active-loads?limit=1&id=${params.quote_id}`,
      ignoreCache,
    ).then((data) => {
      setQuote({ ...data?.quotes[0] });
      setRequest(data?.quotes[0]?.carrier_bid);
    });
  });

  const getNextStatus = () => {
    const currentStatusIndex = [...Object.values(QuoteStatusEnum)].indexOf(
      quote.status,
    );

    const nextStatusKey = [...Object.keys(QuoteStatusEnum)][
      currentStatusIndex + 1
    ];

    const nextStatus = QuoteStatusEnum[nextStatusKey];

    if (
      quote.status == QuoteStatusEnum.AT_PICKUP ||
      quote.status === QuoteStatusEnum.DISPATCHED
    ) {
      const pickup = quote.addresses.filter(
        ({ address_type }) => address_type == "pickup",
      );

      let fulfilledAddresses = 0;

      pickup.map((address) => {
        address.arrival_time ? (fulfilledAddresses += 1) : "";
      });

      if (fulfilledAddresses != pickup.length)
        return pickup.length > 1
          ? QuoteStatusEnum.AT_PICKUP +
              ` ${fulfilledAddresses + 1}/${pickup.length}`
          : QuoteStatusEnum.AT_PICKUP;
    }

    if (
      quote.status == QuoteStatusEnum.AT_DESTINATION ||
      quote.status === QuoteStatusEnum.IN_TRANSIT
    ) {
      const drop = quote.addresses.filter(
        ({ address_type }) => address_type == "drop",
      );

      let fulfilledAddresses = 0;

      drop.map((address) => {
        address.arrival_time ? (fulfilledAddresses += 1) : "";
      });

      if (fulfilledAddresses != drop.length)
        return drop.length > 1
          ? QuoteStatusEnum.AT_DESTINATION +
              ` ${fulfilledAddresses + 1}/${drop.length}`
          : QuoteStatusEnum.AT_DESTINATION;
    }

    return nextStatus;
  };

  const updateStatus = () => {
    const nextStatus = getNextStatus();

    if (
      (quote.status != QuoteStatusEnum.AT_PICKUP &&
        quote.status != QuoteStatusEnum.AT_DESTINATION &&
        quote.status != QuoteStatusEnum.IN_TRANSIT &&
        quote.status != QuoteStatusEnum.DISPATCHED &&
        quote.status != QuoteStatusEnum.DELIVERED) ||
      (quote.status === QuoteStatusEnum.AT_PICKUP &&
        nextStatus === QuoteStatusEnum.IN_TRANSIT)
    ) {
      return updateStatusDebounced();
    }

    setOpenArrivalModal(true);
  };

  const updateStatusDebounced = useDebouncedCallback(() => {
    postWithAuth(`/quote/update-status/${params.quote_id}`, {}).then(
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
          text: "Quote status was updated successfully",
          duration: 5000,
        });

        const ignoreCache = true;
        getQuoteAndReq(ignoreCache);
      },
    );
  }, 300);

  useEffect(() => {
    const ignoreCache = true;
    getQuoteAndReq(ignoreCache);
  }, [openArrivalModal]);

  if (!request || !quote) return <Loading2Component />;

  return (
    <div className={"shipment-id-page"}>
      <AddArrivalTimeComponent
        open={openArrivalModal}
        setOpen={setOpenArrivalModal}
        addresses={quote?.addresses}
        title={getNextStatus()}
      />
      <ViewChatDocsComponent
        open={openDocs}
        setOpen={setOpenDocs}
        docs={chatMessages}
      />
      <div className={"container"}>
        <div className={"page-header"}>
          <div className={"breadcrumbs"}>
            <BreadcrumbsComponent
              items={[
                {
                  title: "Active loads",
                  href: "/active-loads",
                },
                {
                  title: `Load #${toShortId(quote._id)}`,
                },
              ]}
            />
          </div>

          <ShipmentStatusComponent status={quote.status} />
        </div>

        <div className={"content-wrapper"}>
          <div className={"shipment-column"}>
            <div className={"request-wrapper"}>
              <div>
                <div className={"price-wrapper"}>
                  <div className={"price"}>
                    <div className={"full-price"}>
                      <span
                        style={{
                          width: "fit-content",
                        }}
                      >
                        {getCurrencySymbol(quote.currency)}
                      </span>
                      {numberCommaFormat(request?.amount)}
                    </div>
                  </div>

                  <h5>per load</h5>
                </div>

                <div className={"transit-time"}>
                  <h6>Transit Time</h6>
                  <h2>{request.transit_time}</h2>
                  <h6>days</h6>
                </div>
              </div>

              {request.notes && (
                <div className={"notes"}>
                  <h5>Additional notes:</h5>
                  <span>{request.notes}</span>
                </div>
              )}
            </div>

            <QuoteFtlComponent quote={quote} />
          </div>

          <div className={"chat-column"}>
            <div
              className={"change-status"}
              style={{
                width: "100%",
                maxWidth: "100%",
                minWidth: "100%",
              }}
            >
              {getNextStatus() !== QuoteStatusEnum.CANCELED && (
                <button
                  onClick={updateStatus}
                  className={"change-status-button"}
                  style={{
                    maxWidth: "75%",
                    width: "100%",
                  }}
                >
                  Change status to <span>{clearText(getNextStatus())}</span>
                </button>
              )}
              <button
                onClick={() => setOpenDocs(true)}
                style={{
                  maxWidth: "25%",
                  width: "100%",
                }}
              >
                DOCS
              </button>

              <div className={"docs-buttons"}></div>
            </div>

            <div className={"chat-wrapper"}>
              <ChatComponent
                room={params.quote_id + ":" + request?._id}
                title={`${quote?.user[0].name}`}
                setMessagesList={setChatMessages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
