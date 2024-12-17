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
import Eye from "@/public/icons/20px/hidden.svg";
import LocationOpenHoursComponent from "@/app/get-quote/components/location-ftl-ltl-form/location-open-hours.component";
import SwitchComponent from "@/common/components/slider/switch.component";

export enum ShippingHoursEnum {
  BY_APPOINTMENT = "By Appointment",
  FCFS = "FCFS",
}

interface LocationFormComponentI {
  index: number;
  title: string;
  _default?: any;
  disableSaveLocation: boolean;
}

function LocationFormComponent({
  index,
  title,
  _default,
  disableSaveLocation = false,
}: LocationFormComponentI) {
  const [address, setAddress] = useState<string>(_default?.address ?? "");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [defaultData, setDefaultData] = useState(_default);
  const [loading, setLoading] = useState(false);
  const [addressDetails, setAddressDetails] = useState();

  useEffect(() => {
    if (defaultData?.date || defaultData?.time_start || defaultData?.time_end) {
      toggleAddDateTime(true);
    }
  }, [defaultData, loading]);

  useEffect(() => {
    if (!addressDetails) return;
    const inputSelector = `#address-details${addressDetails?.uniqueKey} input, #address-details${addressDetails?.uniqueKey} select`;

    const inputs = document.querySelectorAll(inputSelector);

    // Update the value for each input based on its id or a custom logic
    inputs.forEach((input) => {
      switch (input.id) {
        case "address_street":
          input.value =
            addressDetails?.street && addressDetails?.streetNumber
              ? addressDetails?.streetNumber + " " + addressDetails?.street
              : (addressDetails?.street ?? "");
          break;
        case "address_city":
          input.value = addressDetails?.city ?? "";
          break;
        case "address_state":
          input.value = addressDetails?.state ?? "";
          break;
        case "address_zipcode":
          input.value = addressDetails?.zipCode ?? "";
          break;
        case "address_country":
          input.value = addressDetails?.country ?? "";
          break;
        default:
          input.value = "";
      }
    });
  }, [addressDetails]);

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

  // Function to get the short name of a state using Google Maps Geocoding API
  async function getShortStateName(stateName) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY; // Replace with your Google Maps API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(stateName)}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const result = data.results[0];

        // Find the administrative_area_level_1 component
        const stateComponent = result.address_components.find((component) =>
          component.types.includes("administrative_area_level_1"),
        );

        if (stateComponent) {
          return stateComponent.short_name; // Returns "BC" for "British Columbia"
        } else {
          // throw new Error("State information not found.");
        }
      } else {
        // throw new Error("Geocoding API request failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      return "";
    }
  }

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
            <div className={"address-how-it-works"}>
              <div className={"hidden-data-svg"}>
                <Eye />
              </div>

              <h5>
                The carrier will only have access to the full address and
                additional details once the quote is accepted.
              </h5>
            </div>

            <div className={"address-input"}>
              <h3>Address</h3>

              <h5>Search Address</h5>
              <div>
                <div className={"form-input-wrapper"}>
                  <MapMarker />
                  <input
                    type={"text"}
                    // name={"address"}
                    className={"form-input"}
                    placeholder={"Origin (Location or City, ST, ZIP)"}
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
                    setDetails={setAddressDetails}
                    uniqueKey={`-${title}-${index}`}
                  />
                )}
              </div>

              <h5>Manual Address Entry</h5>

              <div
                className={"address-details"}
                id={`address-details-${title}-${index}`}
              >
                <input
                  type={"text"}
                  name={"street"}
                  placeholder={"Address"}
                  id={`address_street`}
                  defaultValue={defaultData?.street}
                />
                <input
                  type={"text"}
                  name={"city"}
                  placeholder={"City*"}
                  id={`address_city`}
                  required
                  defaultValue={defaultData?.city}
                />
                <input
                  type={"text"}
                  name={"state"}
                  placeholder={"State(abbreviation)*"}
                  id={`address_state`}
                  required
                  defaultValue={defaultData?.state}
                  onChange={(ev) => {
                    const input = ev.target;

                    const validity = input.checkValidity();

                    if (!validity && input.value.length <= 3) {
                      input.setCustomValidity("");
                    }
                  }}
                  onBlur={async (ev) => {
                    const input = ev.target;

                    input.value =
                      (await getShortStateName(ev.target.value)) ?? input.value;

                    // Check if input exceeds 3 characters
                    if (input.value.length > 3) {
                      input.setCustomValidity(
                        "State abbreviation must be 3 characters or less.",
                      );
                    } else {
                      input.setCustomValidity(""); // Clear the validation message if valid
                    }

                    // Optionally transform the input to a short name if needed
                    input.value =
                      (await getShortStateName(input.value)) ?? input.value;

                    // Display the validation message if invalid
                    input.reportValidity();
                  }}
                  minLength={2}
                />
                <input
                  type={"text"}
                  name={"zipcode"}
                  placeholder={"Zipcode"}
                  id={`address_zipcode`}
                  defaultValue={defaultData?.zipcode}
                />
                <select
                  defaultValue={defaultData?.country ?? "US"}
                  id={`address_country`}
                  style={{
                    paddingLeft: "1rem",
                  }}
                  name={`country`}
                  required
                >
                  <option value={"US"}>US</option>
                  <option value={"CA"}>CA</option>
                  <option value={"MX"}>MX</option>
                </select>
              </div>
            </div>

            <LocationOpenHoursComponent
              defaultData={defaultData}
              index={index + title}
            />

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

            {!disableSaveLocation && (
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  flexDirection: "column",
                }}
              >
                <h3
                  style={{
                    margin: "0",
                  }}
                >
                  Save location
                </h3>
                <h6
                  style={{
                    marginBottom: "0.5rem",
                    padding: 0,
                    height: "fit-content",
                  }}
                >
                  Location will be saved in Settings/Saved Locations, and you
                  will be able to edit it.
                </h6>
                <SwitchComponent inputName={`save-location`} />
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default React.memo(LocationFormComponent);
