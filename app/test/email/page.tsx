"use client";

import { useEffect, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
// import "./styles.css";

export default function EmailPage() {
  const [quote, setQuote] = useState(null);
  const quoteIdLTL = "66ebe7fd5cf0e3a894c9e508";
  const quoteIdFTL = "66d72d0f4aae7a6c10a21436";
  const quoteDetails = useMemo(() => {
    return { ...quote, ...quote?.details[0] };
  }, [quote]);

  const getQuoteAndReq = useDebouncedCallback(() => {
    getWithAuth(`/quote/shipments?limit=1&id=${quoteIdFTL}`).then((data) => {
      setQuote({ ...data?.quotes[0] });
    });
  });

  useEffect(() => {
    getQuoteAndReq();
  }, []);

  if (!quote) return;

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "475px",
          background: "rgba(0, 32, 221, 0.075)",
          padding: "24px",
          border: "2px solid rgba(0, 32, 221, 0.1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "14px",
        }}
      >
        <h3
          style={{
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          TRUCKING CO
        </h3>

        <p>
          New{" "}
          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
              color: "#0020DD",
            }}
          >
            FTL
          </span>{" "}
          quote, from <span>Naperville, IL</span> to
          <span> North Vancouver, BC, Canada</span> [AE8FE0C]
        </p>

        {!!quote?.equipments?.length && (
          <p>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Equipments:
            </span>{" "}
            {quote.equipments.join(",")}
          </p>
        )}

        <div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Pickup
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Drop:
          </p>
        </div>

        <p>
          <span
            style={{
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Commodity:
          </span>{" "}
          {quote.details[0].commodity}
        </p>

        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href={""}
            target={"_blank"}
            style={{
              display: "flex",
              alignItems: "center",
              color: "#ED0000",
            }}
          >
            Decline quote
          </a>

          <a
            href={""}
            target={"_blank"}
            style={{
              display: "flex",
              alignItems: "center",
              color: "#0020DD",
            }}
          >
            View Quote{" "}
            <svg
              viewBox="0 0 24 24"
              id="_24x24_On_Light_Next"
              data-name="24x24/On Light/Next"
              xmlns="http://www.w3.org/2000/svg"
              width={30}
            >
              <rect
                id="view-box"
                width="24"
                height="24"
                fill="#0020DD"
                opacity="0"
              />
              <path
                id="Shape"
                d="M10.22,9.28a.75.75,0,0,1,0-1.06l2.72-2.72H.75A.75.75,0,0,1,.75,4H12.938L10.22,1.281A.75.75,0,1,1,11.281.22l4,4a.749.749,0,0,1,0,1.06l-4,4a.75.75,0,0,1-1.061,0Z"
                transform="translate(4.25 7.25)"
                fill="#0020DD"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
