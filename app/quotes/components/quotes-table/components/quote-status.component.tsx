import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import React from "react";

interface QuoteStatusI {
  status: QuoteStatusEnum;
}

function QuoteStatusComponent({ status }: QuoteStatusI) {
  return (
    <div className={`active-quote-status ${status.toUpperCase()}`}>
      {status.toUpperCase()}
    </div>
  );
}

export default React.memo(QuoteStatusComponent);
