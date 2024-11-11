"use client";

import InputMask from "react-input-mask";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import { formDataToJSON } from "@/common/utils/formData.util";
import useStore from "@/common/hooks/use-store.context";

export default function AddEditModalComponent({
  open,
  setOpen,
  getMembersDebounced,
}) {
  const { showToast, getFromStore, deleteFromStore } = useStore();
  const [defaultUserData, setDefaultUserData] = useState();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const userData = getFromStore("edit-member-data");
    if (userData) {
      setDefaultUserData(userData.data);
      setIsEdit(true);
      deleteFromStore("edit-member-data");
      setOpen(true);
    }
  }, [getFromStore]);

  const saveDate = useDebouncedCallback((data) => {
    postWithAuth("/users/create-member", data).then(async (response) => {
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
        text: "User was added successfully",
        duration: 5000,
      });

      const ignoreCache = true;
      getMembersDebounced(ignoreCache);
    });
  }, 350);

  const updateMemberInfo = useDebouncedCallback(async (data: string) => {
    postWithAuth("/users/update-member", data).then(async (response) => {
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
        text: `User was updated successfully!`,
        duration: 5000,
      });

      const ignoreCache = true;
      getMembersDebounced(ignoreCache);
    });
  }, 500);

  const validateAndSave = () => {
    const form = document.forms["newUserForm"];
    const valid = form.reportValidity();

    if (valid) {
      const formData = new FormData(form);
      const userJsonData = formDataToJSON(formData);

      isEdit
        ? updateMemberInfo({ ...userJsonData, _id: defaultUserData._id })
        : saveDate();

      setDefaultUserData(null);
      setIsEdit(false);
      setOpen(false);
    }
  };

  const closeAndClean = (state: boolean) => {
    if (state) return setOpen(true);

    setIsEdit(false);
    setDefaultUserData(null);
    setOpen(false);
  };

  return (
    <>
      <RightModalComponent
        open={open}
        setOpen={closeAndClean}
        title={isEdit ? `Edit ${defaultUserData?.name}` : "Add User"}
        action={validateAndSave}
      >
        <form name={"newUserForm"} className={"new-user-form"}>
          <div>
            <div>
              <h3>
                Name <span>*</span>
              </h3>
              <input
                type={"text"}
                name={"name"}
                placeholder={"Type here..."}
                required
                maxLength={20}
                defaultValue={defaultUserData?.name ?? ""}
              />
            </div>
            <div>
              <h3>
                Position <span>*</span>
              </h3>
              <input
                type={"text"}
                name={"position"}
                placeholder={"Type here..."}
                maxLength={20}
                required
                defaultValue={defaultUserData?.position ?? ""}
              />
            </div>
          </div>

          <div>
            <div>
              <h3>
                Email <span>*</span>
              </h3>
              <input
                type={"email"}
                name={"email"}
                placeholder={"Type here..."}
                required
                defaultValue={defaultUserData?.email ?? ""}
                disabled={isEdit}
              />
            </div>
            <div>
              <h3>
                Phone <span>*</span>
              </h3>

              <InputMask
                mask="(999) 999-9999"
                placeholder="(123) 456-7890"
                className="phone-input"
                required
                defaultValue={defaultUserData?.phone ?? ""}
              >
                {(inputProps) => (
                  <input {...inputProps} type={"text"} name={"phone"} />
                )}
              </InputMask>
            </div>
          </div>

          <div>
            <div>
              <h3>Status</h3>
              <select
                className={"status-select"}
                name={"status"}
                defaultValue={defaultUserData?.status ?? "active"}
                required
              >
                <option value={"active"}>active</option>
                <option value={"inactive"}>inactive</option>
              </select>
            </div>
          </div>
        </form>
      </RightModalComponent>
    </>
  );
}
