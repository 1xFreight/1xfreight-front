"use client";

import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { useEffect, useState } from "react";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";

export default function ViewQuotePage({
  params,
}: {
  params: { quote_id: string };
}) {
  const [quote, setQuote] = useState<any>(null);

  const getQuote = useDebouncedCallback(() => {
    getWithAuth(`/quote?limit=1&id=${params.quote_id}`).then((data) => {
      if (!data) return;
      setQuote(data?.quotes[0]);
    });
  });

  useEffect(() => {
    getQuote();
  }, []);

  if (!quote) return <Loading2Component />;

  return (
    <div className={"page"}>
      <div className={"container"}>
        <div
          style={{
            maxWidth: "70rem",
            margin: "1.5rem",
            width: "100%",
          }}
        >
          <QuoteFtlComponent quote={quote} />
        </div>
      </div>
    </div>
  );
}
