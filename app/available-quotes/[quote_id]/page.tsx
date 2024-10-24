"use client";

import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import "./styles.css";
import { useEffect, useState } from "react";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import { disablePastDates, formatDate } from "@/common/utils/date.utils";
import Stopwatch from "@/public/icons/40px/stopwatch.svg";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { useDebouncedCallback } from "use-debounce";
import { formDataToJSON } from "@/common/utils/formData.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import { useRouter } from "next/navigation";
import ChatComponent from "@/common/components/chat/chat.component";

export default function QuotePreviewCarrier({
  params,
}: {
  params: { quote_id: string };
}) {
  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(true);
  const { showToast } = useStore();
  const router = useRouter();
  const [existingBid, setExistingBid] = useState(null);
  const [amount, setAmount] = useState(existingBid?.amount ?? 0);

  useEffect(() => {
    debouncedGetQuote();
  }, []);

  const debouncedGetQuote = useDebouncedCallback((ignoreCache = false) => {
    getWithAuth(`/quote/id/${params.quote_id}`, ignoreCache).then((data) => {
      setQuote(data);
    });

    getWithAuth(`/bid/qid/${params.quote_id}`, ignoreCache).then((data) => {
      setExistingBid(data);
      setAmount(data.amount);
      setLoading(false);
    });
  }, 350);

  const updateBidPrice = useDebouncedCallback(() => {
    const newAmount = Number(
      (document.getElementById("bid-amount") as HTMLInputElement).value,
    );

    if (newAmount != existingBid?.amount) {
      postWithAuth(`/bid/qid/${params.quote_id}`, {
        amount: newAmount,
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
          text: "Your quote amount was updated",
          duration: 5000,
        });
      });
    }
    setLoading(true);
    debouncedGetQuote();
  });

  const getBidData = () => {
    const form = document.forms["bid-details"];
    const valid = form.reportValidity();

    if (!valid) return;

    const formData = new FormData(form);
    return formDataToJSON(formData);
  };

  const declineQuote = useDebouncedCallback(() => {
    postWithAuth(`/quote/decline/${params.quote_id}`, {}).then(
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

        router.push("/available-quotes");
      },
    );
  }, 350);

  const placeBid = useDebouncedCallback(() => {
    const data = getBidData();

    if (!data) return;

    postWithAuth(`/bid/${params.quote_id}`, data).then(async (response) => {
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
        text: "Your quote was submitted",
        duration: 5000,
      });
    });

    const ignoreCache = true;
    setLoading(true);
    debouncedGetQuote(ignoreCache);
  }, 350);

  if (loading) {
    return <Loading2Component />;
  }

  return (
    <div className={"av-q-page page"}>
      <div className={"container content-wrapper"}>
        <div
          style={{
            minWidth: "60%",
          }}
        >
          <QuoteFtlComponent quote={quote} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            position: existingBid?.valid_until ? "relative" : "sticky",
          }}
        >
          {!!existingBid?.valid_until && (
            <ChatComponent room={params.quote_id + ":" + existingBid?._id} />
          )}

          <div className={"place-bid"} style={{}}>
            <form name={"bid-details"}>
              <div>
                <h2>SUBMIT QUOTE</h2>

                <div className={"validity"}>
                  <div className={"svg-watch"}>
                    <Stopwatch />
                  </div>
                  <div className={"validity-title"}>
                    Submit your quote before:
                  </div>
                  <div>
                    {formatDate(quote?.deadline_date)}{" "}
                    {" " + quote?.deadline_time}
                  </div>
                </div>
              </div>

              <div>
                <div>
                  <h3>Quote Amount(per load)*</h3>
                </div>
                <div className={"amount-wrapper"}>
                  <input
                    type={"number"}
                    name={"amount"}
                    required
                    placeholder={"0"}
                    min={1}
                    defaultValue={existingBid?.amount}
                    id={"bid-amount"}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <div
                    className={"currency"}
                    style={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    {quote?.currency}
                  </div>

                  {quote?.load_number > 1 && (
                    <h5
                      style={{
                        marginLeft: "1rem",
                      }}
                    >
                      Total amount: {quote?.load_number * amount}
                    </h5>
                  )}
                </div>
              </div>

              <div>
                <h3>Transit Time(days)*</h3>
                <input
                  type={"number"}
                  name={"transit_time"}
                  required={!existingBid?.transit_time}
                  disabled={existingBid?.transit_time}
                  defaultValue={existingBid?.transit_time}
                  placeholder={"0"}
                  min={1}
                />
              </div>

              <div
                style={{
                  width: "20rem",
                }}
              >
                <h3>Quote Validity*</h3>
                <input
                  type={"date"}
                  name={"valid_until"}
                  required={!existingBid?.valid_until}
                  min={disablePastDates()}
                  defaultValue={existingBid?.valid_until ?? disablePastDates()}
                  disabled={existingBid?.valid_until}
                />
              </div>

              <div>
                <h3>Additional notes</h3>
                <textarea
                  name={"notes"}
                  rows={5}
                  disabled={existingBid?.valid_until}
                  defaultValue={existingBid?.notes}
                />
              </div>
            </form>

            <div className={"actions"}>
              <button
                className={"submit"}
                onClick={existingBid?.amount ? updateBidPrice : placeBid}
              >
                {" "}
                {existingBid?.valid_until
                  ? "Change amount"
                  : "Submit a new Quote"}
              </button>
              <button
                className={"decline"}
                onClick={() => {
                  document.getElementById("decline-action").style.display =
                    "flex";
                }}
              >
                {" "}
                or click to Decline
              </button>
              <ConfirmActionComponent
                id={"decline-action"}
                title={"Decline Quote ?"}
                action={declineQuote}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
