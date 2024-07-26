"use client";
import "./styles.css";
import ModeOfTransportationComponent from "@/app/get-quote/components/mode-of-transportation.component";
import dynamic from "next/dynamic";
const TemplatesPage = dynamic(
  () => import("@/app/get-quote/components/templates/rq-templates.component"),
);

export default function GetQuotePage() {
  return (
    <div className={"get-quote-page container"}>
      <TemplatesPage />
      {/*<ModeOfTransportationComponent />*/}
    </div>
  );
}
