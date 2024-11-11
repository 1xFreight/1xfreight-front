"use client";

import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import { useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import "./styles.css";
import numberCommaFormat, {
  formatCurrency,
} from "@/common/utils/number-comma.utils";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import ChatComponent from "@/common/components/chat/chat.component";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import { useRouter } from "next/navigation";
import { formatDate } from "@/common/utils/date.utils";
import Insurance from "@/public/icons/20px/insurance.svg";
import Checked from "@/public/icons/24px/checked-tick.svg";
import Cross from "@/public/icons/24px/cross.svg";

export default function RequestIdPage({
  params,
}: {
  params: {
    quote_id: string;
    request_id: string;
  };
}) {
  const { setQuoteId, getRequest, quote, setIsMissingData } = useQuoteContext();
  const [request, setRequest] = useState();
  const { showToast, addToStore } = useStore();
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

        if (errorData?.message === "Missing data") {
          return setIsMissingData(params.request_id);
        }

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

      router.push(`/goto/${params.quote_id}`);
    });
  }, 350);

  const redirectToEditCarrier = (carrier: any) => {
    addToStore({
      name: "edit-carrier-data",
      data: carrier,
    });
    router.push("/settings/carriers");
  };

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

                <h5>per load</h5>
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
                <h6>days</h6>
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

            {(request?.local_carrier?.mc || request?.local_carrier?.dot) &&
              request?.local_carrier?.safety_rating && (
                <div className={"extra-details"}>
                  <div className={"insurance-wrapper"}>
                    <div className={"details-title"}>
                      <Insurance />
                      <h4>Insurance:</h4>
                    </div>

                    <div className={`insurance-details`}>
                      <div>
                        <h4> Cargo:</h4>
                        {request?.local_carrier?.insurance_cargo ? (
                          <div className={"icon-checked"}>
                            <Checked />
                          </div>
                        ) : (
                          <div className={"icon-cross"}>
                            <Cross />
                          </div>
                        )}
                      </div>
                      <h3>
                        {request?.local_carrier?.insurance_cargo
                          ? formatCurrency(
                              request?.local_carrier?.insurance_cargo,
                            )
                          : "$0000.00"}
                      </h3>
                    </div>

                    <div className={`insurance-details`}>
                      <div>
                        <h4> General:</h4>
                        {request?.local_carrier?.insurance_general ? (
                          <div className={"icon-checked"}>
                            <Checked />
                          </div>
                        ) : (
                          <div className={"icon-cross"}>
                            <Cross />
                          </div>
                        )}
                      </div>
                      <h3>
                        {request?.local_carrier?.insurance_general
                          ? formatCurrency(
                              request?.local_carrier?.insurance_general,
                            )
                          : "$0000.00"}
                      </h3>
                    </div>

                    <div className={`insurance-details`}>
                      <div>
                        <h4> Auto:</h4>
                        {request?.local_carrier?.insurance_auto ? (
                          <div className={"icon-checked"}>
                            <Checked />
                          </div>
                        ) : (
                          <div className={"icon-cross"}>
                            <Cross />
                          </div>
                        )}
                      </div>
                      <h3>
                        {request?.local_carrier?.insurance_auto
                          ? formatCurrency(
                              request?.local_carrier?.insurance_auto,
                            )
                          : "$0000.00"}
                      </h3>
                    </div>
                  </div>

                  <div className={"carrier-details"}>
                    <div>
                      <span>{request?.local_carrier?.fleet_size}</span>

                      <h4>Fleet Size </h4>
                    </div>

                    <div>
                      <span>{request?.local_carrier?.total_us_inspect}</span>

                      <h4>Total US Inspections </h4>
                    </div>

                    <div>
                      <span>{request?.local_carrier?.total_can_inspect}</span>
                      <h4>Total Canadian Inspections </h4>
                    </div>

                    <div className={"rating"}>
                      <span>{request?.local_carrier?.safety_rating}</span>
                      <h4>Safety rating</h4>
                    </div>
                  </div>
                </div>
              )}

            {!(request?.local_carrier?.mc || request?.local_carrier?.dot) && (
              <div className={"edit-user-box"}>
                To view more details about carrier provide mc or dot.
                <button
                  onClick={() => redirectToEditCarrier(request?.local_carrier)}
                >
                  Edit carrier
                </button>
              </div>
            )}
          </div>

          <QuoteFtlComponent quote={quote} />
        </div>

        <div className={"chat-column"}>
          <div className={"accept-quote"}>
            <button
              onClick={acceptQuote}
              className={"accept-quote-btn variant2"}
              style={{ width: "100%" }}
            >
              Accept Quote
            </button>
            <div className={"main-text-5"}>
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
