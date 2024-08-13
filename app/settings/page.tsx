import "./styles.css";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import InputChipsComponent from "@/common/components/input-chips/input-chips.component";
import { CurrencyEnum } from "@/common/enums/currency.enum";
import SliderComponent from "@/common/components/slider/slider.component";

enum UserTypePrefEnum {
  TRUCKLOAD = "Truckload",
  LTLQUOTING = "LTL Quoting",
}

export default function SettingsPage() {
  return (
    <div className={"settings-page"}>
      <div className={"settings-form-wrapper"}>
        <form name={"settings-form"} className={"settings-form"}>
          <div>
            <div className={"contact-info"}>
              <h2>Contact Information</h2>

              <div className={"input-wrapper"}>
                <h5>Name</h5>
                <input type={"text"} />
              </div>

              <div className={"input-wrapper"}>
                <h5>Position</h5>
                <input type={"text"} disabled value={"Shipping Manager"} />
              </div>

              <div className={"input-wrapper"}>
                <h5>Phone</h5>
                <input type={"text"} value={"+1000222999"} disabled />
              </div>

              <div className={"input-wrapper"}>
                <h5>Email</h5>
                <input type={"text"} value={"ship@fortus.md"} disabled />
              </div>
            </div>

            <div className={"user-pref"}>
              <h2>User Preferences</h2>

              <TypeSelectorComponent
                inputName={"typePreference"}
                typeEnum={UserTypePrefEnum}
              />

              <div className={"eq-type"}>
                <h5>Equipment Type</h5>

                <select>
                  <option>unknown</option>
                  <option>unknown</option>
                  <option>unknown</option>
                </select>
              </div>

              <InputChipsComponent />
            </div>
          </div>

          <div>
            <div className={"currency-info"}>
              <h2>Currency</h2>

              <TypeSelectorComponent
                inputName={"currencyPreference"}
                typeEnum={CurrencyEnum}
              />
            </div>

            <div className={"auto-fill"}>
              <div>
                <h5>Auto-Fill Pickup Location from Last Shipment:</h5>
                <SliderComponent inputName={"autoPickup"} />
              </div>
              <div>
                <h5>Auto-Fill Delivery Location from Last Shipment:</h5>
                <SliderComponent inputName={"autoDelivery"} />
              </div>
              <div>
                <h5>Auto-Fill Commodity from Last Shipment:</h5>
                <SliderComponent inputName={"autoCommodity"} />
              </div>
            </div>

            <div className={"comment"}>
              <h5>Comment</h5>

              <textarea
                rows={5}
                name={"defaultComment"}
                placeholder={"Type here..."}
              />
            </div>
          </div>
        </form>

        <button disabled>SAVE</button>
      </div>
    </div>
  );
}
