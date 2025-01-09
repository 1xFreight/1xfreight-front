"use client";

import Image from "next/image";
import FTL from "@/public/png/full-truck.png";
import LTL from "@/public/png/half-truck.png";
import Ocean from "@/public/png/ocean-transportation.png";
import Air from "@/public/png/air-transportation.png";
import Truck3d from "@/public/icons/3d/truck.png";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";

export default function ModeOfTransportationComponent() {
  const { setType, setStepNumber, addBreadcrumb } = useRegisterQuoteContext();

  const selectType = (type: QuoteTypeEnum) => {
    setType(type);
    setStepNumber(2);
    addBreadcrumb(type);
  };

  return (
    <div className={"container select-trans-mode"}>
      <h2>Mode of transportation</h2>
      <h4>Select the appropriate mode of transportation</h4>
      <div className={"mode-of-transportations"}>
        <div
          className={"item-mode"}
          onClick={() => selectType(QuoteTypeEnum.FTL)}
        >
          <Image
            src={FTL}
            alt={"FTL image"}
            width={1024}
            // className={"truck-3d"}
          />
          <h2>FTL</h2>
        </div>

        <div
          className={"item-mode"}
          onClick={() => selectType(QuoteTypeEnum.LTL)}
        >
          <Image src={LTL} alt={"LTL image"} width={166} />
          <h2>LTL</h2>
        </div>

        <div
          className={"item-mode"}
          onClick={() => selectType(QuoteTypeEnum.FCL)}
        >
          <Image src={Ocean} alt={"FCL image"} width={160} />
          <h2>FCL</h2>
        </div>

        <div
          className={"item-mode AIR"}
          // onClick={() => selectType(QuoteTypeEnum.AIR)}
        >
          <Image src={Air} alt={"Air image"} width={197} />
          <h2>COMING SOON</h2>
        </div>
      </div>
    </div>
  );
}
