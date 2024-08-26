import { useContext } from "react";
import { StoreContext } from "@/common/contexts/store.context";
import ToastTypesEnum from "@/common/enums/toast-types.enum";

export default function useAuthFetch() {
  const { showToast } = useContext(StoreContext);

  const getWithAuth = (path: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      credentials: "include",
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          return showToast({
            type: ToastTypesEnum.ERROR,
            text: `An erros was occured ${response.statusText}`,
          });
        }

        showToast({
          type: ToastTypesEnum.SUCCESS,
          text: "Data was loaded successfully",
        });
        return response.json();
      })
      .then((data) => {
        return data;
      });
  };

  return { getWithAuth };
}
