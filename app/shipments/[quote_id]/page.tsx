"use client";

import { useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import "./styles.css";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import ChatComponent from "@/common/components/chat/chat.component";
import { mockBids } from "@/app/quotes/[quote_id]/mockBids";
import { mockData } from "@/app/quotes/components/quotes-table/mock-data";
import BreadcrumbsComponent from "@/app/components/breadcrumbs/breadcrumbs.component";
import Marker from "@/public/icons/24px/marker.svg";
import Delete from "@/public/icons/24px/delete 1.svg";
import ShipmentStatusComponent, {
  ShipmentStatusEnum,
} from "@/app/shipments/[quote_id]/components/shipment-status.component";
import BottomMenuComponent from "@/app/shipments/[quote_id]/components/bottom-menu.component";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { formatDate } from "@/common/utils/date.utils";
import {
  formatShipmentLTL,
  toShortId,
} from "@/common/utils/data-convert.utils";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";

export default function ShipmentIdPage({
  params,
}: {
  params: {
    quote_id: string;
  };
}) {
  const [request, setRequest] = useState<any>();
  const [quote, setQuote] = useState<any>();

  const getQuoteAndReq = useDebouncedCallback(() => {
    getWithAuth(`/quote/shipments?limit=1&id=${params.quote_id}`).then(
      (data) => {
        setQuote({ ...data?.quotes[0] });
        setRequest(data?.quotes[0].bid);
      },
    );
  });

  useEffect(() => {
    getQuoteAndReq();
  }, []);

  if (!request) return <LoadingComponent />;
  if (!quote) return <LoadingComponent />;

  return (
    <div className={"shipment-id-page"}>
      <BottomMenuComponent />
      <ConfirmActionComponent
        id={"confirm-cancel-load"}
        title={"Cancel this load ?"}
      />
      <div className={"container"}>
        <div className={"page-header"}>
          <div className={"breadcrumbs"}>
            <BreadcrumbsComponent
              items={[
                {
                  title: "Shipments",
                },
                {
                  title: `Load #${toShortId(quote._id)}`,
                },
              ]}
            />

            <div>
              <button
                className={"cancel"}
                onClick={() => {
                  document.getElementById("confirm-cancel-load").style.display =
                    "flex";
                }}
              >
                <Delete /> Cancel load
              </button>
            </div>
          </div>

          <ShipmentStatusComponent status={quote.status} />
        </div>

        <div className={"content-wrapper"}>
          <div className={"shipment-column"}>
            <div className={"shipment-wrapper"}>
              <div>
                <div className={"price-wrapper"}>
                  <div className={"price"}>
                    <div className={"full-price"}>
                      <span>$</span>
                      {numberCommaFormat(request.amount)}
                    </div>
                    <div className={"currency"}>USD</div>
                  </div>
                  <h5>Per Load</h5>
                </div>

                <div className={"transit-time"}>
                  <h6>Transit Time</h6>
                  <h2>{request.transit_time}</h2>
                  <div className={`sub-text`}>days</div>
                </div>

                <div className={"partner"}>
                  <h6>Partner</h6>
                  <h2>{quote?.carrier?.email}</h2>
                </div>
              </div>

              {request?.notes && (
                <div className={"notes"}>
                  <h5>Additional notes:</h5>
                  <span>{request?.notes}</span>
                </div>
              )}
            </div>

            <QuoteFtlComponent quote={quote} />
          </div>

          <div className={"chat-column"}>
            <div className={"chat-wrapper"}>
              <ChatComponent
                room={params.quote_id + ":" + request?._id}
                title={`${quote?.local_carrier?.name ?? quote?.carrier?.email}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
