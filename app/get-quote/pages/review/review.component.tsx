"use client";

import "./styles.css";
import Calendar from "@/public/icons/24px/calendar.svg";
import Clock from "@/public/icons/24px/clock.svg";
import { disablePastDates } from "@/common/utils/date.utils";
import { generatePickHours } from "@/common/utils/time.utils";
import { CurrencyEnum } from "@/common/enums/currency.enum";
import React, { useEffect, useMemo, useState } from "react";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import Cross from "@/public/icons/24px/cross.svg";

export default function ReviewComponent() {
  const { getData } = useRegisterQuoteContext();
  const [emailList, setEmailList] = useState([]);

  useEffect(() => {
    setEmailList(getData("partners"));
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
    </div>
  );
}
