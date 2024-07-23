import { ActiveQuoteStatusEnum } from "@/common/enums/active-quote-status.enum";

interface QuoteStatusI {
  status: ActiveQuoteStatusEnum;
}

export default function QuoteStatusComponent({ status }: QuoteStatusI) {
  return <div className={`active-quote-status ${status}`}>{status}</div>;
}
