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

  const x = {
    items: [
      {
        commodity: "123",
        emergency_phone: "",
        emergency_phone2: "",
        freight_class: "50",
        height: "15",
        length: "15",
        nmfc: "123",
        quantity: "123",
        stackable: "on",
        mixed_pallet: "on",
        sub_class: "123",
        handling_unit: "Pallets",
        un_number: "",
        weight: "244",
        width: "15",
      },
      {
        commodity: "23",
        emergency_phone: "+1231231313",
        emergency_phone2: "",
        emergency_contact: "Emily",
        freight_class: "50",
        hazardous_material: "on",
        height: "1231",
        length: "123",
        nmfc: "23",
        quantity: "123",
        stackable: "on",
        sub_class: "23",
        handling_unit: "Other",
        un_number: "2342",
        weight: "123",
        width: "1231",
      },
      {
        commodity: "123",
        emergency_phone: "",
        emergency_phone2: "",
        freight_class: "50",
        height: "15",
        length: "15",
        nmfc: "123",
        quantity: "123",
        stackable: "on",
        sub_class: "123",
        handling_unit: "Rolls",
        mixed_pallet: "on",
        un_number: "",
        weight: "244",
        width: "15",
      },
      {
        commodity: "123",
        emergency_phone: "",
        emergency_phone2: "",
        freight_class: "50",
        height: "15",
        length: "15",
        nmfc: "123",
        quantity: "123",
        stackable: "on",
        sub_class: "123",
        handling_unit: "Crates",
        un_number: "",
        weight: "244",
        width: "15",
      },
      {
        commodity: "23",
        emergency_phone: "+1231231313",
        emergency_phone2: "+1231231313",
        emergency_contact: "Emily",
        freight_class: "50",
        hazardous_material: "on",
        height: "1231",
        length: "123",
        nmfc: "23",
        quantity: "123",
        stackable: "on",
        sub_class: "23",
        handling_unit: "Containers",
        un_number: "21312341",
        weight: "123",
        width: "1231",
      },
      {
        commodity: "123",
        emergency_phone: "",
        emergency_phone2: "",
        freight_class: "50",
        height: "15",
        length: "15",
        nmfc: "123",
        quantity: "123",
        stackable: "on",
        sub_class: "123",
        handling_unit: "Other",
        un_number: "",
        weight: "244",
        width: "15",
        mixed_pallet: "on",
      },
    ],
    notes: "1sadadawdawda",
    reference_no0: "213123",
    reference_type0: "Unknown",
    goods_value: "7500",
    totalSkidSpots: 12,
    totalVolume: 200,
    totalWeight: 34343,
    totalDensity: 1232,
  };

  const getQuoteAndReq = useDebouncedCallback(() => {
    getWithAuth(`/quote/shipments?limit=1&id=${params.quote_id}`).then(
      (data) => {
        const xx = formatShipmentLTL(x);

        setQuote({ ...data?.quotes[0], details: [xx] });
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
        title={"Are you sure you want to cancel this load ?"}
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
                <Delete /> Cancel Load
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
                title={`with ${quote?.carrier?.email}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
