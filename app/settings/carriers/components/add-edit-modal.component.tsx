"use client";

import Loading2Component from "@/common/components/loading/loading-as-page.component";
import Import from "@/public/icons/24px/import.svg";
import InputMask from "react-input-mask";
import { formatCurrency } from "@/common/utils/number-comma.utils";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import { formDataToJSON } from "@/common/utils/formData.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";

export default function AddEditModalComponent({
  open,
  setOpen,
  debouncedGetCarriers,
}) {
  const [loadingImport, setLoadingImport] = useState(false);
  const [importData, setImportData] = useState();
  const { showToast, getFromStore, deleteFromStore } = useStore();
  const [defaultCarrierData, setDefaultCarrierData] = useState();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const userData = getFromStore("edit-carrier-data");
    if (userData) {
      setDefaultCarrierData(userData.data);
      console.log(userData.data);
      setIsEdit(true);
      deleteFromStore("edit-carrier-data");
      setOpen(true);
    }
  }, [getFromStore]);

  const debouncedSave = useDebouncedCallback(() => {
    const form = document.forms["newCarrierForm"];
    let isValid = true;

    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];
      if (!element.reportValidity()) {
        isValid = false;
        break;
      }
    }

    if (!isValid) return;

    const formData = new FormData(form);
    const newCarrier = importData
      ? { ...importData, ...formDataToJSON(formData) }
      : formDataToJSON(formData);

    isEdit
      ? updateCarrierData({ ...newCarrier, _id: defaultCarrierData?._id })
      : saveCarrierData(newCarrier);

    closeAndClean(false);
  });

  const saveCarrierData = useDebouncedCallback((newCarrier) => {
    postWithAuth("/carrier/create", newCarrier).then(async (response) => {
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
        text: "Carrier was added successfully",
        duration: 5000,
      });
      debouncedGetCarriers(true);
    });
  }, 300);

  const updateCarrierData = useDebouncedCallback(async (carrierData) => {
    postWithAuth("/carrier/update", carrierData).then(async (response) => {
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
        text: `Carrier was updated successfully!`,
        duration: 5000,
      });

      debouncedGetCarriers(true);
    });
  }, 300);

  const debouncedImport = useDebouncedCallback(() => {
    const mc: HTMLInputElement | null = document.getElementById(
      "mc-form-input",
    ) as HTMLInputElement;
    const dot: HTMLInputElement | null = document.getElementById(
      "dot-form-input",
    ) as HTMLInputElement;
    const errMessage = document.getElementById("fmcsa-err-message");

    if (!mc?.value && !dot?.value) {
      return (errMessage.style.display = "block");
    }
    setLoadingImport(true);

    errMessage.style.display = "none";
    getWithAuth(
      `/carrier/fmcsa?${mc.value ? `mc=${mc.value}&` : ""}${dot.value ? `dot=${dot.value}` : ""}`,
    ).then((data) => {
      setImportData(data);
      setLoadingImport(false);
    });
  }, 350);

  const closeAndClean = (state: boolean) => {
    if (state) return setOpen(true);

    setIsEdit(false);
    setDefaultCarrierData(null);
    setImportData(null);
    setOpen(false);
  };

  return (
    <RightModalComponent
      open={open}
      setOpen={closeAndClean}
      title={isEdit ? `Edit ${defaultCarrierData?.name}` : "Add Carrier"}
      action={debouncedSave}
    >
      {loadingImport ? (
        <Loading2Component />
      ) : (
        <form name={"newCarrierForm"} className={"new-carrier-form fade-in"}>
          <div className={"form-column"}>
            <div className={"row-item"}>
              <h3>
                Carrier Name<span>*</span>
              </h3>
              <input
                type={"text"}
                placeholder={"Type here..."}
                defaultValue={importData?.name ?? defaultCarrierData?.name}
                minLength={5}
                maxLength={45}
                name={"name"}
                required
              />
            </div>

            <div className={"row-input-wrapper"}>
              <div className={"row-item half"}>
                <h3>MC#</h3>
                <input
                  type={"text"}
                  name={"mc"}
                  placeholder={"Type here..."}
                  id={"mc-form-input"}
                  defaultValue={importData?.mc ?? defaultCarrierData?.mc}
                />
              </div>

              <div className={"row-item half"}>
                <h3>DOT#</h3>
                <input
                  type={"text"}
                  name={"dot"}
                  placeholder={"Type here..."}
                  id={"dot-form-input"}
                  defaultValue={importData?.dot ?? defaultCarrierData?.dot}
                />
              </div>
            </div>

            <div className={"row-item"}>
              <button
                type={"button"}
                onClick={() => {
                  debouncedImport();
                }}
                id={"fcmsa-import"}
              >
                <Import /> FMCSA Import
              </button>

              <div
                style={{
                  position: "absolute",
                  bottom: "-1.5rem",
                  width: "fit-content",
                  right: 0,
                  color: "#ED0000",
                  display: "none",
                }}
                className={"fade-in"}
                id={"fmcsa-err-message"}
              >
                Provide MC# or DOT#
              </div>
            </div>

            <div className={"input-row-wrapper"}>
              <div className={"row-item"}>
                <h3>
                  Email<span>*</span>
                </h3>
                <input
                  type={"email"}
                  placeholder={"Type here..."}
                  defaultValue={importData?.email ?? defaultCarrierData?.email}
                  name={"email"}
                  required
                />
              </div>
            </div>

            <div className={"input-row-wrapper"}>
              <h3>
                Phone<span>*</span>
              </h3>

              <InputMask
                mask="(999) 999-9999"
                placeholder="(123) 456-7890"
                className="phone-input"
                defaultValue={importData?.phone ?? defaultCarrierData?.phone}
                required
              >
                {(inputProps) => (
                  <input {...inputProps} type={"text"} name={"phone"} />
                )}
              </InputMask>
            </div>

            <div className={"row1"}>
              <h3>Insurance</h3>
              <div className={"text-inside-input"}>
                <h6>General</h6>
                <input
                  type={"text"}
                  placeholder={"$ Insurance amount..."}
                  defaultValue={formatCurrency(
                    importData?.insurance_general ??
                      defaultCarrierData?.insurance_general,
                  )}
                  readOnly
                />
              </div>

              <div className={"text-inside-input"}>
                <h6>Cargo</h6>
                <input
                  type={"text"}
                  placeholder={"$ Insurance amount..."}
                  defaultValue={formatCurrency(
                    importData?.insurance_cargo ??
                      defaultCarrierData?.insurance_auto,
                  )}
                  readOnly
                />
              </div>

              <div className={"text-inside-input"}>
                <h6>Auto</h6>
                <input
                  type={"text"}
                  placeholder={"$ Insurance amount..."}
                  defaultValue={formatCurrency(
                    importData?.insurance_auto ??
                      defaultCarrierData?.insurance_auto,
                  )}
                  readOnly
                />
              </div>
            </div>

            <div className={"row1"}>
              <div>
                <h3>Status</h3>
                <select
                  name={"status"}
                  className={"status-select"}
                  defaultValue={defaultCarrierData?.status ?? "active"}
                  required
                >
                  <option value={"active"}>active</option>
                  <option value={"inactive"}>inactive</option>
                </select>
              </div>
            </div>
          </div>

          <div className={"form-column"}>
            <div className={"row-input-wrapper"}>
              <div className={"row-item"}>
                <h3>
                  Address<span>*</span>
                </h3>
                <input
                  type={"text"}
                  placeholder={"Address"}
                  defaultValue={
                    importData?.address ?? defaultCarrierData?.address
                  }
                  name={"address"}
                  required
                />
              </div>
            </div>

            <div className={"row-input-wrapper"}>
              <div className={"row-item half"}>
                <input
                  type={"text"}
                  placeholder={"City"}
                  defaultValue={importData?.city ?? defaultCarrierData?.city}
                  name={"city"}
                  required
                />
              </div>

              <div className={"row-item half"}>
                <input
                  type={"text"}
                  placeholder={"State"}
                  name={"state"}
                  defaultValue={importData?.state ?? defaultCarrierData?.state}
                  required
                />
              </div>
            </div>

            <div className={"row-input-wrapper"}>
              <div className={"row-item half"}>
                <input
                  type={"text"}
                  placeholder={"Zip"}
                  name={"zip"}
                  defaultValue={importData?.zip ?? defaultCarrierData?.zip}
                />
              </div>

              <div className={"row-item half"}></div>
            </div>

            <div className={"row-input-wrapper"}>
              <div className={"row-item"}>
                <h3>Authority Granted On</h3>
                <input
                  type={"text"}
                  defaultValue={
                    importData?.authority ?? defaultCarrierData?.authority
                  }
                  placeholder={"0000-00-00"}
                  readOnly
                />
              </div>
            </div>

            <div className={"row-input-wrapper"}>
              <div className={"row-item"}>
                <h3>Total US Inspections</h3>
                <input
                  type={"text"}
                  defaultValue={
                    importData?.total_us_inspect ??
                    defaultCarrierData?.total_us_inspect
                  }
                  placeholder={"0"}
                  readOnly
                />
              </div>
            </div>

            <div className={"row-input-wrapper"}>
              <div className={"row-item"}>
                <h3>Total Canadian Inspections</h3>
                <input
                  type={"text"}
                  defaultValue={
                    importData?.total_can_inspect ??
                    defaultCarrierData?.total_can_inspect
                  }
                  placeholder={"0"}
                  readOnly
                />
              </div>
            </div>

            <div className={"row-input-wrapper"}>
              <div className={"row-item"}>
                <h3>Fleet Size</h3>
                <input
                  type={"text"}
                  defaultValue={
                    importData?.fleet_size ?? defaultCarrierData?.fleet_size
                  }
                  placeholder={"0"}
                  readOnly
                />
              </div>
            </div>

            <div className={"row-input-wrapper"}>
              <div className={"row-item"}>
                <h3>Safety Rating</h3>
                <input
                  type={"text"}
                  defaultValue={
                    importData?.safety_rating ??
                    defaultCarrierData?.safety_rating
                  }
                  placeholder={"Not Rated"}
                  readOnly
                />
              </div>
            </div>
          </div>
        </form>
      )}
    </RightModalComponent>
  );
}
