"use client";

import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import React, { useEffect, useState } from "react";
import useQuoteContext from "@/app/quotes/[quote_id]/use-quote.context";
import LocationOpenHoursComponent from "@/app/get-quote/components/location-ftl-ltl-form/location-open-hours.component";
import { formDataToJSON } from "@/common/utils/formData.util";
import { useDebouncedCallback } from "use-debounce";
import { deleteCache, postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import { useRouter } from "next/navigation";
import useStore from "@/common/hooks/use-store.context";
import { formatAddressObj } from "@/common/utils/data-convert.utils";

export default function MissingDataComponent() {
  const [open, setOpen] = useState(false);
  const { setIsMissingData, isMissingData, quote } = useQuoteContext();
  const router = useRouter();
  const { showToast } = useStore();

  useEffect(() => {
    if (!isMissingData) return;
    setOpen(true);
    console.log(isMissingData);
  }, [isMissingData]);

  const formatAddressObj = (obj: any) => {
    const formattedAddress = {};

    obj.street ? (formattedAddress["street"] = obj.street) : "";
    obj.zipcode ? (formattedAddress["zipcode"] = obj.zipcode) : "";
    obj.contact_name
      ? (formattedAddress["contact_name"] = obj.contact_name)
      : "";
    obj.company_name
      ? (formattedAddress["company_name"] = obj.company_name)
      : "";
    obj.contact_phone
      ? (formattedAddress["contact_phone"] = obj.contact_phone)
      : "";
    obj.contact_email
      ? (formattedAddress["contact_email"] = obj.contact_email)
      : "";
    obj.open_hours && obj.open_hours !== "Mon - Sun: 1:00 AM - 1:00 AM"
      ? (formattedAddress["open_hours"] = obj.open_hours)
      : "";

    return formattedAddress;
  };

  const saveMissingData = () => {
    const missingData = [];

    Array(quote?.addresses?.length)
      .fill(1)
      .map((x, index) => {
        const form = document.forms[`missing-data-address-block-${index}`];
        const formData = new FormData(form);
        if (!form.reportValidity()) return missingData.push("invalid");

        const jsonData = formDataToJSON(formData);
        const cleanedObj = Object.fromEntries(
          Object.entries(jsonData).filter(
            ([key, value]) => value !== "" && !key.startsWith("open_nonstop"),
          ),
        );

        missingData.push(cleanedObj);
      });

    if (missingData.filter((data) => data === "invalid").length) return;
    acceptQuote(quote._id, isMissingData as any, missingData as any);
  };

  const acceptQuote = useDebouncedCallback((quote_id, bid_id, missingData) => {
    postWithAuth("/quote/accept", {
      quote_id,
      bid_id,
      missingData,
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();

        showToast({
          type: ToastTypesEnum.ERROR,
          text: errorData.message || "Something went wrong",
          duration: 5000,
        });

        setIsMissingData(null);

        return setOpen(false);
      }

      showToast({
        type: ToastTypesEnum.SUCCESS,
        text: "Quote accepted",
        duration: 5000,
      });

      deleteCache();

      router.push(`/goto/${quote_id}`);
    });
  }, 350);

  return (
    <RightModalComponent
      title={"Provide missing information before accept quote"}
      open={open}
      setOpen={setOpen}
      action={saveMissingData}
    >
      {quote?.addresses?.map((address, index) => (
        <form
          key={address._id}
          className={"missing-data-address-block"}
          name={`missing-data-address-block-${index}`}
        >
          <h3>
            {index + 1}.{address.partial_address}
          </h3>

          <input
            type={"text"}
            name={"_id"}
            value={address._id}
            readOnly
            style={{
              display: "none",
            }}
          />

          <div className={"address-details"}>
            <input
              type={"text"}
              name={"street"}
              placeholder={"Address"}
              id={"address_street"}
              defaultValue={address?.street}
              disabled={!!address?.street}
              required
            />
            <input
              type={"text"}
              name={"city"}
              placeholder={"City*"}
              id={"address_city"}
              required
              defaultValue={address?.city}
              disabled={!!address?.city}
            />
            <input
              type={"text"}
              name={"state"}
              placeholder={"State*"}
              id={"address_state"}
              required
              defaultValue={address?.state}
              disabled={!!address?.state}
            />
            <input
              type={"text"}
              name={"zipcode"}
              placeholder={"Zipcode"}
              id={"address_zipcode"}
              defaultValue={address?.zipcode}
              disabled={!!address?.zipcode}
              required
            />
            <input
              type={"text"}
              name={"country"}
              placeholder={"Country*"}
              id={"address_country"}
              required
              defaultValue={address?.country}
              disabled={!!address?.country}
            />
          </div>

          <LocationOpenHoursComponent
            defaultData={address}
            index={index}
            disableExistingData={true}
          />
        </form>
      ))}
    </RightModalComponent>
  );
}
