"use client";

import Clock from "@/public/icons/24px/clock.svg";
import Calendar from "@/public/icons/24px/calendar.svg";
import MapMarker from "@/public/icons/30px/map-marker.svg";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import "./styles.css";
import { disablePastDates } from "@/common/utils/date.utils";
import { generatePickHours } from "@/common/utils/time.utils";
import AccesorialsComponent from "@/app/get-quote/components/accesorials.component";
import React, { useEffect, useState } from "react";
import { getOrdinalSuffix } from "@/common/utils/number.utils";
import PlaceAutocompleteComponent from "@/common/components/place-autocomplete/place-autocomplete.component";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { log } from "node:util";
import SwitchComponent from "@/common/components/slider/switch.component";

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
  const [address, setAddress] = useState<string>(_default?.address ?? "");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [defaultData, setDefaultData] = useState(_default);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultData?.date || defaultData?.time_start || defaultData?.time_end) {
      toggleAddDateTime(true);
    }
  }, [defaultData, loading]);

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

  const updateDefault = (data) => {
    setLoading(true);
    setDefaultData(data);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className={"rq-location-form"}>
      <div className={"location-form"}>
        <div className={"form-header"}>
          <h2>
            {getOrdinalSuffix(index)} {title}
          </h2>
        </div>

        {loading ? (
          <Loading2Component />
        ) : (
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
                  id={"input-address"}
                  autoComplete={"off"}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onFocus={() => setShowAutocomplete(true)}
                  onBlur={() =>
                    setTimeout(() => setShowAutocomplete(false), 200)
                  }
                />
              </div>
              {showAutocomplete && (
                <PlaceAutocompleteComponent
                  inputText={address}
                  setInputText={setAddress}
                  setDefault={updateDefault}
                />
              )}
            </div>

            <div className={"location-details"}>
              <h3>Location Details:</h3>
              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <div>
                  <h5>Ready by: </h5>
                  <select name={"ready_by"}>
                    {generatePickHours().map((time, index) => (
                      <option key={time + index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>{" "}
                </div>

                <div>
                  <h5>Closes at: </h5>
                  <select name={"closes_at"}>
                    {generatePickHours().map((time, index) => (
                      <option key={time + index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>{" "}
                </div>
              </div>

              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <div className={"open-days"}>
                  <div className={"open-day-item"}>
                    <input
                      type={"checkbox"}
                      className={"rounded-checkbox"}
                      defaultChecked
                    />
                    <h5>Mon</h5>
                  </div>

                  <div className={"open-day-item"}>
                    <input type={"checkbox"} defaultChecked />
                    <h5>Tue</h5>
                  </div>

                  <div className={"open-day-item"}>
                    <input type={"checkbox"} defaultChecked />
                    <h5>Wed</h5>
                  </div>

                  <div className={"open-day-item"}>
                    <input type={"checkbox"} defaultChecked />
                    <h5>Thu</h5>
                  </div>

                  <div className={"open-day-item"}>
                    <input type={"checkbox"} defaultChecked />
                    <h5>Fri</h5>
                  </div>

                  <div className={"open-day-item"}>
                    <input type={"checkbox"} />
                    <h5>Sat</h5>
                  </div>

                  <div className={"open-day-item"}>
                    <input type={"checkbox"} />
                    <h5>Sun</h5>
                  </div>
                </div>

                <div>
                  <h5>Open 24/7</h5>
                  <SwitchComponent inputName={"open_nonstop"} />
                </div>
              </div>

              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <div>
                  <h5>Company name:</h5>
                  <input
                    type={"text"}
                    placeholder={"Type here..."}
                    required
                    name={"company_name"}
                    defaultValue={defaultData?.company_name}
                  />
                </div>

                <div>
                  <h5>Contact name:</h5>
                  <input
                    type={"text"}
                    placeholder={"Type here..."}
                    required
                    name={"contact_name"}
                    defaultValue={defaultData?.contact_name}
                  />
                </div>

                <div>
                  <h5>Contact phone:</h5>
                  <input
                    type={"text"}
                    placeholder={"Type here..."}
                    required
                    name={"contact_phone"}
                    defaultValue={defaultData?.contact_phone}
                  />
                </div>

                <div>
                  <h5>
                    Contact email: <span>(optional)</span>
                  </h5>
                  <input
                    type={"text"}
                    placeholder={"Type here..."}
                    name={"contact_email"}
                    defaultValue={defaultData?.contact_email}
                  />
                </div>
              </div>
            </div>

            <div
              className={"date-time-details"}
              style={{
                zIndex: 0,
              }}
            >
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
                      defaultChecked={
                        !!(
                          defaultData?.date ||
                          defaultData?.time_start ||
                          defaultData?.time_end
                        )
                      }
                    />
                    <h5>Yes</h5>
                  </div>
                  <div className={"radio-no"}>
                    <input
                      type={"radio"}
                      name={"addTime"}
                      id={"add-time-no"}
                      value={"no"}
                      defaultChecked={
                        !(
                          defaultData?.date ||
                          defaultData?.time_start ||
                          defaultData?.time_end
                        )
                      }
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
                  selectedEl={defaultData?.shipping_hours}
                />
              </div>
            </div>

            <div
              className={"date-time-inputs"}
              id={`date-time-inputs form-${title}-${index}`}
              style={{
                zIndex: "0",
              }}
            >
              <div className={"date-input"}>
                <h3>Date</h3>
                <div className={"form-input-wrapper"}>
                  <Calendar />
                  <input
                    type={"date"}
                    min={disablePastDates()}
                    defaultValue={defaultData?.date ?? disablePastDates()}
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
                      defaultValue={
                        defaultData?.time_start ?? "Call or email to schedule"
                      }
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
                  </div>
                </div>

                <div className={"time-input-range"}>
                  <div className={"form-input-wrapper"}>
                    <Clock />

                    <select
                      name="locationTimeEnd"
                      defaultValue={defaultData?.time_end ?? "0"}
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

                    <span>*if needed</span>
                  </div>
                </div>
              </div>
            </div>

            <AccesorialsComponent
              title={`${title} Accesorials`}
              index={index + title}
              _default={defaultData}
            />

            <div className={"form-notes"}>
              <h3>Notes</h3>
              <textarea
                placeholder={"Type here additional information..."}
                rows={5}
                name={"locationNotes"}
                defaultValue={defaultData?.notes}
                maxLength={255}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default React.memo(LocationFormComponent);
