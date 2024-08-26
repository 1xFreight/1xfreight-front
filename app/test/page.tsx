"use client";

import ToastComponent from "@/common/components/toaster/toast.component";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import useAuthFetch from "@/common/utils/fetchModified";
import LoadingComponent from "@/common/components/loading/loading.component";

export default function TestPage() {
  const { showToast } = useStore();
  const { getWithAuth } = useAuthFetch();

  const test = () => {
    getWithAuth("/adaw");
  };

  return (
    <div>
      {/*<PlaceAutocompleteComponent />*/}
      <ToastComponent
        type={ToastTypesEnum.SUCCESS}
        text={"User was added successfully"}
      />

      <ToastComponent
        type={ToastTypesEnum.INFO}
        text={"User was added successfully"}
      />

      <ToastComponent
        type={ToastTypesEnum.WARNING}
        text={"User was added successfully"}
      />

      <ToastComponent
        type={ToastTypesEnum.ERROR}
        text={"User was added successfully"}
      />

      <button
        onClick={() => {
          showToast({
            text: "User was added successfully",
            type: ToastTypesEnum.SUCCESS,
            duration: 3000,
          });

          setTimeout(
            () =>
              showToast({
                text: "Something went wrong",
                type: ToastTypesEnum.ERROR,
                duration: 3000,
              }),
            500,
          );

          setTimeout(
            () =>
              showToast({
                text: "This is a warning",
                type: ToastTypesEnum.WARNING,
                duration: 3000,
              }),
            1000,
          );

          setTimeout(
            () =>
              showToast({
                text: "You get a notification",
                type: ToastTypesEnum.INFO,
                duration: 3000,
              }),
            1500,
          );
        }}
      >
        addToast
      </button>

      <button onClick={() => test()}>test</button>

      <div
        style={{
          background: "white",
          height: " 20rem",
        }}
      >
        <LoadingComponent />
      </div>
    </div>
  );
}
