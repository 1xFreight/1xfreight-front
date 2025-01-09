"use client";
import "./styles.css";
import ModeOfTransportationComponent from "@/app/get-quote/components/mode-of-transportation.component";
import dynamic from "next/dynamic";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import PageWrapperComponent from "@/app/get-quote/components/page-wrapper.component";
import { useEffect, useState } from "react";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";

const TemplatesPage = dynamic(
  () => import("@/app/get-quote/pages/templates/rq-templates.component"),
);

const PartnersPage = dynamic(
  () => import("@/app/get-quote/pages/partners/partners.component"),
);

const MembersPage = dynamic(
  () => import("@/app/get-quote/pages/team-members/team-members.component"),
);

const ReviewPage = dynamic(
  () => import("@/app/get-quote/pages/review/review.component"),
);

const SendPage = dynamic(
  () => import("@/app/get-quote/pages/send/send.component"),
);

export default function GetQuotePage() {
  const { stepNumber, type } = useRegisterQuoteContext();
  const [steps, setSteps] = useState([
    <ModeOfTransportationComponent key={"page-1"} />,
  ]);
  const loadSteps = () => {
    switch (type) {
      case QuoteTypeEnum.LTL: {
        const PickupPage = dynamic(
          () =>
            import(
              "@/app/get-quote/pages/pickup-drop-ftl-ltl/pickup-page.component"
            ),
        );
        const DropPage = dynamic(
          () =>
            import(
              "@/app/get-quote/pages/pickup-drop-ftl-ltl/drop-page.component"
            ),
        );

        const ShipmentDetailsLTL = dynamic(
          () =>
            import(
              "@/app/get-quote/pages/shipment-details-ltl/shipment-details-ltl.component"
            ),
        );

        setSteps([
          <ModeOfTransportationComponent key={"page-1"} />,
          <TemplatesPage key={"page-2"} />,
          <PickupPage key={"page-3"} />,
          <DropPage key={"page-4"} />,
          <ShipmentDetailsLTL key={"page-5"} />,
          <PartnersPage key={"page-6"} />,
          <MembersPage key={"page-7"} />,
          <ReviewPage key={"page-8"} />,
          <SendPage key={"page-9"} />,
        ]);

        break;
      }
      case QuoteTypeEnum.FTL: {
        const PickupPage = dynamic(
          () =>
            import(
              "@/app/get-quote/pages/pickup-drop-ftl-ltl/pickup-page.component"
            ),
        );
        const DropPage = dynamic(
          () =>
            import(
              "@/app/get-quote/pages/pickup-drop-ftl-ltl/drop-page.component"
            ),
        );

        const ShipmentDetails = dynamic(
          () =>
            import(
              "@/app/get-quote/pages/shipment-details-ftl/components/shipment-page-wrapper.component"
            ),
        );

        setSteps([
          <ModeOfTransportationComponent key={"page-1"} />,
          <TemplatesPage key={"page-2"} />,
          <PickupPage key={"page-3"} />,
          <DropPage key={"page-4"} />,
          <ShipmentDetails key={"page-5"} />,
          <PartnersPage key={"page-6"} />,
          <MembersPage key={"page-7"} />,
          <ReviewPage key={"page-8"} />,
          <SendPage key={"page-9"} />,
        ]);

        break;
      }

      case QuoteTypeEnum.FCL: {
        const RoutingAndDatesPage = dynamic(
          () =>
            import(
              "@/app/get-quote/pages/routing-and-dates/routing-and-dates.component"
            ),
        );

        setSteps([
          <ModeOfTransportationComponent key={"page-1"} />,
          <TemplatesPage key={"page-2"} />,
          <RoutingAndDatesPage key={"page-3"} />,
          <PartnersPage key={"page-6"} />,
          <MembersPage key={"page-7"} />,
          <ReviewPage key={"page-8"} />,
          <SendPage key={"page-9"} />,
        ]);

        break;
      }
    }
  };

  useEffect(() => {
    loadSteps();
  }, [type]);

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
