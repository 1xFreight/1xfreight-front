import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import React from "react";

interface QuoteActionButtonI {
  status: QuoteStatusEnum;
}

function QuoteActionButtonComponent({ status, number }: QuoteActionButtonI) {
  const textMapping = {
    [QuoteStatusEnum.CANCELED]: "View",
    [QuoteStatusEnum.REQUESTED]: "Awaiting Quotes",
    [QuoteStatusEnum.BOOKED]: `View ${number ?? ""} Quotes`,
  };

  return (
    <button
      className={`quote-action-button ${status == QuoteStatusEnum.BOOKED ? "variant2" : ""} ${status == QuoteStatusEnum.CANCELED ? "red-variant" : ""}`}
      // disabled={status === QuoteStatusEnum.REQUESTED}
    >
      {textMapping[status]}
    </button>
  );
}

export default React.memo(QuoteActionButtonComponent);
