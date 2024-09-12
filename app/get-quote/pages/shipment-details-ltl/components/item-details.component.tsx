import { PackingTypeEnum } from "@/common/enums/packing-type.enum";
import React, { useState } from "react";
import Cross from "@/public/icons/24px/cross.svg";
import { formDataToJSON } from "@/common/utils/formData.util";
import "./styles.css";
import ChevronDown from "@/public/icons/24px/chevron-down.svg";
import InfoCircle from "@/public/icons/14px/info-circle.svg";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";

export enum FreightClassEnum {
  50 = 50,
  55 = 55,
  60 = 60,
  65 = 65,
  70 = 70,
  77 = 77,
  85 = 85,
  92 = 92,
  100 = 100,
  110 = 110,
  125 = 125,
  150 = 150,
  175 = 175,
  200 = 200,
  250 = 250,
  300 = 300,
  400 = 400,
  500 = 500,
}

const skidSpot = {
  width: 48,
  length: 48,
  height: 96,
};

export default function ItemDetailsComponent({ index = 1, onRemove }) {
  const [summary, setSummary] = useState<any>();
  const inch3ToFeet3Coefficient = 0.000578703704;
  const { addData } = useRegisterQuoteContext();
  const [typeTitle, setTypeTitle] = useState<any>({});

  const estimateSkidSpots = (
    width: number,
    length: number,
    height: number,
    quantity: number,
    stackable: boolean,
  ) => {
    const longer = width > length ? width : length;
    const smaller = width < length ? width : length;
    // we rotate the skids considering which of the width and length is greater

    const skidsPerRow = longer > skidSpot.length ? 1 : 2;
    const itemsPerRow = Math.floor((skidSpot.width * 2) / smaller);
    const stackByHeight =
      Math.floor(skidSpot.height / height) >= 1 && stackable
        ? Math.floor(skidSpot.height / height)
        : 1;

    const itemsPerSkid =
      Math.floor(skidSpot.width / smaller < 1 ? 1 : skidSpot.width / smaller) *
      stackByHeight;

    const itemsInRow = itemsPerRow * stackByHeight;
    const fullFilledRows = Math.floor(quantity / itemsInRow);
    const estimatedSkids = Math.ceil((quantity % itemsInRow) / itemsPerSkid);

    // console.log("skidsPerRow", skidsPerRow);
    // console.log("itemsPerRow", itemsPerRow);
    // console.log("stackByHeight", stackByHeight);
    // console.log("itemsPerSkid", itemsPerSkid);
    // console.log("itemsInRow", itemsInRow);
    // console.log("fullFilledRows", fullFilledRows);
    // console.log("estimatedSkids", estimatedSkids);
    // console.log("skidSpot.width / smaller", skidSpot.width / smaller);
    // console.log("-------------------------------");

    if (fullFilledRows == "Infinity") {
      return "N/A";
    }

    return fullFilledRows * 2 + estimatedSkids;
  };

  const calculateItemSummary = () => {
    const form = document.forms[`item-details-${index}`];
    const formData = new FormData(form);
    const jsonData = formDataToJSON(formData);
    let newSummary: any = {};

    if (jsonData.quantity && jsonData.weight) {
      newSummary["totalWeight"] = jsonData.quantity * jsonData.weight;
    }

    if (
      jsonData.quantity &&
      jsonData.length &&
      jsonData.width &&
      jsonData.height
    ) {
      const volume =
        jsonData.length *
        jsonData.width *
        jsonData.height *
        inch3ToFeet3Coefficient;

      newSummary["totalVolume"] = volume * jsonData.quantity;

      if (newSummary?.totalWeight) {
        newSummary["totalDensity"] =
          newSummary.totalWeight / newSummary.totalVolume;
      }

      const stackable = jsonData.stackable === "on";

      newSummary["estimatedSkidSpots"] = estimateSkidSpots(
        jsonData.width,
        jsonData.length,
        jsonData.height,
        jsonData.quantity,
        stackable,
      );
    }

    if (newSummary) {
      setSummary(newSummary);
    }
  };

  const showHazardInputs = (state: boolean) => {
    const form = document.querySelector(`form[name="item-details-${index}"]`);
    const hazardousDetailsDiv = form.querySelector(
      "#hazardous-details",
    ) as HTMLDivElement;

    state
      ? (hazardousDetailsDiv.style.display = "flex")
      : (hazardousDetailsDiv.style.display = "none");

    const inputs = hazardousDetailsDiv.querySelectorAll("input");

    inputs.forEach((input, index) => {
      if (index === 3) return;
      input.required = state;
    });
  };

  return (
    <div className={"item-details"}>
      <form name={`item-details-${index}`}>
        <div
          className={"item-title"}
          onClick={() => {
            const el = document.getElementById(`item-data=${index}`);

            el.style.display === "flex"
              ? (el.style.display = "none")
              : (el.style.display = "flex");
          }}
        >
          <div>
            <ChevronDown />
            Item {index} {!!typeTitle?.type && " | "} {typeTitle?.type}{" "}
            {!!typeTitle?.quantity && " x "} {typeTitle?.quantity}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            REMOVE
          </button>
        </div>

        <div className={"item-data"} id={`item-data=${index}`}>
          <div className={"item-type"}>
            <div className={"input-wrapper"}>
              <h5>Handling unit</h5>

              <select
                name={"handling_unit"}
                defaultValue={"Other"}
                onChange={(e) =>
                  setTypeTitle({ ...typeTitle, type: e.target.value })
                }
              >
                <option value={"Pallets"}>Pallets</option>
                {Object.values(PackingTypeEnum).map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className={"input-wrapper"}>
              <h5>Quantity</h5>

              <input
                name={"quantity"}
                type={"number"}
                placeholder={"0"}
                min={0}
                required
                onChange={(e) => {
                  calculateItemSummary();
                  setTypeTitle({ ...typeTitle, quantity: e.target.value });
                }}
              />
            </div>
          </div>

          <div className={"item-lwh"}>
            <div className={"input-wrapper"}>
              <h5>
                Length <span>(in)</span>
              </h5>

              <input
                name={"length"}
                type={"number"}
                placeholder={"0"}
                min={0}
                required
                onChange={calculateItemSummary}
              />
            </div>

            <div
              style={{
                width: "2rem",
              }}
              className={"svgdiv"}
            >
              <Cross />
            </div>

            <div className={"input-wrapper"}>
              <h5>
                Width <span>(in)</span>
              </h5>

              <input
                name={"width"}
                type={"number"}
                placeholder={"0"}
                min={1}
                required
                onChange={calculateItemSummary}
              />
            </div>

            <div
              style={{
                width: "2rem",
              }}
              className={"svgdiv"}
            >
              <Cross />
            </div>

            <div className={"input-wrapper"}>
              <h5>
                Height <span>(in)</span>
              </h5>

              <input
                name={"height"}
                type={"number"}
                placeholder={"0"}
                min={1}
                required
                onChange={calculateItemSummary}
              />
            </div>

            <div className={"input-wrapper"}>
              <h5>
                Weight <span>(lb)</span>
              </h5>

              <input
                name={"weight"}
                type={"number"}
                placeholder={"0"}
                min={1}
                required
                onChange={calculateItemSummary}
              />

              <h6>per unit</h6>
            </div>

            <div className={"input-wrapper"}>
              <h5>Freight Class</h5>

              <select name={"freight_class"}>
                {Object.values(FreightClassEnum).map((type) => (
                  <option value={type} key={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={"item-dets"}>
            <div className={"input-wrapper"}>
              <h5>NMFC</h5>

              <input
                name={"nmfc"}
                type={"text"}
                placeholder={"Type here..."}
                required
              />
            </div>

            <div className={"input-wrapper"}>
              <h5>Sub class</h5>

              <input
                name={"sub_class"}
                type={"text"}
                placeholder={"Type here..."}
              />
            </div>

            <div className={"input-wrapper"}>
              <h5>Commodity</h5>

              <input
                name={"commodity"}
                type={"text"}
                placeholder={"Type here..."}
                required
              />
            </div>
          </div>

          <div className={"checkbox-wrapper"}>
            <div className={"mixed"}>
              <input name={"mixed_pallet"} type={"checkbox"} /> This is a mixed
              pallet
            </div>

            <div>
              <input
                name={"stackable"}
                type={"checkbox"}
                defaultChecked
                onChange={calculateItemSummary}
              />
              Stackable
            </div>

            <div>
              <input
                name={"hazardous_material"}
                type={"checkbox"}
                onChange={(ev) => showHazardInputs(ev.target.checked)}
              />
              Hazardous Material
            </div>
          </div>

          <div id={"hazardous-details"}>
            <div className={"input-wrapper"}>
              <h5>UN Identification Number</h5>

              <input
                name={"un_number"}
                type={"text"}
                placeholder={"Type here..."}
              />
            </div>

            <div className={"input-wrapper"}>
              <h5>Emergency Contact Name</h5>

              <input
                name={"un_number"}
                type={"text"}
                placeholder={"Type here..."}
              />
            </div>

            <div>
              <h5>Emergency Contact Phone</h5>
              <input
                type={"tel"}
                name={"emergency_phone"}
                placeholder={"Type here..."}
                pattern="^(\+?1)?[0-9]{9,10}$"
                title={"Invalid phone number, +1 XXXX XXXXXX"}
                onChange={(ev) =>
                  (ev.target.value = ev.target.value.replace(/\s/g, ""))
                }
                // defaultValue={_defaultDetails?.emergency_phone1}
              />
            </div>

            <div>
              <h5>
                Emergency Contact Phone <span>(optional)</span>
              </h5>
              <input
                type={"text"}
                name={"emergency_phone2"}
                placeholder={"Type here..."}
                pattern="^(\+?1)?[0-9]{9,10}$"
                title={"Invalid phone number, +1 XXXX XXXXXX"}
                onChange={(ev) =>
                  (ev.target.value = ev.target.value.replace(/\s/g, ""))
                }
                required={false}
                // defaultValue={_defaultDetails?.emergency_phone2}
              />
            </div>
          </div>
        </div>

        <div className={"item-summary"}>
          <div>
            <h5>EST. SKID SPOTS — {summary?.estimatedSkidSpots ?? 0}</h5>
            <div
              className={"tooltip"}
              style={{
                cursor: "pointer",
              }}
            >
              <InfoCircle />

              <span
                className={"tooltiptext"}
                style={{
                  width: "25rem",
                  padding: "0.5rem 1rem",
                  textAlign: "left",
                }}
              >
                This is a estimation based on your item width, length, height
                and stackability. For calculation we use as a standard skid spot
                a 48" x 48" x 96" physical space on a truck.
              </span>
            </div>
          </div>
          <h5>
            TOTAL VOLUME — {summary?.totalVolume?.toFixed(2) ?? 0} ft
            <span>3</span>
          </h5>
          <h5>TOTAL WEIGHT — {summary?.totalWeight?.toFixed(2) ?? 0} lb</h5>
          <h5>
            TOTAL DENSITY — {summary?.totalDensity?.toFixed(2) ?? 0} lb/ft
            <span>3</span>
          </h5>
        </div>
      </form>

      <div
        style={{
          display: "none",
        }}
      >
        <input
          name={"summary_spots"}
          type={"number"}
          value={summary?.estimatedSkidSpots ?? 0}
          readOnly
        />
        <input
          name={"summary_volume"}
          value={summary?.totalVolume ?? 0}
          readOnly
        />
        <input
          name={"summary_weight"}
          value={summary?.totalWeight ?? 0}
          readOnly
        />
        <input
          name={"summary_density"}
          value={summary?.totalDensity ?? 0}
          readOnly
        />
      </div>
    </div>
  );
}
