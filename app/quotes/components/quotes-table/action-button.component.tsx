import { ActiveQuoteStatusEnum } from "@/common/enums/active-quote-status.enum";

interface QuoteActionButtonI {
  status: ActiveQuoteStatusEnum;
}

const textMapping = {
  [ActiveQuoteStatusEnum.CONFIRMED]: "View Request",
  [ActiveQuoteStatusEnum.REQUESTED]: "Awaiting Quotes",
  [ActiveQuoteStatusEnum.BOOKED]: "View Quotes",
};

export default function QuoteActionButtonComponent({
  status,
}: QuoteActionButtonI) {
  return (
    <button
      className={`quote-action-button`}
      disabled={status === ActiveQuoteStatusEnum.REQUESTED}
    >
      {textMapping[status]}
    </button>
  );
}
