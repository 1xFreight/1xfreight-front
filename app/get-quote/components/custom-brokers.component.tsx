"use client";

import React from "react";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import InputMask from "react-input-mask";

export default function CustomBrokersComponent({ _defaultDetails }) {
  const { getData } = useRegisterQuoteContext();

  const checkIfQuoteNeedCustomBroker = () => {
    const pickup = getData("pickup");
    const drop = getData("drop");
    let baseCountry = pickup[0].country;
    let isBrokerNeeded = false;

    [...pickup, ...drop].forEach((location) => {
      if (location.country != baseCountry) {
        isBrokerNeeded = true;
        const countrySelect = document.getElementById(
          "customs_broker_country_select",
        ) as HTMLSelectElement;

        if (countrySelect) {
          countrySelect.value = location.country;
        }
      }
    });

    return isBrokerNeeded;
  };

  if (!checkIfQuoteNeedCustomBroker()) return "";

  return (
    <div>
      <h3>Customs Broker</h3>

      <div
        style={{
          display: "inline-flex",
          gap: "0.5rem",
        }}
      >
        <div>
          <h5>Name</h5>
          <input
            type={"text"}
            name={"customs_broker_name"}
            placeholder={"Type here..."}
            defaultValue={_defaultDetails?.customs_broker_name}
            required
          />
        </div>

        <div>
          <h5>Phone</h5>
          <InputMask
            mask="(999) 999-9999"
            placeholder="(123) 456-7890"
            className="phone-input"
            defaultValue={_defaultDetails?.customs_broker_phone}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                type={"text"}
                name={"customs_broker_phone"}
              />
            )}
          </InputMask>
        </div>

        <div>
          <h5>Email</h5>
          <input
            type={"text"}
            name={"customs_broker_email"}
            placeholder={"Type here..."}
            defaultValue={_defaultDetails?.customs_broker_email}
          />
        </div>
      </div>
    </div>
  );
}
