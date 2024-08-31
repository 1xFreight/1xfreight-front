import "./styles.css";
import ReferenceItemsComponent from "@/app/get-quote/pages/shipment-details-ftl/components/reference-items.component";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import React, { useEffect, useState } from "react";
import { event } from "jquery";
import { EquipmentsEnum } from "@/common/enums/equipments.enum";
import Cross from "@/public/icons/24px/cross.svg";
import useStore from "@/common/hooks/use-store.context";

enum PackingMethodEnum {
  PALLETIZED = "Palletized",
  FLOOR_LOADED = "Floor loaded",
}

enum WeightEnum {
  LB = "lb",
  KG = "kg",
}

function ShipmentDetailsComponent({ _default }: { _default: any }) {
  const _defaultDetails = _default?.details ? _default?.details[0] : undefined;
  const { session } = useStore();
  const [list, setList] = useState(session?.equipments ?? []);
  const removeItem = (email: string) => {
    setList(list.filter((em) => em !== email));
  };

  useEffect(() => {
    if (_defaultDetails?.hazardous_goods) {
      showHazardInputs(true);
    }
  }, [_default]);

  useEffect(() => {
    showTempInputs();
  }, [list]);
  const showTempInputs = () => {
    const el1 = document.getElementById("min-temp-reefer");
    const el2 = document.getElementById("max-temp-reefer");
    const elInput1 = document.getElementsByName("min_temp_reefer")[0];
    const elInput2 = document.getElementsByName("max_temp_reefer")[0];

    let isReefer = false;
    list.map((eq) => {
      if (eq.includes("Refrigerated")) isReefer = true;
    });

    if (isReefer) {
      el1.style.display = "flex";
      el2.style.display = "flex";
      elInput1.setAttribute("required", "true");
      elInput2.setAttribute("required", "true");
    } else {
      el1.style.display = "none";
      el2.style.display = "none";
      elInput1.removeAttribute("required");
      elInput2.removeAttribute("required");
    }
  };

  const checkPositive = (event) => {
    const value = event.target.value;
    if (value === "") return;
    if (value < 1) return (event.target.value = String(0));
  };

  const showHazardInputs = (show: boolean) => {
    const elWrapper: HTMLDivElement = document.getElementsByClassName(
      "emergency-and-un",
    )[0] as HTMLDivElement;
    const inputs = document.querySelectorAll(".emergency-and-un input");

    elWrapper.style.display = show ? "flex" : "none";

    if (inputs && show) {
      inputs.forEach((input) => input.setAttribute("required", "true"));
    } else {
      inputs.forEach((input) => input.removeAttribute("required"));
    }
  };

  const isChecked = (_acc) => {
    const isTrue = _defaultDetails?.accessorials?.find((acc) => acc === _acc);
    return !!isTrue;
  };

  return (
    <div>
      <form name={"shipment-details-ftl-form"}>
        <div className={"shipment-details-page"}>
          <div className={"title"}>
            <h2>Load Attributes</h2>
            <h4>
              Verify the details you’ve added and provide additional details
              about this shipment.
            </h4>
          </div>

          <div className={"reference-no"}>
            <h3>Reference No.</h3>

            <ReferenceItemsComponent _default={_default} />
          </div>

          <div className={"equipment-type"}>
            <div>
              <h5>Equipment type</h5>

              <select
                defaultValue={"unknown"}
                name={"equipment_type"}
                onChange={(e) => {
                  setList([...list, e.target.value]);
                }}
              >
                {Object.values(EquipmentsEnum).map((eq, index) => (
                  <option key={eq + index} value={eq}>
                    {eq}
                  </option>
                ))}
              </select>

              <div className={"input-chips-wrapper"}>
                {list &&
                  list.map((eq, index) => (
                    <div key={eq + index} className={"chip-item"}>
                      {eq}
                      <div onClick={() => removeItem(eq)}>
                        <Cross />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <div>
                <h5>Commodity</h5>

                <input
                  type={"text"}
                  name={"commodity"}
                  placeholder={"Type here..."}
                  required
                  defaultValue={_defaultDetails?.commodity}
                />
              </div>

              <div>
                <h5>Goods Value $</h5>

                <input
                  type={"number"}
                  name={"goods_value"}
                  placeholder={"0"}
                  required
                  min={1}
                  onChange={(ev) => checkPositive(ev)}
                  defaultValue={_defaultDetails?.goods_value}
                />
              </div>

              <div
                id={"max-temp-reefer"}
                style={{
                  display: "none",
                }}
              >
                <h5>Max Temp (°F)</h5>

                <input
                  type={"number"}
                  name={"max_temp_reefer"}
                  placeholder={"0°"}
                  defaultValue={_defaultDetails?.max_temp}
                />
              </div>

              <div
                id={"min-temp-reefer"}
                style={{
                  display: "none",
                }}
              >
                <h5>Min Temp (°F)</h5>

                <input
                  type={"number"}
                  name={"min_temp_reefer"}
                  placeholder={"0°"}
                  defaultValue={_defaultDetails?.min_temp}
                />
              </div>
            </div>
          </div>

          <div className={"packing-info"}>
            <h3>Packing Information</h3>

            <div className={"packing-info-wrapper"}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5>Packing Method</h5>

                <TypeSelectorComponent
                  typeEnum={PackingMethodEnum}
                  inputName={"packing_method"}
                  selectedEl={_defaultDetails?.packing_method?.toUpperCase()}
                />
              </div>

              <div className={"packing-type"}>
                <div>
                  <h5>Packing Type</h5>

                  <select name={"packing_type"} defaultValue={"0"}>
                    <option>Unknown</option>
                    <option>Unknown</option>
                    <option>Unknown</option>
                  </select>
                </div>

                <div>
                  <h5>Quantity</h5>

                  <input
                    type={"number"}
                    name={"quantity"}
                    placeholder={"0"}
                    required
                    min={1}
                    onChange={(ev) => checkPositive(ev)}
                    defaultValue={_defaultDetails?.quantity}
                  />
                </div>
              </div>

              <div className={"weight-input-wrapper"}>
                <h5>Total Shipment Weight</h5>

                <div className={"weight-input"}>
                  <input
                    type={"number"}
                    name={"weight"}
                    placeholder={"0"}
                    required
                    min={1}
                    onChange={(ev) => checkPositive(ev)}
                    defaultValue={_defaultDetails?.weight}
                  />
                  <TypeSelectorComponent
                    typeEnum={WeightEnum}
                    inputName={"weight_type"}
                    selectedEl={_defaultDetails?.weight_unit?.toUpperCase()}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={"accessorials"}>
            <h3>Accessorials</h3>

            <div className={"accessorials-items"}>
              <div>
                <input
                  type={"checkbox"}
                  name={"tarps"}
                  defaultChecked={isChecked("tarps")}
                />
                <h5>Tarps</h5>
              </div>

              <div>
                <input
                  type={"checkbox"}
                  name={"frozen"}
                  defaultChecked={isChecked("frozen")}
                />
                <h5>Frozen</h5>
              </div>

              <div>
                <input
                  type={"checkbox"}
                  name={"load_bars"}
                  defaultChecked={isChecked("load bars")}
                />
                <h5>Load Bars</h5>
              </div>

              <div>
                <input
                  type={"checkbox"}
                  name={"straps"}
                  defaultChecked={isChecked("straps")}
                />
                <h5>Straps</h5>
              </div>

              <div>
                <input
                  type={"checkbox"}
                  name={"team_drivers"}
                  defaultChecked={isChecked("team drivers")}
                />
                <h5>Team Drivers</h5>
              </div>
            </div>
          </div>

          <div className={"hazardous-goods"}>
            <h3>Hazardous Goods</h3>
            <div className={"radio-btn"}>
              <div className={"radio-yes"}>
                <input
                  type={"radio"}
                  name={"hazardous_goods"}
                  value={"yes"}
                  onClick={() => showHazardInputs(true)}
                  defaultChecked={_defaultDetails?.hazardous_goods}
                />
                <h5>Yes</h5>
              </div>
              <div className={"radio-no"}>
                <input
                  type={"radio"}
                  name={"hazardous_goods"}
                  value={"no"}
                  defaultChecked={!_defaultDetails?.hazardous_goods}
                  onClick={() => showHazardInputs(false)}
                />
                <h5>No</h5>
              </div>
            </div>
          </div>

          <div className={"emergency-and-un"}>
            <div>
              <h5>UN Identification Number</h5>
              <input
                type={"text"}
                name={"un_id_number"}
                placeholder={"Type here..."}
                defaultValue={_defaultDetails?.un_number}
              />
            </div>

            <div>
              <h5>Emergency Contact Name</h5>
              <input
                type={"text"}
                name={"emergency_name"}
                placeholder={"Type here..."}
                defaultValue={_defaultDetails?.emergency_contact}
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
                defaultValue={_defaultDetails?.emergency_phone1}
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
                defaultValue={_defaultDetails?.emergency_phone2}
              />
            </div>
          </div>

          <div className={"instructions"}>
            <h5>Special Instructions</h5>
            <textarea
              rows={5}
              placeholder={"Type here..."}
              name={"special_instructions"}
              defaultValue={_defaultDetails?.notes}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default React.memo(ShipmentDetailsComponent);
