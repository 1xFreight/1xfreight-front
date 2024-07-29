"use client";

import ChevronDown from "@/public/icons/24px/chevron-down.svg";
import Clock from "@/public/icons/24px/clock.svg";
import Calendar from "@/public/icons/24px/calendar.svg";
import MapMarker from "@/public/icons/30px/map-marker.svg";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import "./styles.css";
import { useCallback, useMemo } from "react";
import { disablePastDates } from "@/common/utils/date.utils";
import { generatePickHours } from "@/common/utils/time.utils";
import AccesorialsComponent from "@/app/get-quote/components/accesorials.component";

enum ShippingHoursEnum {
  BY_APPOINTMENT = "By Appointment",
  FCFS = "FCFS",
}

export default function PickupFormComponent() {
  return (
    <div className={"rq-pickup-form"}>
      <div className={"pickup-form"}>
        <div className={"form-header"}>
          <h2>1st Pickup</h2>
        </div>

        <form className={"shipping-form"}>
          <div className={"address-input"}>
            <h3>Address</h3>
            <div className={"form-input-wrapper"}>
              <MapMarker />
              <input
                type={"text"}
                name={"address"}
                className={"form-input"}
                placeholder={"Origin (Location or City, ST, ZIP)"}
              />
            </div>
          </div>

          <div className={"date-time-details"}>
            <div className="add-time">
              <h3>Do you want to add a date and time for this stop?</h3>

              <div className={"radio-btn"}>
                <div className={"radio-yes"}>
                  <input
                    type={"radio"}
                    name={"add-time"}
                    id={"add-time-yes"}
                    value={"yes"}
                    defaultChecked
                  />
                  <h5>Yes</h5>
                </div>
                <div className={"radio-no"}>
                  <input
                    type={"radio"}
                    name={"add-time"}
                    id={"add-time-no"}
                    value={"no"}
                  />
                  <h5>No</h5>
                </div>
              </div>
            </div>

            <div className={"shipping-hours-type"}>
              <h3>Shipping Hours</h3>
              <TypeSelectorComponent typeEnum={ShippingHoursEnum} />
            </div>
          </div>

          <div className={"date-time-inputs"}>
            <div className={"date-input"}>
              <h3>Date</h3>
              <div className={"form-input-wrapper"}>
                <Calendar />
                <input
                  type={"date"}
                  min={disablePastDates()}
                  value={disablePastDates()}
                />
              </div>
            </div>

            <div className={"time-inputs"}>
              <div className={"time-input"}>
                <h3>Time</h3>
                <div className={"form-input-wrapper"}>
                  <Clock />

                  <select name="pickup-time-start">
                    <option value="" selected disabled>
                      Pickup hours
                    </option>
                    <option value="unknown">Call or email to schedule</option>
                    <option value="any">Any time during business hours</option>

                    {generatePickHours().map((time, index) => (
                      <option key={time + index} value="time">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={"time-input-range"}>
                <div className={"form-input-wrapper"}>
                  <Clock />

                  <select name="pickup-time-end">
                    <option value="" selected disabled>
                      Time range end
                    </option>
                    {generatePickHours().map((time, index) => (
                      <option key={time + index} value="time">
                        {time}
                      </option>
                    ))}
                  </select>

                  <span>*if needed</span>
                </div>
              </div>
            </div>
          </div>

          <AccesorialsComponent />
        </form>
      </div>
    </div>
  );
}
