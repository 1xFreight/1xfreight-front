"use client";

import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import { useEffect, useState } from "react";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { toShortId } from "@/common/utils/data-convert.utils";
import "./styles.css";
import Check from "@/public/icons/24px/checked-tick.svg";
import Cross from "@/public/icons/24px/cross.svg";
import LoadingCircle from "@/common/components/loading/loading-circle.component";

export default function CarrierDeclineQuoteFromEmail({
  params,
}: {
  params: { quote_id: string };
}) {
  const [declineResponse, setDeclineResponse] = useState<string>("loading");

  const declineQuote = useDebouncedCallback(() => {
    postWithAuth(`/quote/decline/${params.quote_id}`, {}).then(
      async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          return setDeclineResponse(
            errorData.message || "Something went wrong",
          );
        }

        setDeclineResponse("declined");
      },
    );
  }, 350);

  useEffect(() => {
    declineQuote();
  }, []);

  return (
    <div className={"decline-quote-page container"}>
      <div className={"decline-quote-wrapper"}>
        {declineResponse === "loading" && <LoadingCircle />}
        {declineResponse === "declined" && (
          <div className={"declined"}>
            <Check />
            <h3>
              Quote <span>{toShortId(params.quote_id)}</span> was declined
              successfully
            </h3>
          </div>
        )}
        {declineResponse !== "declined" && declineResponse !== "loading" && (
          <div className={"declined error-svg"}>
            <Cross />
            <h3>
              Quote <span>{toShortId(params.quote_id)}</span> was not declined.{" "}
              {declineResponse}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
