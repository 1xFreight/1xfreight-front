"use client";

import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import { useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import "./styles.css";
import numberCommaFormat from "@/common/utils/number-comma.utils";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import ChatComponent from "@/common/components/chat/chat.component";

export default function RequestIdPage({
  params,
}: {
  params: {
    quote_id: string;
    request_id: string;
  };
}) {
  const { setQuoteId, getRequest, quote } = useQuoteContext();
  const [request, setRequest] = useState();

  useEffect(() => {
    setRequest(getRequest(params.request_id));
  }, [quote]);

  useEffect(() => {
    if (!quote) {
      setQuoteId(params.quote_id);
    }
  }, []);

  useEffect(() => {
    console.log(request);
  }, [request]);

  if (!request) return <LoadingComponent />;
  if (!quote) return <LoadingComponent />;

  return (
    <div className={"request-id-page container"}>
      <div className={"content-wrapper"}>
        <div className={"request-column"}>
          <div className={"request-wrapper"}>
            <div>
              <div className={"price-wrapper"}>
                <div className={"price"}>
                  <div className={"full-price"}>
                    <span>$</span>
                    {numberCommaFormat(request.price)}
                  </div>
                  <div className={"currency"}>USD</div>
                </div>
                <h5>Per Load</h5>
              </div>

              <div className={"valid-until"}>
                <h6>Valid Until</h6>
                <h2>{request.date}</h2>
                <div
                  className={`sub-text ${request.status}`}
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {request.status}
                </div>
              </div>

              <div className={"transit-time"}>
                <h6>Transit Time</h6>
                <h2>{request.transitTime}</h2>
                <div className={`sub-text`}>days</div>
              </div>

              <div className={"partner"}>
                <h6>Partner</h6>
                <h2>{request.company}</h2>
                <div className={`sub-text`}>{request.email}</div>
              </div>
            </div>

            {request.notes && (
              <div className={"notes"}>
                <h5>Additional notes:</h5>
                <span>{request.notes}</span>
              </div>
            )}
          </div>

          <QuoteFtlComponent
            quote={{
              type: "FTL",
              shipment: {
                commodity: "21312sda",
                emergency_name: "dssdfsdfs",
                emergency_phone: "12312313232",
                emergency_phone2: "",
                goods_value: "233233323",
                hazardous_goods: "yes",
                max_temp_reefer: "15",
                min_temp_reefer: "-15",
                packing_method: "PALLETIZED",
                packing_type: "Unknown",
                quantity: "2323",
                reference_no0: "34242342",
                reference_no1: "66456666",
                reference_no2: "767676767",
                special_instructions:
                  "Prioritize safety by adhering to established protocols for FTL travel. Regular maintenance of FTL drives and thorough training " +
                  "for personnel are essential.Prioritize safety by adhering to established protocols for FTL travel. Regular maintenance of FTL " +
                  "drives and thorough training for personnel are essential.",
                un_id_number: "132131313",
                weight: "231313",
                weight_type: "LB",
                equipment_type: "reefer",
              },
              pickup: [
                {
                  LAF: "on",
                  LGDR: "on",
                  addTime: "no",
                  address: "Miami Beach , MI12323",
                  date: "2024-08-02",
                  deliveryLocationType: "Business",
                  locationNotes: "Astarojna cum dai zadnea la intrare",
                  locationTimeStart: "any",
                  shippingHoursType: "BY_APPOINTMENT",
                },
                {
                  addTime: "yes",
                  address: "Boulverdul Dacia 112/1 , MD9999",
                  date: "2024-08-02",
                  deliveryLocationType: "Business",
                  locationNotes: "",
                  locationTimeStart: "Any time during business hours",
                  shippingHoursType: "BY_APPOINTMENT",
                },
                {
                  addTime: "yes",
                  address: "str. Zadnipru 69/69 ",
                  date: "2024-08-02",
                  deliveryLocationType: "Business",
                  locationNotes: "Suna din timp",
                  locationTimeStart: "5:30 AM",
                  locationTimeEnd: "8:30 AM",
                  shippingHoursType: "BY_APPOINTMENT",
                },
                {
                  addTime: "no",
                  address: "str. Zadnipru 69/69 ",
                  date: "2024-08-02",
                  deliveryLocationType: "Business",
                  locationNotes: "",
                  locationTimeStart: "5:30 AM",
                  locationTimeEnd: "8:30 AM",
                  shippingHoursType: "BY_APPOINTMENT",
                },
              ],

              drop: [
                {
                  LAF: "on",
                  LGDR: "on",
                  addTime: "no",
                  address: "Miami Beach , MI12323",
                  date: "2024-08-02",
                  deliveryLocationType: "Business",
                  locationNotes: "Astarojna cum dai zadnea la intrare",
                  locationTimeStart: "any",
                  shippingHoursType: "BY_APPOINTMENT",
                },
                {
                  addTime: "yes",
                  address: "Boulverdul Dacia 112/1 , MD9999",
                  date: "2024-08-02",
                  deliveryLocationType: "Business",
                  locationNotes: "",
                  locationTimeStart: "Any time during business hours",
                  shippingHoursType: "BY_APPOINTMENT",
                },
                {
                  addTime: "yes",
                  address: "str. Zadnipru 69/69 ",
                  date: "2024-08-02",
                  deliveryLocationType: "Business",
                  locationNotes: "Suna din timp",
                  locationTimeStart: "5:30 AM",
                  locationTimeEnd: "8:30 AM",
                  shippingHoursType: "BY_APPOINTMENT",
                },
                {
                  addTime: "no",
                  address: "str. Zadnipru 69/69 ",
                  date: "2024-08-02",
                  deliveryLocationType: "Business",
                  locationNotes: "",
                  locationTimeStart: "5:30 AM",
                  locationTimeEnd: "8:30 AM",
                  shippingHoursType: "BY_APPOINTMENT",
                },
              ],
            }}
          />
        </div>

        <div className={"chat-column"}>
          <div className={"accept-quote"}>
            <button>Accept Quote</button>
            <div className={"sub-text"}>
              Total Amount: ${numberCommaFormat(quote.price)}.00
            </div>
          </div>
          <div className={"chat-wrapper"}>
            <ChatComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
