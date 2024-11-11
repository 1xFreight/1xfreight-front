import { ReactNode } from "react";
import "./styles.css";
import QPreviewComponent from "@/app/quotes/[quote_id]/components/q-preview.component";
import QBreadcrumbsComponent from "@/app/quotes/[quote_id]/components/q-breadcrumbs.component";
import QuoteContextProviderWrapper from "@/app/quotes/[quote_id]/quote-context.provider";
import MissingDataComponent from "@/app/quotes/[quote_id]/components/missing-data.component";

export default function QuoteLayout({
  children,
}: {
  children: ReactNode;
  params: {
    quote_id: string;
  };
}) {
  return (
    <>
      <QuoteContextProviderWrapper>
        <MissingDataComponent />
        <div className={"quote-bids-page page"}>
          <QBreadcrumbsComponent />
          <QPreviewComponent />

          {children}
        </div>
      </QuoteContextProviderWrapper>
    </>
  );
}
