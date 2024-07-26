import { ReactNode } from "react";
import LeftStepsMenuComponent from "@/app/get-quote/components/left-steps-menu/left-steps-menu.component";
import RqContextProvider from "@/app/get-quote/rq-context.provider";
import RqBreadcrumbsComponent from "@/app/get-quote/components/rq-breadcrumbs.component";
import StepControllerComponent from "@/app/get-quote/components/step-controller.component";

export default function GetQuoteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={"get-quote-layout"}>
      <RqContextProvider>
        <div className={"get-quote-breadcrumb"}>
          <RqBreadcrumbsComponent />
        </div>
        <LeftStepsMenuComponent>{children}</LeftStepsMenuComponent>
        <StepControllerComponent />
      </RqContextProvider>
    </div>
  );
}
