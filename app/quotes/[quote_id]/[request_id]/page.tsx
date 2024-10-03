"use client";

import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import { useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import "./styles.css";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import ChatComponent from "@/common/components/chat/chat.component";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import { useRouter } from "next/navigation";
import { formatDate } from "@/common/utils/date.utils";

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
  const { showToast } = useStore();
  const router = useRouter();

  useEffect(() => {
    setRequest(getRequest(params.request_id));
  }, [quote]);

  useEffect(() => {
    if (!quote) {
      setQuoteId(params.quote_id);
    }
  }, []);

  const acceptQuote = useDebouncedCallback(() => {
    postWithAuth("/quote/accept", {
      quote_id: params.quote_id,
      bid_id: params.request_id,
    }).then(async (response) => {
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
        text: "Quote accepted",
        duration: 5000,
      });

      router.push("/quotes");
    });
  }, 350);

  if (!request) return <LoadingComponent />;
  if (!quote) return <LoadingComponent />;

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
                    {numberCommaFormat(request?.amount)}
                  </div>
                  <div className={"currency"}>{quote.currency}</div>
                </div>

                <h5>Per Load</h5>
              </div>

              <div className={"valid-until"}>
                <h6>Valid Until</h6>
                <h2>{formatDate(request.valid_until)}</h2>
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
                <h2>{request.transit_time}</h2>
                <div className={`sub-text`}>days</div>
              </div>

              <div className={"partner"}>
                <h6>Partner</h6>
                <h2>{request?.local_carrier?.name}</h2>
                <h6>{request?.user?.email}</h6>
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
          <div className={"accept-quote"}>
            <button onClick={acceptQuote}>Accept Quote</button>
            <div className={"main-text"}>
              Total Amount: ${numberCommaFormat(request.amount)}.00(per load) x{" "}
              {quote?.load_number}(load numbers) ={" $"}
              {numberCommaFormat(request.amount * quote?.load_number)}.00
            </div>
          </div>
          <div className={"chat-wrapper"}>
            <ChatComponent
              room={params.quote_id + ":" + params.request_id}
              title={request?.local_carrier?.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
