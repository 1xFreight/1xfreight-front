"use client";

import "./styles.css";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import InputChipsComponent from "@/common/components/input-chips/input-chips.component";
import { CurrencyEnum } from "@/common/enums/currency.enum";
import SliderComponent from "@/common/components/slider/slider.component";
import useStore from "@/common/hooks/use-store.context";
import { useEffect, useMemo, useRef, useState } from "react";
import { formDataToJSON } from "@/common/utils/formData.util";
import { convertStringToBool } from "@/common/utils/data-convert.utils";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";

enum UserTypePrefEnum {
  LIVE_LOAD = "Live load",
  QUOTE = "Quote",
}

export default function SettingsPage() {
  const { session, setSession } = useStore();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [canSave, setCanSave] = useState<null | any>(false);
  const sessionRef = useMemo(() => {
    return {
      name: session.name ?? "",
      position: session.position ?? "",
      phone: session.phone ?? "",
      quote_type: session.quote_type ?? "",
      currency: session.currency,
      auto_pickup: session.auto_pickup,
      auto_delivery: session.auto_delivery,
      auto_commodity: session.auto_commodity,
      default_comment: session.default_comment ?? "",
    };
  }, [session]);

  const formatQuoteType = (type: string) => {
    return type.toLowerCase().replace(" ", "_");
  };

  const getFormData = () => {
    const form = document.forms["settings-form"];
    const formData = new FormData(form);
    const newUserData = formDataToJSON(formData);

    return {
      name: newUserData.name,
      position: newUserData.position,
      phone: newUserData.phone,
      quote_type: formatQuoteType(newUserData.quote_type),
      currency: newUserData.currency,
      auto_pickup: convertStringToBool(newUserData.auto_pickup),
      auto_delivery: convertStringToBool(newUserData.auto_delivery),
      auto_commodity: convertStringToBool(newUserData.auto_commodity),
      default_comment: newUserData.default_comment,
    };
  };

  const saveData = () => {
    const dataToSave = getFormData();

    if (canSave && dataToSave) {
      postWithAuth("/users/update", dataToSave).then((res) => {
        if (res.ok) {
          getWithAuth("/users/me").then((data) => setSession(data));
        }
      });
    }
  };

  const handleChange = () => {
    const checkDataFormat = getFormData();

    if (JSON.stringify(checkDataFormat) == JSON.stringify(sessionRef)) {
      setCanSave(null);
    } else {
      setCanSave(true);
    }
  };

  const handleDebounced = useDebouncedCallback(() => handleChange(), 500);

  useEffect(() => {
    const observer = new MutationObserver(handleDebounced);

    if (formRef.current) {
      observer.observe(formRef.current!, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={"settings-page"}>
      <div className={"settings-form-wrapper"}>
        <form name={"settings-form"} className={"settings-form"} ref={formRef}>
          <div>
            <div className={"contact-info"}>
              <h2>Contact Information</h2>

              <div className={"input-wrapper"}>
                <h5>Name</h5>
                <input
                  type={"text"}
                  name={"name"}
                  defaultValue={session.name}
                />
              </div>

              <div className={"input-wrapper"}>
                <h5>Position</h5>
                <input
                  type={"text"}
                  name={"position"}
                  defaultValue={session.position}
                />
              </div>

              <div className={"input-wrapper"}>
                <h5>Phone</h5>
                <input
                  type={"text"}
                  name={"phone"}
                  defaultValue={session.phone}
                />
              </div>

              <div className={"input-wrapper"}>
                <h5>Email</h5>
                <input type={"text"} disabled defaultValue={session.email} />
              </div>
            </div>

            <div className={"user-pref"}>
              <h2>User Preferences</h2>

              <TypeSelectorComponent
                inputName={"quote_type"}
                typeEnum={UserTypePrefEnum}
                selectedEl={session.quote_type.toUpperCase()}
              />

              <div className={"eq-type"}>
                <h5>Equipment Type</h5>

                <select>
                  <option>unknown</option>
                  <option>unknown</option>
                  <option>unknown</option>
                </select>
              </div>

              {/*<InputChipsComponent />*/}
            </div>
          </div>

          <div>
            <div className={"currency-info"}>
              <h2>Currency</h2>

              <TypeSelectorComponent
                inputName={"currency"}
                typeEnum={CurrencyEnum}
                selectedEl={session.currency}
              />
            </div>

            <div className={"auto-fill"}>
              <div>
                <h5>Auto-Fill Pickup Location from Last Shipment:</h5>
                <SliderComponent
                  inputName={"auto_pickup"}
                  defaultState={session.auto_pickup}
                />
              </div>
              <div>
                <h5>Auto-Fill Delivery Location from Last Shipment:</h5>
                <SliderComponent
                  inputName={"auto_delivery"}
                  defaultState={session.auto_delivery}
                />
              </div>
              <div>
                <h5>Auto-Fill Commodity from Last Shipment:</h5>
                <SliderComponent
                  inputName={"auto_commodity"}
                  defaultState={session.auto_commodity}
                />
              </div>
            </div>

            <div className={"comment"}>
              <h5>Comment</h5>

              <textarea
                rows={5}
                name={"default_comment"}
                placeholder={"Type here..."}
                defaultValue={session.default_comment}
                onBlur={() => handleDebounced()}
              />
            </div>
          </div>
        </form>

        <button disabled={!canSave} onClick={() => saveData()}>
          SAVE
        </button>
      </div>
    </div>
  );
}
