"use client";

import ShipmentDetailsComponent from "@/app/get-quote/pages/shipment-details-ftl/shipment-details.component";
import React, { useEffect, useMemo } from "react";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";
import { formDataToJSON } from "@/common/utils/formData.util";

export default function ShipmentPageWrapperComponent() {
  const { setCanChangePage, canChangePage, getData, addData } =
    useRegisterQuoteContext();
  const _default = useMemo(() => getData("default"), [getData]);

  const dataCollector = () => {
    const form = document.forms[`shipment-details-ftl-form`];
    const valid = form.reportValidity();

    if (!valid) {
      return setCanChangePage(PageStateEnum.INVALID);
    }

    const formData = new FormData(form);

    const data = formDataToJSON(formData);

    addData({ form: "shipment_details", data });
    setCanChangePage(PageStateEnum.CAN_CHANGE);
  };

  useEffect(() => {
    if (canChangePage !== PageStateEnum.CHECK) return;

    dataCollector();
  }, [canChangePage]);

  return <ShipmentDetailsComponent _default={_default} />;
}
