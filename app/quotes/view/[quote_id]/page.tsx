"use client";

import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { useEffect, useState } from "react";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import ArrowRight from "@/public/icons/24px/arrow-right.svg";
import Cross from "@/public/icons/24px/cross.svg";
import "./styles.css";
import { useRouter } from "next/navigation";

export default function ViewQuotePage({
  params,
}: {
  params: { quote_id: string };
}) {
  const [quote, setQuote] = useState<any>(null);
  const router = useRouter();

  const getQuote = useDebouncedCallback(
    () => {
      getWithAuth(`/quote?limit=1&id=${params.quote_id}`).then((data) => {
        if (!data) return;
        setQuote(data?.quotes[0]);
      });
    },
    300,
    { leading: true },
  );

  useEffect(() => {
    getQuote();
  }, []);

  if (!quote) return <Loading2Component />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
      className={"container"}
    >
      <div className={"view-page"}>
        <div className={"menu-sticky"}>
          <div className={"go-back-wrapper"}>
            <button className={"go-back-btn"} onClick={() => router.back()}>
              <ArrowRight />
            </button>
          </div>
        </div>

        <div className={"view-quote-wrapper"}>
          <QuoteFtlComponent quote={quote} />
        </div>

        <div className={"menu-sticky"}>
          <button className={"cancel-btn"}>
            <Cross />
          </button>
        </div>
      </div>
    </div>
  );
}
