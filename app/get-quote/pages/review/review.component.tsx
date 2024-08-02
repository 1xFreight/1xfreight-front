"use client";

import "./styles.css";
import Calendar from "@/public/icons/24px/calendar.svg";
import Clock from "@/public/icons/24px/clock.svg";
import { disablePastDates } from "@/common/utils/date.utils";
import { generatePickHours } from "@/common/utils/time.utils";
import { CurrencyEnum } from "@/common/enums/currency.enum";
import React, { useEffect, useState } from "react";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import Cross from "@/public/icons/24px/cross.svg";
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";

export default function ReviewComponent() {
  const { getData } = useRegisterQuoteContext();
  const [emailList, setEmailList] = useState(["test@mail.next"]);
  const [quote, setQuote] = useState<any>();

  useEffect(() => {
    // setEmailList(getData("partners"));

    const pickup = getData("pickup");
    const drop = getData("drop");
    const shipment = getData("shipment_details");
    setQuote({ pickup, drop, shipment });
    console.log({ pickup, drop, shipment });
  }, [getData]);

  const removeItem = (email: string) => {
    setEmailList(emailList.filter((em) => em !== email));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEmailList([...emailList, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <div className={"review-page"}>
      <div className={"review-send"}>
        <h2>Review & Send</h2>

        <div className={"inputs"}>
          <div className={"deadline-date"}>
            <h3>Deadline to quote</h3>

            <div className={"form-input-wrapper"}>
              <Calendar />

              <input
                type={"date"}
                min={disablePastDates()}
                name={"deadline_date"}
                defaultValue={disablePastDates()}
              />
            </div>
          </div>

          <div className={"form-input-wrapper"}>
            <Clock />
            <select name={"deadline_time"}>
              {generatePickHours().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          <div className={"currency"}>
            <h3>Currency</h3>

            <select name={"currency"} defaultValue={CurrencyEnum.USD}>
              {Object.values(CurrencyEnum).map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={"quote-type"}>
          <h3>Type of quote</h3>

          <div className={"radio-btn"}>
            <div className={"radio-yes"}>
              <input type={"radio"} name={"quote_type"} value={"live_load"} />
              <h5>Live load</h5>
            </div>
            <div className={"radio-no"}>
              <input
                type={"radio"}
                name={"quote_type"}
                value={"quote"}
                defaultChecked
              />
              <h5>Quote</h5>
            </div>
          </div>
        </div>

        <div className={"selected-partners"}>
          {emailList &&
            emailList.map((email, index) => (
              <div key={email + index} className={"email-item"}>
                {email}

                <div onClick={() => removeItem(email)}>
                  <Cross />
                </div>
              </div>
            ))}
          <input
            type={"text"}
            className={"chip-input"}
            placeholder={"Type here..."}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {quote && (
        <QuoteFtlComponent
          quote={{
            shipment: {
              commodity: "21312sda",
              emergency_name: "dssdfsdfs",
              emergency_phone: "12312313232",
              emergency_phone2: "",
              goods_value: "233233323",
              hazardous_goods: "yes",
              max_temp_reefer: "",
              min_temp_reefer: "",
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
      )}

      <div>.</div>
    </div>
  );
}
