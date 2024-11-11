"use client";

import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import React from "react";
import { stepsMapping } from "@/app/get-quote/constants/steps-mapping";

function StepControllerComponent() {
  const { stepNumber, setStepNumber, validateAndGoForward, type } =
    useRegisterQuoteContext();

  return (
    <>
      {stepNumber != 1 && (
        <div className={"rq-step-controller fade-in-bottom"}>
          <button
            className={"back-btn"}
            disabled={stepNumber == 3}
            onClick={() => setStepNumber((numb) => numb - 1)}
          >
            Back
          </button>
          <button className={"next-btn"} onClick={() => validateAndGoForward()}>
            {stepNumber === Object.keys(stepsMapping[type]).length
              ? "Send"
              : "Next"}
          </button>
        </div>
      )}
    </>
  );
}

export default React.memo(StepControllerComponent);
