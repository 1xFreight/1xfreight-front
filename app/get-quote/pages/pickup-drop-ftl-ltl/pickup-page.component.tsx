"use client";

import { useEffect, useMemo, useState } from "react";
import LocationFormComponent from "@/app/get-quote/components/location-ftl-ltl-form/location-form.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import "./styles.css";
import { formDataToJSON } from "@/common/utils/formData.util";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";

export default function PickupPageComponent() {
  const [numberOfLocations, setNumberOfLocations] = useState<number>(1);
  const { setCanChangePage, canChangePage, addData, addBreadcrumb, getData } =
    useRegisterQuoteContext();
  const _default = useMemo(() => getData("default"), [getData]);
  const _defaultAddresses = useMemo(() => {
    const addr = _default?.addresses.filter(
      ({ address_type }) => address_type === "pickup",
    );
    setNumberOfLocations(addr?.length >= 1 ? addr?.length : 1);
    return addr?.length ? addr : [];
  }, [_default]);

  const dataCollector = () => {
    const data = [];

    for (let i = 1; i <= numberOfLocations; i++) {
      const form = document.forms[`location-form-Pickup-${i}`];
      const valid = form[0].reportValidity();

      if (!valid) {
        return setCanChangePage(PageStateEnum.INVALID);
      }

      const formData = new FormData(form);

      data.push(formDataToJSON(formData));
    }

    addBreadcrumb(data[0].address);
    addData({ form: "pickup", data });
    setCanChangePage(PageStateEnum.CAN_CHANGE);
  };

  useEffect(() => {
    if (canChangePage !== PageStateEnum.CHECK) return;

    dataCollector();
  }, [canChangePage]);

  return (
    <div
      className={"pickup-page-wrapper"}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
      }}
    >
      {Array(numberOfLocations)
        .fill(1)
        .map((x, index) => (
          <LocationFormComponent
            index={index + 1}
            title={"Pickup"}
            key={index}
            _default={_defaultAddresses[index]}
          />
        ))}

      <div className={"form-number-actions"}>
        <button
          className={"delete-more-form"}
          onClick={() =>
            numberOfLocations > 1
              ? setNumberOfLocations(numberOfLocations - 1)
              : ""
          }
          disabled={numberOfLocations <= 1}
        >
          Delete location
        </button>

        <button
          className={"add-more-form"}
          onClick={() =>
            numberOfLocations < 5
              ? setNumberOfLocations(numberOfLocations + 1)
              : ""
          }
          disabled={numberOfLocations >= 5}
        >
          <PlusCircle /> Add Pickup
        </button>
      </div>
    </div>
  );
}
