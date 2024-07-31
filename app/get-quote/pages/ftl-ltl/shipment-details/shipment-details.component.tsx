import "./styles.css";
import ReferenceItemsComponent from "@/app/get-quote/pages/ftl-ltl/shipment-details/components/reference-items.component";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";

enum PackingMethodEnum {
  PALLETIZED = "Palletized",
  FLOOR_LOADED = "Floor loaded",
}

enum WeightEnum {
  LB = "lb",
  KG = "kg",
}

export default function ShipmentDetailsComponent() {
  const showTempInputs = (value: string) => {
    const el1 = document.getElementById("min-temp-reefer");
    const el2 = document.getElementById("max-temp-reefer");
    const elInput1 = document.getElementsByName("min_temp_reefer")[0];
    const elInput2 = document.getElementsByName("max_temp_reefer")[0];

    if (value === "reefer") {
      el1.style.display = "flex";
      el2.style.display = "flex";
      elInput1.setAttribute("required", "true");
      elInput2.setAttribute("required", "true");
    } else {
      el1.style.display = "none";
      el2.style.display = "none";
      elInput1.setAttribute("required", "false");
      elInput2.setAttribute("required", "false");
    }
  };

  return (
    <div className={"shipment-details-page"}>
      <div className={"title"}>
        <h2>Load Attributes</h2>
        <h4>
          Verify the details you’ve added and provide additional details about
          this shipment.
        </h4>
      </div>

      <div className={"reference-no"}>
        <h3>Reference No.</h3>

        <ReferenceItemsComponent />
      </div>

      <div className={"equipment-type"}>
        <div>
          <h5>Equipment type</h5>

          <select
            defaultValue={"0"}
            name={"equipment_type"}
            onChange={(ev) => showTempInputs(ev.target.value)}
          >
            <option disabled value={"0"}>
              Choose an option
            </option>
            <option value={"reefer"}>Reefer</option>
            <option>Unknown</option>
          </select>
        </div>

        <div>
          <h5>Commodity</h5>

          <input
            type={"text"}
            name={"commodity"}
            placeholder={"Type here..."}
            required
          />
        </div>

        <div>
          <h5>Goods Value $</h5>

          <input
            type={"number"}
            name={"goods_value"}
            placeholder={"Type here..."}
            required
          />
        </div>

        <div
          id={"max-temp-reefer"}
          style={{
            display: "none",
          }}
        >
          <h5>Max Temp (°F)</h5>

          <input type={"number"} name={"max_temp_reefer"} placeholder={"0°"} />
        </div>

        <div
          id={"min-temp-reefer"}
          style={{
            display: "none",
          }}
        >
          <h5>Min Temp (°F)</h5>

          <input type={"number"} name={"min_temp_reefer"} placeholder={"0°"} />
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

              <input type={"number"} name={"quantity"} placeholder={"0"} />
            </div>
          </div>

          <div className={"weight-input-wrapper"}>
            <h5>Total Shipment Weight</h5>

            <div className={"weight-input"}>
              <input type={"number"} name={"weight"} placeholder={"0"} />
              <TypeSelectorComponent
                typeEnum={WeightEnum}
                inputName={"weight_type"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
