"use client";

import Clock from "@/public/icons/24px/clock.svg";
import Calendar from "@/public/icons/24px/calendar.svg";
import MapMarker from "@/public/icons/30px/map-marker.svg";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import "./styles.css";
import { disablePastDates } from "@/common/utils/date.utils";
import { generatePickHours } from "@/common/utils/time.utils";
import AccesorialsComponent from "@/app/get-quote/components/accesorials.component";
import React, { useEffect } from "react";
import { getOrdinalSuffix } from "@/common/utils/number.utils";

export enum ShippingHoursEnum {
  BY_APPOINTMENT = "By Appointment",
  FCFS = "FCFS",
}

interface LocationFormComponentI {
  index: number;
  title: string;
  _default?: any;
}

function LocationFormComponent({
  index,
  title,
  _default,
}: LocationFormComponentI) {
  useEffect(() => {
    if (_default?.date) {
      toggleAddDateTime(true);
    }
  }, [_default]);
  const toggleAddDateTime = (state: boolean) => {
    const elShippingType = document.getElementById(
      `shipping-hours-type form-${title}-${index}`,
    );
    const elDateTimeInputs = document.getElementById(
      `date-time-inputs form-${title}-${index}`,
    );

    function showDetails() {
      if (!elShippingType || !elDateTimeInputs) return;
      elShippingType.style.display = "block";
      elShippingType.setAttribute("required", "true");
      elDateTimeInputs.style.display = "flex";
      elDateTimeInputs.setAttribute("required", "true");
    }

    function hideDetails() {
      if (!elShippingType || !elDateTimeInputs) return;
      elShippingType.style.display = "none";
      elShippingType.setAttribute("required", "false");
      elDateTimeInputs.style.display = "none";
      elDateTimeInputs.setAttribute("required", "false");
    }

    state ? showDetails() : hideDetails();
  };

  return (
    <div className={"rq-location-form"}>
      <div className={"location-form"}>
        <div className={"form-header"}>
          <h2>
            {getOrdinalSuffix(index)} {title}
          </h2>
        </div>

        <form
          className={"shipping-form"}
          id={`location-form-${title}-${index}`}
        >
          <div className={"address-input"}>
            <h3>Address</h3>
            <div className={"form-input-wrapper"}>
              <MapMarker />
              <input
                type={"text"}
                name={"address"}
                className={"form-input"}
                placeholder={"Origin (Location or City, ST, ZIP)"}
                required
                defaultValue={_default?.address}
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
                    name={"addTime"}
                    id={"add-time-yes"}
                    value={"yes"}
                    onClick={() => toggleAddDateTime(true)}
                    defaultChecked={!!_default?.date}
                  />
                  <h5>Yes</h5>
                </div>
                <div className={"radio-no"}>
                  <input
                    type={"radio"}
                    name={"addTime"}
                    id={"add-time-no"}
                    value={"no"}
                    defaultChecked={!_default?.date}
                    onClick={() => toggleAddDateTime(false)}
                  />
                  <h5>No</h5>
                </div>
              </div>
            </div>

            <div
              className={"shipping-hours-type"}
              id={`shipping-hours-type form-${title}-${index}`}
            >
              <h3>Shipping Hours</h3>
              <TypeSelectorComponent
                typeEnum={ShippingHoursEnum}
                inputName={"shippingHoursType"}
                selectedEl={_default?.shipping_hours}
              />
            </div>
          </div>

          <div
            className={"date-time-inputs"}
            id={`date-time-inputs form-${title}-${index}`}
          >
            <div className={"date-input"}>
              <h3>Date</h3>
              <div className={"form-input-wrapper"}>
                <Calendar />
                <input
                  type={"date"}
                  min={disablePastDates()}
                  defaultValue={_default?.date ?? disablePastDates()}
                  name={"date"}
                />
              </div>
            </div>

            <div className={"time-inputs"}>
              <div className={"time-input"}>
                <h3>Time</h3>
                <div className={"form-input-wrapper"}>
                  <Clock />

                  <select
                    name="locationTimeStart"
                    defaultValue={_default?.time_start ?? "any"}
                  >
                    <option value="0" disabled>
                      Pickup hours
                    </option>
                    <option value="unknown">Call or email to schedule</option>
                    <option value="Any time during business hours">
                      Any time during business hours
                    </option>

                    {generatePickHours().map((time, index) => (
                      <option key={time + index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={"time-input-range"}>
                <div className={"form-input-wrapper"}>
                  <Clock />

                  <select
                    name="locationTimeEnd"
                    defaultValue={_default?.time_end ?? "0"}
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

                  <span>*if needed</span>
                </div>
              </div>
            </div>
          </div>

          <AccesorialsComponent
            title={`${title} Accesorials`}
            index={index + title}
            _default={_default}
          />

          <div className={"form-notes"}>
            <h3>Notes</h3>
            <textarea
              placeholder={"Type here additional information..."}
              rows={5}
              name={"locationNotes"}
              defaultValue={_default?.notes}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(LocationFormComponent);
