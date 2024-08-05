"use client";

import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import React from "react";

function StepControllerComponent() {
  const { stepNumber, setStepNumber, validateAndGoForward } =
    useRegisterQuoteContext();

  return (
    <>
      {stepNumber != 1 && (
        <div className={"rq-step-controller fade-in-bottom"}>
          <button
            className={"back-btn"}
            onClick={() => setStepNumber((numb) => numb - 1)}
          >
            Back
          </button>
          <button className={"next-btn"} onClick={() => validateAndGoForward()}>
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default React.memo(StepControllerComponent);
