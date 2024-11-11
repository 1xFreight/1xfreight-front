import { InsuranceTypeEnum } from "@/common/enums/insurance.enum";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";

export function isCarrierInsuranceActive(
  carrier: any,
  quoteType: QuoteTypeEnum,
) {
  const inactive = [];

  if (!carrier.mc && !carrier.dot)
    return {
      status: true,
      inactive,
    };

  if (
    !carrier.insurance_auto &&
    (quoteType === QuoteTypeEnum.LTL || quoteType === QuoteTypeEnum.FTL)
  ) {
    inactive.push(InsuranceTypeEnum.AUTO);
  }

  if (!carrier.insurance_cargo && quoteType === QuoteTypeEnum.FCL) {
    inactive.push(InsuranceTypeEnum.CARGO);
  }

  if (!carrier.insurance_general) {
    inactive.push(InsuranceTypeEnum.GENERAL);
  }

  if (inactive.length) {
    return {
      status: false,
      inactive,
    };
  }
}
