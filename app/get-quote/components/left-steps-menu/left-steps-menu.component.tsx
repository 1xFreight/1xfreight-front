"use client";

import "./styles.css";
import Checked from "@/public/icons/24px/checked-tick.svg";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import { ReactNode, useMemo } from "react";
import { stepsMapping } from "@/app/get-quote/constants/steps-mapping";

export default function LeftStepsMenuComponent({
  children,
}: {
  children: ReactNode;
}) {
  const { stepNumber, type } = useRegisterQuoteContext();
  const steps = useMemo(() => Object.values(stepsMapping[type]), [type]);

  const stepStatus = (index: number) => {
    if (index > stepNumber) return "";
    if (index < stepNumber) return "checked";
    if (index === stepNumber) return "current";
  };

  return (
    <div className={"left-steps-menu"}>
      <div
        className={"steps-container-wrapper fade-in-left"}
        style={{
          display: stepNumber != 1 ? "flex" : "none",
        }}
      >
        <div className={"steps-container"}>
          <div className={"steps-line"}></div>

          {steps &&
            steps.map((step: string, index) => (
              <div className={"item-step"} key={step + index}>
                <div className={`step-number ${stepStatus(index + 1)}`}>
                  {index + 1} <Checked />
                </div>
                <div className={"step-title"}>{step}</div>
              </div>
            ))}
        </div>
      </div>

      <div className={"rq-page-wrapper"}>{children}</div>
    </div>
  );
}
