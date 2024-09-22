"use client";

import "./styles.css";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import React, { useEffect, useMemo, useState } from "react";
import ReferenceItemsComponent from "@/app/get-quote/pages/shipment-details-ftl/components/reference-items.component";
import ItemDetailsComponent from "@/app/get-quote/pages/shipment-details-ltl/components/item-details.component";
import AddCircle from "@/public/icons/24px/plus-circle.svg";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";
import { formDataToJSON } from "@/common/utils/formData.util";

export default function ShipmentDetailsLtlComponent() {
  const { setCanChangePage, canChangePage, getData, addData } =
    useRegisterQuoteContext();
  const _default = useMemo(() => getData("default"), [getData]);
  const _defaultItems = Array(_default?.items?.length ?? 1)
    .fill(1)
    .map(() => generateId());
  const [items, setItems] = useState(_defaultItems);
  const [itemsSummary, setItemsSummary] = useState<any>({
    totalSkidSpots: 0,
    totalVolume: 0,
    totalWeight: 0,
    totalDensity: 0,
  });

  const removeItem = (index) => {
    if (items.length === 1) return;
    setItems((prevItems) => prevItems.filter((id) => id !== index));
  };

  const addItem = () => {
    items.map((id, index) => {
      const el = document.getElementById(`item-data=${index + 1}`);
      el.style.display = "none";
    });

    setItems((prevItems) => [...prevItems, generateId()]);
  };

  function generateId() {
    const S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4();
  }

  const dataCollector = () => {
    let itemsData = [];
    let validity = true;

    items.map((id, index) => {
      const form = document.forms[`item-details-${index + 1}`];

      const check = form.checkValidity();
      const formData = new FormData(form);
      const json = formDataToJSON(formData);

      if (!check) {
        const el = document.getElementById(`item-data=${index + 1}`);
        el.style.display = "flex";
        form.reportValidity();
        validity = false;
      }

      itemsData.push(json);
    });

    const referencesForm = document.forms["references-form"];
    referencesForm.reportValidity() ? "" : (validity = false);

    if (!validity) {
      return setCanChangePage(PageStateEnum.INVALID);
    }

    const refData = formDataToJSON(new FormData(referencesForm));

    const notes = (
      document.getElementById("special_instructions_ltl") as HTMLTextAreaElement
    ).value;

    let quantity = 0;

    itemsData.map((item) => (quantity += item.quantity));

    addData({
      form: "shipment_details_ltl",
      data: {
        items: itemsData,
        notes,
        ...refData,
        quantity,
        skid_spots: itemsSummary.totalSkidSpots,
        volume: itemsSummary.totalVolume,
        density: itemsSummary.totalDensity,
        weight: itemsSummary.totalWeight,
      },
    });

    setCanChangePage(PageStateEnum.CAN_CHANGE);
  };

  const calculateItemsTotal = () => {
    const allSkidSpots = document.getElementsByName(
      "summary_spots",
    ) as NodeListOf<HTMLInputElement>;
    const allVolume = document.getElementsByName(
      "summary_volume",
    ) as NodeListOf<HTMLInputElement>;
    const allWeight = document.getElementsByName(
      "summary_weight",
    ) as NodeListOf<HTMLInputElement>;
    const allDensity = document.getElementsByName(
      "summary_density",
    ) as NodeListOf<HTMLInputElement>;

    let totalSkidSpots = 0;
    let totalVolume = 0;
    let totalWeight = 0;
    let totalDensity = 0;

    Array.from(allSkidSpots).map((input: HTMLInputElement, index) => {
      totalSkidSpots += Number(input.value);
      totalVolume += Number(allVolume.item(index).value);
      totalWeight += Number(allWeight.item(index).value);
      totalDensity += Number(allDensity.item(index).value);
    });

    let canChange = false;
    itemsSummary.totalSkidSpots != totalSkidSpots ? (canChange = true) : "";
    itemsSummary.totalVolume != totalVolume ? (canChange = true) : "";
    itemsSummary.totalWeight != totalWeight ? (canChange = true) : "";
    itemsSummary.totalDensity != totalDensity ? (canChange = true) : "";

    if (canChange) {
      setItemsSummary({
        totalSkidSpots,
        totalVolume,
        totalWeight,
        totalDensity,
      });
    }
  };

  useEffect(() => {
    if (canChangePage !== PageStateEnum.CHECK) return;

    dataCollector();
  }, [canChangePage]);

  return (
    <div className={"shipment-details-ltl"}>
      <div className={"title"}>
        <h2>Load Attributes</h2>
        <h4>
          Verify the details you’ve added and provide additional details about
          this shipment.
        </h4>
      </div>

      <form
        name={"references-form"}
        style={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <div className={"reference-no"}>
          <h3>Reference No.</h3>

          <ReferenceItemsComponent _default={_default} />
        </div>

        <div
          style={{
            marginTop: "2.1rem",
          }}
        >
          <h3>Goods Value $</h3>
          <input
            type={"number"}
            name={"goods_value"}
            min={1}
            placeholder={"0"}
            required
            defaultValue={_default.details[0].goods_value}
          />
        </div>
      </form>

      <div className={"items-wrapper"} onBlur={calculateItemsTotal}>
        {items.map((item, index) => (
          <ItemDetailsComponent
            index={index + 1}
            key={item}
            onRemove={() => removeItem(item)}
            _default={_default?.items?.length ? _default?.items[index] : null}
          />
        ))}

        <button
          className={"add-item"}
          type={"button"}
          onClick={addItem}
          disabled={items.length >= 15}
        >
          <AddCircle /> Add Another Item
        </button>
      </div>

      <div className={"total-data"}>
        <h3>Total:</h3>
        <div>
          <h5>
            Estimated skid spots: {itemsSummary.totalSkidSpots.toFixed(0)}
          </h5>
          <h5>
            Total volume: {itemsSummary.totalVolume.toFixed(2)} ft<span>3</span>
          </h5>
          <h5>Total weight: {itemsSummary.totalWeight.toFixed(2)} lb</h5>
          <h5>
            Total density: {itemsSummary.totalDensity.toFixed(2)} lb/ft
            <span>3</span>
          </h5>
        </div>
      </div>

      <div className={"instructions"}>
        <h5>Special Instructions</h5>
        <textarea
          rows={5}
          placeholder={"Type here..."}
          name={"special_instructions"}
          id={"special_instructions_ltl"}
          defaultValue={_default?.details[0].notes ?? ""}
        />
      </div>
    </div>
  );
}
