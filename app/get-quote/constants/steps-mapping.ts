import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";
import { FtlLtlStepsEnum } from "@/app/get-quote/enums/ftl-ltl-steps.enum";
import { OceanStepsEnum } from "@/app/get-quote/enums/ocean-steps.enum";

export const stepsMapping = {
  [QuoteTypeEnum.FTL]: FtlLtlStepsEnum,
  [QuoteTypeEnum.LTL]: FtlLtlStepsEnum,
  [QuoteTypeEnum.FCL]: OceanStepsEnum,
  [QuoteTypeEnum.AIR]: OceanStepsEnum,
};
