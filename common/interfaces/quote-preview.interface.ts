import { ActiveQuoteStatusEnum } from "@/common/enums/active-quote-status.enum";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";

export interface QuotePreviewI {
  id: string;
  status: ActiveQuoteStatusEnum;
  pickupAddress: string;
  pickupDate: string;
  dropAddress: string;
  dropDate: string;
  weight: number;
  weightDetails: string;
  ref: string;
  refDetails: string;
  equipment: string;
  price: number;
  currency: string;
  type: QuoteTypeEnum;
}
