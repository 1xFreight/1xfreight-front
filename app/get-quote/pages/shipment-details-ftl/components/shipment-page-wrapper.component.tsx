"use client";

import ShipmentDetailsComponent from "@/app/get-quote/pages/shipment-details-ftl/shipment-details.component";
import React, { useEffect } from "react";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";
import { formDataToJSON } from "@/common/utils/formData.util";

export default function ShipmentPageWrapperComponent() {
  const { setCanChangePage, canChangePage, addBreadcrumb, addData } =
    useRegisterQuoteContext();

  const dataCollector = () => {
    const form = document.forms[`shipment-details-ftl-form`];
    const valid = form.reportValidity();

    if (!valid) {
      return setCanChangePage(PageStateEnum.INVALID);
    }

    const formData = new FormData(form);

    // TODO: ConvertJSON to Backend DTO before push

    const data = formDataToJSON(formData);

    addData({ form: "shipment_details", data });
    // setCanChangePage(PageStateEnum.CAN_CHANGE);
    setCanChangePage(PageStateEnum.INVALID);
  };

  useEffect(() => {
    if (canChangePage !== PageStateEnum.CHECK) return;

    dataCollector();
  }, [canChangePage]);

  return <ShipmentDetailsComponent />;
}
