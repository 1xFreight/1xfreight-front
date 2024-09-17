"use client";

import "./styles.css";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import InputChipsComponent from "@/common/components/input-chips/input-chips.component";
import { CurrencyEnum } from "@/common/enums/currency.enum";
import SliderComponent from "@/common/components/slider/slider.component";
import useStore from "@/common/hooks/use-store.context";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { formDataToJSON } from "@/common/utils/formData.util";
import { convertStringToBool } from "@/common/utils/data-convert.utils";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import Image from "next/image";
import ImagePen from "@/public/icons/24px/image-pen.svg";
import { EquipmentsEnum } from "@/common/enums/equipments.enum";
import Cross from "@/public/icons/24px/cross.svg";

enum UserTypePrefEnum {
  LIVE_LOAD = "Live load",
  QUOTE = "Quote",
}

export default function SettingsPage() {
  const { session, setSession, showToast } = useStore();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [canSave, setCanSave] = useState<null | any>(false);
  const [list, setList] = useState(session.equipments ?? []);
  const removeItem = (email: string) => {
    setList(list.filter((em) => em !== email));
  };

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
      equipments: session.equipments ?? [],
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
      equipments: list,
    };
  };

  const saveData = () => {
    const dataToSave = getFormData();

    if (canSave && dataToSave) {
      postWithAuth("/users/update", dataToSave).then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          return showToast({
            type: ToastTypesEnum.ERROR,
            text: errorData.message || "Something went wrong",
            duration: 5000,
          });
        }

        showToast({
          type: ToastTypesEnum.SUCCESS,
          text: "Your profile was updated successfully",
          duration: 5000,
        });

        getWithAuth("/users/me").then((data) => setSession(data));
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

  const handleFileChange = useDebouncedCallback((event) => {
    const file = event.target.files[0];

    if (!file) return;
    if (file.size > 1024 * 1024)
      return showToast({
        type: ToastTypesEnum.ERROR,
        text: "File too large. Maximum allowed size is 1 MB.",
        duration: 5000,
      }); // 1mb

    document.getElementById("logo-file-btn").setAttribute("disabled", "true");

    const formData = new FormData();
    formData.append("file", file);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/upload-logo`, {
      credentials: "include",
      method: "POST",
      body: formData,
    } as RequestInit).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        return showToast({
          type: ToastTypesEnum.ERROR,
          text: errorData.message || "Something went wrong",
          duration: 5000,
        });
      }

      showToast({
        type: ToastTypesEnum.SUCCESS,
        text: "Your logo was updated successfully",
        duration: 5000,
      });

      getWithAuth("/users/me").then((data) => setSession(data));
      document.getElementById("logo-file-btn").removeAttribute("disabled");
    });
  }, 500);

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
                selectedEl={session.quote_type?.toUpperCase()}
              />

              <div className={"eq-type"}>
                <h5>Equipment Type</h5>

                <select
                  name={"equipments"}
                  onChange={(e) => setList([...list, e.target.value])}
                >
                  {Object.values(EquipmentsEnum).map((eq, index) => (
                    <option key={eq + index} value={eq}>
                      {eq}
                    </option>
                  ))}
                </select>
              </div>

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
          </div>

          <div>
            <div className={"logo-wrapper"}>
              {session?.logo && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/file-system/image/${session?.logo}`}
                  alt={"logo"}
                  width={200}
                  height={100}
                  className={"logo-img"}
                  quality={90}
                />
              )}
              <input
                type={"file"}
                accept={".jpg, .jpeg, .png"}
                onChange={handleFileChange}
                style={{
                  display: "none",
                }}
                id={"logo-file-input"}
              />

              <div className={"logo-info"}>
                <div>
                  <ImagePen />
                  <h3>Upload your logo</h3>
                </div>
                <button
                  type={"button"}
                  onClick={() => {
                    document.getElementById("logo-file-input").click();
                  }}
                  id={"logo-file-btn"}
                >
                  Choose file
                </button>
                <h6>Maximum file size: 1MB</h6>
                <h6>Supported format: JPEG, JPG, PNG</h6>
              </div>
            </div>
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
