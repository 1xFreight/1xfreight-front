"use client";
import "./styles.css";
import ModeOfTransportationComponent from "@/app/get-quote/components/mode-of-transportation.component";
import dynamic from "next/dynamic";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import PageWrapperComponent from "@/app/get-quote/components/page-wrapper.component";
const TemplatesPage = dynamic(
  () => import("@/app/get-quote/pages/templates/rq-templates.component"),
);
const PickupPage = dynamic(
  () =>
    import("@/app/get-quote/pages/ftl-ltl/pickup-drop/pickup-page.component"),
);
const DropPage = dynamic(
  () => import("@/app/get-quote/pages/ftl-ltl/pickup-drop/drop-page.component"),
);
const ShipmentDetails = dynamic(
  () =>
    import(
      "@/app/get-quote/pages/ftl-ltl/shipment-details/shipment-details.component"
    ),
);

export default function GetQuotePage() {
  const { stepNumber } = useRegisterQuoteContext();

  const steps = [
    <ModeOfTransportationComponent key={"page-1"} />,
    <TemplatesPage key={"page-2"} />,
    <PickupPage key={"page-3"} />,
    <DropPage key={"page-4"} />,
    <ShipmentDetails key={"page-5"} />,
  ];

  return (
    <div
      className={"get-quote-page container"}
      style={{
        position: stepNumber === 1 ? "absolute" : "relative",
      }}
    >
      {steps.map((page, index) => (
        <PageWrapperComponent
          key={index + "-rq-page"}
          freeze={stepNumber !== index + 1}
        >
          <div
            style={{
              width: "100%",
            }}
          >
            {page}
          </div>
        </PageWrapperComponent>
      ))}
    </div>
  );
}
