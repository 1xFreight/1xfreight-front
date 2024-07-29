"use client";
import "./styles.css";
import ModeOfTransportationComponent from "@/app/get-quote/components/mode-of-transportation.component";
import dynamic from "next/dynamic";
import PickupFormComponent from "@/app/get-quote/components/ftl-ltl-forms/pickup-form.component";
const TemplatesPage = dynamic(
  () => import("@/app/get-quote/components/templates/rq-templates.component"),
);

export default function GetQuotePage() {
  return (
    <div className={"get-quote-page container"}>
      {/*<TemplatesPage />*/}
      {/*<ModeOfTransportationComponent />*/}
      <PickupFormComponent />
    </div>
  );
}
