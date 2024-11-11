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
import QuoteFtlComponent from "@/app/components/quote-details/quote-ftl.component";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";
import { isValidEmail } from "@/common/utils/email.util";
import LoadingComponent from "@/common/components/loading/loading.component";
import useStore from "@/common/hooks/use-store.context";

export default function ReviewComponent() {
  const { getData, type, canChangePage, setCanChangePage, addData } =
    useRegisterQuoteContext();
  const [emailList, setEmailList] = useState([]);
  const [quote, setQuote] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { session } = useStore();

  useEffect(() => {
    const emailPartners = getData("partners");
    const emailMembers = getData("members");
    setEmailList([...emailMembers, ...emailPartners] || []);
    const _default = getData("default");
    const apiFormat = getData("", true);
    setQuote({
      ...apiFormat,
      default: _default,
      author: { logo: session.logo, name: session.name },
    });
    console.log(apiFormat);
    setLoading(false);
  }, [getData]);

  const dataCollector = () => {
    if (emailList.length === 0) {
      const partnersEl =
        document.getElementsByClassName("selected-partners")[0];
      partnersEl.scrollIntoView({ behavior: "smooth", block: "center" });
      return setCanChangePage(PageStateEnum.INVALID);
    }

    const templateName = document.getElementsByName("template_name")[0];

    templateName.reportValidity();

    if (!templateName) {
      return setCanChangePage(PageStateEnum.INVALID);
    }

    const qType = document.getElementsByName("quote_type");
    const deadlineDate = document.getElementsByName("deadline_date")[0].value;
    const deadlineTime = document.getElementsByName("deadline_time")[0].value;
    const currency = document.getElementsByName("currency")[0].value;
    const saveTemplate = document.getElementsByName("save_template")[0].checked;

    addData({
      form: "review",
      data: {
        deadlineDate,
        deadlineTime,
        currency,
        quoteType: qType[0].checked ? qType[0].value : qType[1].value,
        saveTemplate,
        templateName: saveTemplate ? templateName.value : null,
      },
    });

    addData({
      form: "subscribers",
      data: emailList,
    });

    setCanChangePage(PageStateEnum.CAN_CHANGE);
  };

  useEffect(() => {
    if (canChangePage !== PageStateEnum.CHECK) return;

    dataCollector();
  }, [canChangePage]);

  const removeItem = (email: string) => {
    setEmailList(emailList.filter((em) => em !== email));
  };

  const handleKeyDown = (event) => {
    const el = document.getElementById("email-input-tooltip");

    if (
      isValidEmail(event.target.value) ||
      event.target.value == "" ||
      event.target.value.length === 1
    ) {
      el.style.display = "none";
    }

    if (event.key === "Enter") {
      if (isValidEmail(event.target.value)) {
        if (event.target.value)
          setEmailList([...emailList, event.target.value]);
        event.target.value = "";
      } else {
        el.style.display = "inline-block";
      }
    }
  };

  useEffect(() => {
    if (loading) return;
    const partnersEl = document.getElementsByClassName("selected-partners")[0];

    if (!emailList) {
      return;
    }

    if (emailList.length === 0) {
      partnersEl.classList.add("show-err");
    }

    if (emailList.length > 0) {
      partnersEl.classList.remove("show-err");
    }
  }, [emailList]);

  if (loading) return <LoadingComponent />;

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
                required
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

            <select
              name={"currency"}
              defaultValue={quote?.default?.currency ?? CurrencyEnum.USD}
            >
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
              <input
                type={"radio"}
                name={"quote_type"}
                value={"live_load"}
                defaultChecked={quote?.default?.quote_type === "live_load"}
              />
              <h5>Live load</h5>
            </div>
            <div className={"radio-no"}>
              <input
                type={"radio"}
                name={"quote_type"}
                value={"quote"}
                defaultChecked={quote?.default?.quote_type === "quote"}
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
          <div className={"tooltip"}>
            <input
              type={"text"}
              className={"chip-input"}
              placeholder={"Type here..."}
              onKeyDown={handleKeyDown}
            />

            <span
              className={"tooltiptext"}
              style={{
                display: "none",
                visibility: "visible",
                // background: "#ED0000",
              }}
              id={"email-input-tooltip"}
            >
              Invalid email!
            </span>
          </div>
        </div>
      </div>

      {quote && <QuoteFtlComponent quote={quote} />}

      <div className={"save-template"}>
        <div>
          <input
            type={"checkbox"}
            name={"save_template"}
            onClick={(ev) => {
              ev.target.checked
                ? document
                    .getElementsByName("template_name")[0]
                    .setAttribute("required", ev.target.checked)
                : document
                    .getElementsByName("template_name")[0]
                    .removeAttribute("required");
            }}
          />
          <h3>Save as a template</h3>
        </div>

        <input
          type={"text"}
          name={"template_name"}
          placeholder={"Template name..."}
        />
      </div>
    </div>
  );
}
