import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";

export interface QuoteAddressI {
  address: string;
  date: string;
}

export interface QuotePreviewI {
  id: string;
  status: QuoteStatusEnum;
  pickupAddress: QuoteAddressI[];
  dropAddress: QuoteAddressI[];
  weight: number;
  weightDetails: string;
  ref: string;
  refDetails: string;
  equipment: string;
  price: number;
  currency: string;
  type: QuoteTypeEnum;
}
