"use client";

import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import BreadcrumbsComponent from "@/app/components/breadcrumbs/breadcrumbs.component";

export default function RqBreadcrumbsComponent() {
  const { breadcrumbs, setStepNumber } = useRegisterQuoteContext();

  return (
    <div>{breadcrumbs && <BreadcrumbsComponent items={breadcrumbs} />}</div>
  );
}
