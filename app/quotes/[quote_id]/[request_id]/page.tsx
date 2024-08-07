"use client";

import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import { useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import "./styles.css";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import ChatComponent from "@/common/components/chat/chat.component";

export default function RequestIdPage({
  params,
}: {
  params: {
    quote_id: string;
    request_id: string;
  };
}) {
  const { setQuoteId, getRequest, quote } = useQuoteContext();
  const [request, setRequest] = useState();

  useEffect(() => {
    setRequest(getRequest(params.request_id));
  }, [quote]);

  useEffect(() => {
    if (!quote) {
      setQuoteId(params.quote_id);
    }
  }, []);

  useEffect(() => {
    console.log(request);
  }, [request]);

  if (!request) return <LoadingComponent />;

  return (
    <div className={"request-id-page container"}>
      <div className={"content-wrapper"}>
        <div className={"request-column"}>
          <div className={"request-wrapper"}>
            <div>
              <div className={"price-wrapper"}>
                <div className={"price"}>
                  <div className={"full-price"}>
                    <span>$</span>
                    {numberCommaFormat(request.price)}
                  </div>
                  <div className={"currency"}>USD</div>
                </div>
                <h5>Per Load</h5>
              </div>

              <div className={"valid-until"}>
                <h6>Valid Until</h6>
                <h2>{request.date}</h2>
                <div
                  className={`sub-text ${request.status}`}
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {request.status}
                </div>
              </div>

              <div className={"transit-time"}>
                <h6>Transit Time</h6>
                <h2>{request.transitTime}</h2>
                <div className={`sub-text`}>days</div>
              </div>

              <div className={"partner"}>
                <h6>Partner</h6>
                <h2>{request.company}</h2>
                <div className={`sub-text`}>{request.email}</div>
              </div>
            </div>

            {request.notes && (
              <div className={"notes"}>
                <h5>Additional notes:</h5>
                <span>{request.notes}</span>
              </div>
            )}
          </div>

          <QuoteFtlComponent
            quote={{
              shipment: quote,
              pickup: quote.pickupAddress,
              drop: quote.dropAddress,
            }}
          />
        </div>

        <div className={"chat-column"}>
          <div className={"accept-quote"}>
            <button>Accept Quote</button>
            <div className={"sub-text"}>
              Total Amount: ${numberCommaFormat(quote.price)}.00
            </div>
          </div>
          <div className={"chat-wrapper"}>
            <ChatComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
