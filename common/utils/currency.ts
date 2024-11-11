import { CurrencyEnum } from "@/common/enums/currency.enum";

export function getCurrencySymbol(currency: CurrencyEnum): string {
  if (!currency) return "";

  switch (currency) {
    case CurrencyEnum.CAD:
      return "C$";
    case CurrencyEnum.USD:
      return "$";
    case CurrencyEnum.MXN:
      return "MX$";
    default:
      return "";
  }
}
