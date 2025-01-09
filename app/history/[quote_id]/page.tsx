"use client";

import { useEffect, useState } from "react";
import "./styles.css";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import ChatComponent from "@/common/components/chat/chat.component";
import BreadcrumbsComponent from "@/app/components/breadcrumbs/breadcrumbs.component";
import ShipmentStatusComponent from "@/app/shipments/[quote_id]/components/shipment-status.component";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { clearText, toShortId } from "@/common/utils/data-convert.utils";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import ViewChatDocsComponent from "@/app/active-loads/[quote_id]/components/view-chat-docs.component";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
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
  const [openDocs, setOpenDocs] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const getQuoteAndReq = useDebouncedCallback((ignoreCache = false) => {
    getWithAuth(
      `/quote/carrier/history?limit=1&id=${params.quote_id}`,
      ignoreCache,
    ).then((data) => {
      setQuote({ ...data?.quotes[0] });
      setRequest(data?.quotes[0]?.carrier_bid);
    });
  });

  useEffect(() => {
    getQuoteAndReq();
  }, []);

  if (!request || !quote) return <Loading2Component />;

  return (
    <div className={"shipment-id-page"}>
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
                  title: "History",
                  href: "/history",
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
              <button
                onClick={() => setOpenDocs(true)}
                style={{
                  maxWidth: "100%",
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
                disableSendMessages
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
