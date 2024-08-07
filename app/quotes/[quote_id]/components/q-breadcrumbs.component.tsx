"use client";

import BreadcrumbsComponent from "@/app/components/breadcrumbs/breadcrumbs.component";
import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";

export default function QBreadcrumbsComponent() {
  const { breadcrumbs } = useQuoteContext();

  return (
    <div className={"page-breadcrumb"}>
      <BreadcrumbsComponent items={breadcrumbs} />
    </div>
  );
}
