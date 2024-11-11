"use client";

import { useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import "./styles.css";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import ChatComponent from "@/common/components/chat/chat.component";
import BreadcrumbsComponent from "@/app/components/breadcrumbs/breadcrumbs.component";
import Marker from "@/public/icons/24px/marker.svg";
import Delete from "@/public/icons/24px/delete 1.svg";
import ShipmentStatusComponent from "@/app/shipments/[quote_id]/components/shipment-status.component";
import BottomMenuComponent from "@/app/shipments/[quote_id]/components/bottom-menu.component";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import { formatDate } from "@/common/utils/date.utils";
import {
  formatShipmentLTL,
  toShortId,
} from "@/common/utils/data-convert.utils";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import ModalComponent from "@/common/components/modal/modal.component";
import useStore from "@/common/hooks/use-store.context";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import { useRouter } from "next/navigation";

export default function ShipmentIdPage({
  params,
}: {
  params: {
    quote_id: string;
  };
}) {
  const [request, setRequest] = useState<any>();
  const [quote, setQuote] = useState<any>();
  const { triggerUpdate, addToStore } = useStore();
  const [loading, setLoading] = useState(true);
  const { showToast } = useStore();
  const router = useRouter();

  const getQuoteAndReq = useDebouncedCallback(() => {
    getWithAuth(`/quote/shipments?limit=1&id=${params.quote_id}`).then(
      (data) => {
        setQuote({ ...data?.quotes[0] });
        setRequest(data?.quotes[0].bid);
        addToStore({ name: "shipment_quote", data: data?.quotes[0] });
        setLoading(false);
      },
    );
  });

  useEffect(() => {
    setLoading(true);
    getQuoteAndReq();
  }, [triggerUpdate]);

  const cancelLoad = useDebouncedCallback(() => {
    postWithAuth(`/quote/cancel/${params.quote_id}`, {}).then(
      async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          return showToast({
            type: ToastTypesEnum.ERROR,
            text: errorData.message || "Something went wrong",
            duration: 5000,
          });
        }

        showToast({
          type: ToastTypesEnum.SUCCESS,
          text: "Quote was canceled",
          duration: 5000,
        });

        router.push(`/shipments`);
      },
    );
  }, 300);

  if (loading || !request || !quote) {
    return <Loading2Component />;
  }

  return (
    <div className={"shipment-id-page"}>
      <BottomMenuComponent quoteId={params.quote_id} />
      <ConfirmActionComponent
        id={"confirm-cancel-load"}
        title={"Cancel this load ?"}
        action={cancelLoad}
      />
      <div className={"container"}>
        <div className={"page-header"}>
          <div className={"breadcrumbs"}>
            <BreadcrumbsComponent
              items={[
                {
                  title: "Shipments",
                  href: "/shipments",
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
                      {numberCommaFormat(request?.amount)}
                    </div>
                    <div className={"currency"}>{quote.currency}</div>
                  </div>

                  <h5>per load</h5>
                </div>

                <div className={"transit-time"}>
                  <h6>Transit Time</h6>
                  <h2>{request.transit_time}</h2>
                  <h6>days</h6>
                </div>

                <div className={"partner"}>
                  <h6>Partner</h6>
                  <h2>{quote?.local_carrier?.name}</h2>
                  <h6>{quote?.carrier?.email}</h6>
                </div>
              </div>

              {request.notes && (
                <div className={"notes"}>
                  <h5>Additional notes:</h5>
                  <span>{request.notes}</span>
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
