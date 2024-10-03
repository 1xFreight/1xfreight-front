import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import React from "react";

interface QuoteActionButtonI {
  status: QuoteStatusEnum;
}

function QuoteActionButtonComponent({ status, number }: QuoteActionButtonI) {
  const textMapping = {
    // [QuoteStatusEnum.CONFIRMED]: "View Request",
    [QuoteStatusEnum.REQUESTED]: "Awaiting Quotes",
    [QuoteStatusEnum.BOOKED]: `View ${number ?? ""} Quotes`,
  };

  return (
    <button
      className={`quote-action-button`}
      disabled={status === QuoteStatusEnum.REQUESTED}
    >
      {textMapping[status]}
    </button>
  );
}

export default React.memo(QuoteActionButtonComponent);
