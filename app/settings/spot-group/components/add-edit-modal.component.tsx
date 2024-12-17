"use client";

import Cross from "@/public/icons/24px/cross.svg";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import React, { useEffect, useState } from "react";
import { formDataToJSON } from "@/common/utils/formData.util";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";

export default function AddEditModalComponent({
  open,
  setOpen,
  getCarriersDebounced,
  carriers,
  getSpotGroupsDebounced,
}) {
  const [selectedCarriers, setSelectedCarriers] = useState([]);
  const { showToast, getFromStore, deleteFromStore } = useStore();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [spotGroupData, setSpotGroupData] = useState();

  useEffect(() => {
    const userData = getFromStore("edit-spot-group-data");
    if (userData) {
      setSpotGroupData(userData.data);
      setSelectedCarriers(userData.data.local_carriers);
      setIsEdit(true);
      deleteFromStore("edit-spot-group-data");
      setOpen(true);
    }
  }, [getFromStore]);

  const updateSpotGroup = useDebouncedCallback(async (data) => {
    postWithAuth("/carrier/spot-update", data).then(async (response) => {
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
        text: `Spot group was updated successfully!`,
        duration: 5000,
      });

      getSpotGroupsDebounced(true);
    });
  }, 500);

  const deleteSpotGroup = useDebouncedCallback(async (id) => {
    postWithAuth("/carrier/spot-delete", { _id: id }).then(async (response) => {
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
        text: `Spot group was deleted successfully!`,
        duration: 5000,
      });

      getSpotGroupsDebounced(true);
    });
  }, 500);

  const saveDate = useDebouncedCallback((data) => {
    postWithAuth("/carrier/spot-create", data).then(async (response) => {
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
        text: "Spot Group was added successfully",
        duration: 5000,
      });

      getSpotGroupsDebounced(true);
    });
  }, 500);

  const validateAndSave = () => {
    const form = document.forms["newGroupForm"];
    const valid = form.reportValidity();

    if (valid && !!selectedCarriers.length) {
      const formData = new FormData(form);
      const obj = formDataToJSON(formData);
      obj["carriers"] = selectedCarriers.map(({ _id }) => _id);
      isEdit
        ? updateSpotGroup({ ...obj, _id: spotGroupData._id })
        : saveDate(obj);
      closeAndClean(false);
    }
  };

  const removeItem = (id: string) => {
    setSelectedCarriers(selectedCarriers.filter(({ _id }) => _id !== id));
  };

  const closeAndClean = (state: boolean) => {
    if (state) return setOpen(true);

    setIsEdit(false);
    setSpotGroupData(null);
    setSelectedCarriers(null);
    setOpen(false);
  };

  const deleteGroupButton = (
    <button
      type={"button"}
      // className={"delete-spot-group"}
      onClick={() => {
        deleteSpotGroup(spotGroupData?._id);
        setOpen(false);
      }}
    >
      Delete Spot Group
    </button>
  );

  return (
    <RightModalComponent
      open={open}
      setOpen={closeAndClean}
      title={isEdit ? `Edit ${spotGroupData?.name}` : "Add Spot Group"}
      action={validateAndSave}
      extraButton={isEdit ? deleteGroupButton : null}
    >
      <form name={"newGroupForm"} className={"new-group-form"}>
        <div>
          <div>
            <h3>
              Group Name (tag) <span>*</span>
            </h3>
            <input
              type={"text"}
              name={"name"}
              placeholder={"Type here..."}
              required
              maxLength={20}
              defaultValue={spotGroupData?.name}
            />
          </div>
        </div>

        <div>
          <div>
            <h3>Search Carriers</h3>

            <input
              type={"text"}
              placeholder={"Type here..."}
              onChange={(ev) => getCarriersDebounced(ev.target.value)}
            />

            <div className={"carrier-search-wrapper"}>
              {carriers.map((carrier) => (
                <div
                  className={"carrier-search-item"}
                  key={carrier.name}
                  onClick={() =>
                    setSelectedCarriers((prevState) => [...prevState, carrier])
                  }
                >
                  {carrier.name.toLowerCase()}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className={"input-chips-wrapper"}>
            {selectedCarriers &&
              selectedCarriers.map((eq, index) => (
                <div key={eq + index} className={"chip-item"}>
                  {eq.email}
                  <div onClick={() => removeItem(eq._id)}>
                    <Cross />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div>
            <h3>
              Status <span>*</span>
            </h3>
            <select name={"status"} defaultValue={spotGroupData?.status}>
              <option value={"active"}>active</option>
              <option value={"inactive"}>inactive</option>
            </select>
          </div>
        </div>
      </form>
    </RightModalComponent>
  );
}
