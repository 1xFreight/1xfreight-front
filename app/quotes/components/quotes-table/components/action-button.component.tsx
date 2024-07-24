import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";

interface QuoteActionButtonI {
  status: QuoteStatusEnum;
}

const textMapping = {
  [QuoteStatusEnum.CONFIRMED]: "View Request",
  [QuoteStatusEnum.REQUESTED]: "Awaiting Quotes",
  [QuoteStatusEnum.BOOKED]: "View Quotes",
};

export default function QuoteActionButtonComponent({
  status,
}: QuoteActionButtonI) {
  return (
    <button
      className={`quote-action-button`}
      disabled={status === QuoteStatusEnum.REQUESTED}
    >
      {textMapping[status]}
    </button>
  );
}
