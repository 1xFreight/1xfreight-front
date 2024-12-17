"use client";

import LocationFormComponent from "@/app/get-quote/components/location-ftl-ltl-form/location-form.component";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import { useDebouncedCallback } from "use-debounce";
import { formDataToJSON } from "@/common/utils/formData.util";
import { formatAddressObj } from "@/common/utils/data-convert.utils";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import { useEffect, useState } from "react";

export default function AddEditModalComponent({
  open,
  setOpen,
  debouncedGetLocations,
}) {
  const { showToast, getFromStore, deleteFromStore } = useStore();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [locationData, setLocationData] = useState();

  useEffect(() => {
    const userData = getFromStore("edit-saved-location-data");
    if (userData) {
      setLocationData(userData.data);
      console.log(userData.data);
      setIsEdit(true);
      deleteFromStore("edit-saved-location-data");
      setOpen(true);
    }
  }, [getFromStore]);

  const saveDataDebounced = () => {
    const form = document.forms["location-form-Location-0"];
    const valid = form[0].reportValidity();

    if (!valid) return;

    const formData = new FormData(form);
    const location = formDataToJSON(formData);
    location.addTime = "yes";
    const locationFormatted: any = formatAddressObj(location, "drop");
    delete locationFormatted.date;
    delete locationFormatted.address_type;
    isEdit
      ? updateLocation({ ...locationFormatted, _id: locationData?._id })
      : saveLocation(locationFormatted);

    setOpen(false);
  };

  const updateLocation = useDebouncedCallback((location) => {
    postWithAuth("/address/update", location).then(async (response) => {
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
        text: "Address was updated successfully!",
        duration: 5000,
      });
      debouncedGetLocations(true);
    });
  }, 300);

  const saveLocation = useDebouncedCallback((newLocation) => {
    postWithAuth("/address", newLocation).then(async (response) => {
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
        text: "Address was added successfully!",
        duration: 5000,
      });
      debouncedGetLocations(true);
    });
  }, 300);

  const closeAndClean = (state: boolean) => {
    if (state) return setOpen(true);

    setIsEdit(false);
    setLocationData(null);
    setOpen(false);
  };

  return (
    <RightModalComponent
      open={open}
      setOpen={closeAndClean}
      title={isEdit ? `Edit ${locationData?.partial_address}` : "Add Location"}
      action={saveDataDebounced}
    >
      <div className={"settings-add-location-wrapper"}>
        {(locationData || !isEdit) && (
          <LocationFormComponent
            title={"Location"}
            index={0}
            _default={locationData}
            disableSaveLocation={true}
          />
        )}
      </div>
    </RightModalComponent>
  );
}
