"use client";

import "./styles.css";
import React, { useEffect, useState } from "react";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import LocationFormComponent from "@/app/get-quote/components/location-ftl-ltl-form/location-form.component";
import ChevronDown from "@/public/icons/24px/chevron-down.svg";
import PlaceAutocompleteComponent from "@/common/components/place-autocomplete/place-autocomplete.component";
import Calendar from "@/public/icons/24px/calendar.svg";
import { disablePastDates } from "@/common/utils/date.utils";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";
import { formDataToJSON } from "@/common/utils/formData.util";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";

export enum RoutingTypeEnum {
  DOOR_DOOR = "Door - Door",
  DOOR_PORT = "Door - Port",
  PORT_PORT = "Port - Port",
  PORT_DOOR = "Port - Door",
}

export default function RoutingAndDatesComponent({
  addressExtraType = "port",
  defaultData,
}: {
  addressExtraType: "port" | "airport";
}) {
  const [routingType, setRoutingType] = useState("DOOR_DOOR");
  const [portOfLoading, setPortOfLoading] = useState();
  const [portOfDischarge, setPortOfDischarge] = useState();
  const { setCanChangePage, canChangePage, addData, addBreadcrumb, getData } =
    useRegisterQuoteContext();

  const displayIfType = (...types: RoutingTypeEnum[]) => {
    let canDisplay = false;

    types.map((type) => {
      if (type == RoutingTypeEnum[routingType]) canDisplay = true;
    });

    return canDisplay ? "block" : "none";
  };

  const collectLocationFormData = (locationType) => {
    const form = document.forms[`location-form-${locationType}-${1}`];
    const valid = form.reportValidity();

    if (!valid) {
      return setCanChangePage(PageStateEnum.INVALID);
    }

    const formData = new FormData(form);
    return formDataToJSON(formData);
  };

  const dataCollector = () => {
    const origin = collectLocationFormData("Origin");
    const destination = collectLocationFormData("Destination");
    const incoterms = (
      document.getElementById("incoterms") as HTMLSelectElement
    ).value;
    const routing = (
      document.getElementsByName("routing-type") as HTMLInputElement
    )[0].value;

    console.log(incoterms, routing);
  };

  useEffect(() => {
    if (canChangePage !== PageStateEnum.CHECK) return;

    dataCollector();
  }, [canChangePage]);

  return (
    <div className={"routing-and-dates"}>
      <div className={"title"}>
        <h2>Routing and Dates</h2>
      </div>

      <div className={"routing-wrapper"}>
        <div
          style={{
            display: "inline-flex",
            gap: "2rem",
          }}
        >
          <div className={"incoterms"}>
            <h5>Incoterms</h5>

            <select id={"incoterms"}>
              <option>FOB - Free on Board</option>
            </select>
          </div>

          <div className={"select-routing"}>
            <h5>Select Routing</h5>

            <TypeSelectorComponent
              typeEnum={RoutingTypeEnum}
              type={routingType}
              setType={setRoutingType}
              inputName={"routing-type"}
            />
          </div>
        </div>

        <div className={"addresses-block"}>
          <div
            className={"origin"}
            style={{
              display: displayIfType(
                RoutingTypeEnum.DOOR_DOOR,
                RoutingTypeEnum.DOOR_PORT,
              ),
            }}
          >
            <button
              className={"variant2 open-hidden-form"}
              onClick={() => {
                const origin = document.getElementById("hidden-origin");

                if (!origin) return;

                origin.style.height =
                  origin.style.height == 0 || origin.style.height == "0px"
                    ? "100%"
                    : "0";
              }}
            >
              Edit Origin
              <ChevronDown />
            </button>
            <div className={"hidden-address-form"} id={"hidden-origin"}>
              <LocationFormComponent title={"Origin"} index={1} hideIndex />
            </div>
          </div>

          <div
            className={"destination"}
            style={{
              display: displayIfType(
                RoutingTypeEnum.DOOR_DOOR,
                RoutingTypeEnum.PORT_DOOR,
              ),
            }}
          >
            <button
              className={"variant2 open-hidden-form"}
              onClick={() => {
                const destination =
                  document.getElementById("hidden-destination");

                if (!destination) return;

                destination.style.height =
                  destination.style.height == 0 ||
                  destination.style.height == "0px"
                    ? "100%"
                    : "0";
              }}
            >
              Edit Destination
              <ChevronDown />
            </button>
            <div className={"hidden-address-form"} id={"hidden-destination"}>
              <LocationFormComponent
                title={"Destination"}
                index={1}
                hideIndex
              />
            </div>
          </div>

          <div className={"port-of-loading"}>
            <h5>Port of Loading</h5>

            <input
              type={"text"}
              placeholder={"Address..."}
              value={portOfLoading}
              onChange={(ev) => setPortOfLoading(ev.target.value)}
              id={"port-of-loading"}
              name={"port-of-loading"}
              required
            />

            <div className={"autocomplete-loading-1"}>
              <PlaceAutocompleteComponent
                inputText={portOfLoading}
                setInputText={setPortOfLoading}
                onlyPorts
                showSavedLocations={false}
              />
            </div>
          </div>

          <div className={"port-of-discharge"}>
            <h5>Port of Discharge</h5>

            <input
              type={"text"}
              placeholder={"Address..."}
              value={portOfDischarge}
              onChange={(ev) => setPortOfDischarge(ev.target.value)}
              id={"port-of-discharge"}
              name={"port-of-discharge"}
              required
            />

            <div className={"autocomplete-loading-2"}>
              <PlaceAutocompleteComponent
                inputText={portOfDischarge}
                setInputText={setPortOfDischarge}
                onlyPorts
                showSavedLocations={false}
              />
            </div>
          </div>

          <div
            className={"date-cargo"}
            style={{
              display: "inline-flex",
              gap: "2rem",
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid #ececec",
            }}
          >
            <div className={"date-input"}>
              <h5>Cargo Ready Date</h5>
              <div className={"form-input-wrapper"}>
                <Calendar />
                <input
                  type={"date"}
                  min={disablePastDates()}
                  defaultValue={defaultData?.date ?? disablePastDates()}
                  name={"cargo_ready_date"}
                  required
                />
              </div>
            </div>

            <div className={"date-input"}>
              <h5>Target Destination Delivery Date (optional)</h5>
              <div className={"form-input-wrapper"}>
                <Calendar />
                <input
                  type={"date"}
                  min={disablePastDates()}
                  defaultValue={defaultData?.date ?? ""}
                  name={"cargo_ready_date"}
                  required
                />
              </div>
            </div>
          </div>

          <div
            className={"form-notes"}
            style={{
              marginTop: "1rem",
              paddingTop: "1rem",
              // borderTop: "1px solid #ececec",
            }}
          >
            <h5>Carrier and Routing Preferences / Exclusions</h5>
            <textarea
              placeholder={"Type here additional information..."}
              rows={5}
              name={"locationNotes"}
              defaultValue={defaultData?.notes}
              maxLength={255}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
