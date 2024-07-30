"use client";
import "./styles.css";
import ModeOfTransportationComponent from "@/app/get-quote/components/mode-of-transportation.component";
import dynamic from "next/dynamic";
import LocationFormComponent from "@/app/get-quote/components/ftl-ltl-forms/location-form.component";
import PickupPageComponent from "@/app/get-quote/pages/ftl-ltl-pickup-drop/pickup-page.component";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import DropPageComponent from "@/app/get-quote/pages/ftl-ltl-pickup-drop/drop-page.component";
const TemplatesPage = dynamic(
  () => import("@/app/get-quote/pages/templates/rq-templates.component"),
);

export default function GetQuotePage() {
  const { stepNumber } = useRegisterQuoteContext();

  const steps = [
    <ModeOfTransportationComponent key={"page-1"} />,
    <TemplatesPage key={"page-2"} />,
    <PickupPageComponent key={"page-3"} />,
    <DropPageComponent key={"page-4"} />,
  ];

  return (
    <div
      className={"get-quote-page container"}
      style={{
        position: stepNumber === 1 ? "absolute" : "relative",
      }}
    >
      {/*<TemplatesPage />*/}
      {/*<ModeOfTransportationComponent />*/}
      {/*<LocationFormComponent />*/}
      {/*<PickupPageComponent />*/}
      {steps[stepNumber - 1]}
    </div>
  );
}
