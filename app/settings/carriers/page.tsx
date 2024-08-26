"use client";

import "./styles.css";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import CarriersTableComponent from "@/app/settings/components/carriers-table.component";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import { useEffect, useState } from "react";
import Import from "@/public/icons/24px/import.svg";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { formDataToJSON } from "@/common/utils/formData.util";
import useStore from "@/common/hooks/use-store.context";
import ToastTypesEnum from "@/common/enums/toast-types.enum";

export default function CarriersSettingsPage() {
  const { showToast } = useStore();
  const [open, setOpen] = useState(false);
  const [importData, setImportData] = useState();
  const [loadingImport, setLoadingImport] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carriers, setCarriers] = useState();

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
  }, 500);

  const debouncedGetCarriers = useDebouncedCallback(() => {
    setLoading(true);
    getWithAuth("/carrier").then((data) => {
      setCarriers(data);
      setLoading(false);
    });
  }, 1000);

  const debouncedSave = useDebouncedCallback(() => {
    const form = document.forms["newCarrierForm"];
    const valid = form[0].reportValidity();

    if (!valid) return;

    const formData = new FormData(form);
    const newCarrier = importData
      ? { ...importData, ...formDataToJSON(formData) }
      : formData;

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
      debouncedGetCarriers();
    });
    setImportData(null);
    setOpen(false);
  });

  useEffect(() => {
    debouncedGetCarriers();
  }, []);

  return (
    <div className={"carriers-page"}>
      <h2>Carriers List</h2>

      <div className={"carriers-filters"}>
        <div>
          <SearchInputComponent
            // setSearch={setSearch}
            placeholder={"Search partners..."}
            width={"20rem"}
          />
        </div>

        <button onClick={() => setOpen(true)}>
          <PlusCircle /> Add Partner
        </button>
      </div>

      <div className={"pt-wrapper"}>
        {loading ? (
          <Loading2Component />
        ) : (
          <CarriersTableComponent partners={carriers} />
        )}
      </div>

      <RightModalComponent
        open={open}
        setOpen={setOpen}
        title={"Add Carrier"}
        action={debouncedSave}
      >
        {loadingImport ? (
          <Loading2Component />
        ) : (
          <form name={"newCarrierForm"} className={"new-carrier-form fade-in"}>
            <div className={"column1"}>
              <div className={"row1"}>
                <div>
                  <h3>
                    Carrier Name<span>*</span>
                  </h3>
                  <input
                    type={"text"}
                    placeholder={"Type here..."}
                    defaultValue={importData?.name}
                    minLength={5}
                    maxLength={45}
                    name={"name"}
                    required
                  />
                </div>
              </div>

              <div className={"row1"}>
                <div>
                  <h3>MC#</h3>
                  <input
                    type={"text"}
                    name={"mc"}
                    placeholder={"Type here..."}
                    id={"mc-form-input"}
                    defaultValue={importData?.mc}
                  />
                </div>

                <div>
                  <h3>DOT#</h3>
                  <input
                    type={"text"}
                    name={"dot"}
                    placeholder={"Type here..."}
                    id={"dot-form-input"}
                    defaultValue={importData?.dot}
                  />
                </div>
              </div>

              <div className={"row1"}>
                <button
                  type={"button"}
                  onClick={() => {
                    debouncedImport();
                  }}
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

              <div className={"row1"}>
                <div>
                  <h3>
                    Email<span>*</span>
                  </h3>
                  <input
                    type={"text"}
                    placeholder={"Type here..."}
                    defaultValue={importData?.email}
                    name={"email"}
                    required
                  />
                </div>
              </div>

              <div className={"row1"}>
                <div>
                  <h3>
                    Phone<span>*</span>
                  </h3>
                  <input
                    type={"text"}
                    placeholder={"Type here..."}
                    defaultValue={importData?.phone}
                    required
                    name={"phone"}
                    minLength={9}
                    maxLength={12}
                  />
                </div>
              </div>

              <div className={"row1"}>
                <div>
                  <h3>Insurance</h3>
                  <div className={"text-inside-input"}>
                    <h6>General</h6>
                    <input
                      type={"text"}
                      placeholder={"$ Insurance amount..."}
                      defaultValue={importData?.insurance_general}
                      readOnly
                    />
                  </div>

                  <div className={"text-inside-input"}>
                    <h6>Cargo</h6>
                    <input
                      type={"text"}
                      placeholder={"$ Insurance amount..."}
                      defaultValue={importData?.insurance_cargo}
                      readOnly
                    />
                  </div>

                  <div className={"text-inside-input"}>
                    <h6>Auto</h6>
                    <input
                      type={"text"}
                      placeholder={"$ Insurance amount..."}
                      defaultValue={importData?.insurance_auto}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={"column1"}>
              <div className={"row1"}>
                <div>
                  <h3>
                    Address<span>*</span>
                  </h3>
                  <input
                    type={"text"}
                    placeholder={"Address"}
                    defaultValue={importData?.address}
                    name={"address"}
                    required
                  />
                </div>
              </div>

              <div className={"row1"}>
                <div>
                  <input
                    type={"text"}
                    placeholder={"City"}
                    defaultValue={importData?.city}
                    name={"city"}
                    required
                  />
                </div>

                <div>
                  <input
                    type={"text"}
                    placeholder={"State"}
                    name={"state"}
                    defaultValue={importData?.state}
                    required
                  />
                </div>
              </div>

              <div className={"row1"}>
                <div>
                  <input
                    type={"text"}
                    placeholder={"Zip"}
                    name={"zip"}
                    defaultValue={importData?.zip}
                  />
                </div>

                <div></div>
              </div>

              <div className={"row1"}>
                <div>
                  <h3>Authority Granted On</h3>
                  <input
                    type={"text"}
                    defaultValue={importData?.authority}
                    placeholder={"0000-00-00"}
                    readOnly
                  />
                </div>
              </div>

              <div className={"row1"}>
                <div>
                  <h3>Total US Inspections</h3>
                  <input
                    type={"text"}
                    defaultValue={importData?.total_us_inspect}
                    placeholder={"0"}
                    readOnly
                  />
                </div>
              </div>

              <div className={"row1"}>
                <div>
                  <h3>Total Canadian Inspections</h3>
                  <input
                    type={"text"}
                    defaultValue={importData?.total_can_inspect}
                    placeholder={"0"}
                    readOnly
                  />
                </div>
              </div>

              <div className={"row1"}>
                <div>
                  <h3>Fleet Size</h3>
                  <input
                    type={"text"}
                    defaultValue={importData?.fleet_size}
                    placeholder={"0"}
                    readOnly
                  />
                </div>
              </div>

              <div className={"row1"}>
                <div>
                  <h3>Safety Rating</h3>
                  <input
                    type={"text"}
                    defaultValue={importData?.safety_rating}
                    placeholder={"Not Rated"}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </form>
        )}
      </RightModalComponent>
    </div>
  );
}
