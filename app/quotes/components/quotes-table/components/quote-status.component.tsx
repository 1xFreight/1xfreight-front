import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";

interface QuoteStatusI {
  status: QuoteStatusEnum;
}

export default function QuoteStatusComponent({ status }: QuoteStatusI) {
  return <div className={`active-quote-status ${status}`}>{status}</div>;
}
