"use client";

import ReferenceItemsComponent from "@/app/get-quote/pages/shipment-details-ftl/components/reference-items.component";
import useStore from "@/common/hooks/use-store.context";
import React, { useEffect, useState } from "react";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { disablePastDates } from "@/common/utils/date.utils";
import { generatePickHours } from "@/common/utils/time.utils";
import { useRouter } from "next/navigation";
import SwitchComponent from "@/common/components/slider/switch.component";
import Sparkle from "@/public/png/sparkle.png";
import Image from "next/image";

export function SaveAsTemplate() {
  return (
    <div>
      <form name={"save_as_template"} className={"save-as-template"}>
        <h5>Template name:</h5>
        <input
          type={"text"}
          placeholder={"Type here..."}
          name={"name"}
          required
        />
      </form>
    </div>
  );
}

export function AddPO() {
  return (
    <div
      className={"shipment-details-page bottom-menu-action"}
      style={{
        boxShadow: "unset",
        borderBottom: "unset",
        padding: 0,
      }}
    >
      <form name={"add_po_form"}>
        <ReferenceItemsComponent />
      </form>
    </div>
  );
}

export function DuplicateLoad({ directQuote }) {
  const { getFromStore, addToStore } = useStore();
  const [quote, setQuote] = useState(directQuote);

  useEffect(() => {
    if (directQuote) return;
    const data = getFromStore("shipment_quote").data;
    setQuote(data);
  }, []);

  const addTime = (index, state) => {
    const el = document.getElementById(`add-time-${index}`);
    if (!state) {
      const elements = document.querySelectorAll(
        `div[id^="add-time-${index}"] input,div[id^="add-time-${index}"] select`,
      );

      elements.forEach((element) => {
        if (element.tagName === "SELECT") {
          element.selectedIndex = [...element.options].findIndex(
            (option) => option.defaultSelected,
          );
        } else {
          element.value = element.defaultValue;
        }
      });
    }

    el.style.display = state
      ? (el.style.display = "flex")
      : (el.style.display = "none");
  };

  if (!quote) return <Loading2Component />;

  return (
    <form name={"duplicate-load-data"}>
      <div className={"edit-full-quote"}>
        {/*<button type={"button"} onClick={() => redirectToGetQuote()}>*/}
        {/*  Edit Full Quote*/}
        {/*</button>*/}
      </div>

      <div className={"bottom-menu-action duplicate-load"}>
        <div
          style={{
            paddingLeft: "0.1rem",
          }}
        >
          <h5>Keep Same Carrier</h5>
          <SwitchComponent inputName={"keepCarrier"} />
        </div>
        <div>
          <h5>Quote valid until:</h5>
          <div className={"date-time-inputs"}>
            <input
              type={"date"}
              min={disablePastDates()}
              defaultValue={disablePastDates()}
              name={"deadline_date"}
            />
            <select name={"deadline_time"}>
              {generatePickHours().map((time, index) => (
                <option key={time + index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        {quote.addresses?.map((address, index) => {
          // if (!address.time_start) return;
          return (
            <div key={address.address} className={"addresses-input"}>
              <div className={"address-title"}>
                <span
                  style={{
                    width: "7rem",
                    fontWeight: 500,
                    color: "rgba(30,30,30,0.6)",
                  }}
                >
                  {address.address_type.toUpperCase()} {address.order}
                </span>

                <div
                  style={{
                    display: "inline-flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={Sparkle}
                      alt={"location"}
                      width={20}
                      style={{
                        width: "20px",
                        height: "20px",
                        marginTop: "-0.5rem",
                      }}
                    />

                    <h5>{address.address} </h5>
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <input
                      style={{
                        height: "fit-content",
                        alignSelf: "center",
                        scale: "1.5",
                      }}
                      type={"checkbox"}
                      onChange={(ev) => addTime(index, ev.target.checked)}
                      // defaultChecked
                      name={`add-time-${index}`}
                    />
                    Add Time
                  </div>
                </div>
              </div>
              <div
                className={"date-time-inputs"}
                id={`add-time-${index}`}
                style={{
                  display: "none",
                }}
              >
                <input
                  type={"date"}
                  min={disablePastDates()}
                  defaultValue={disablePastDates()}
                  name={`address-date-${index}`}
                />

                <select
                  name={`time-start-${index}`}
                  defaultValue={"Any time during business hours"}
                >
                  <option value="Call or email to schedule">
                    Call or email to schedule
                  </option>
                  <option value="Any time during business hours">
                    Any time during business hours
                  </option>

                  {generatePickHours().map((time, index) => (
                    <option key={time + index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <select
                  name={`time-end-${index}`}
                  defaultValue={"0"}
                  id={`locationTimeEnd-${index}`}
                >
                  <option value="0" disabled>
                    Time range end
                  </option>
                  {generatePickHours().map((time, index) => (
                    <option key={time + index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <input
                  style={{
                    display: "none",
                  }}
                  name={`address-id-${index}`}
                  value={address._id}
                  readOnly
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
