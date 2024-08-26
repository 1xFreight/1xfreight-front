"use client";

import "./styles.css";
import Eye from "@/public/icons/24px/eye.svg";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import useStore from "@/common/hooks/use-store.context";
import ToastTypesEnum from "@/common/enums/toast-types.enum";

export default function ChangePasswordPage() {
  const { showToast } = useStore();

  const savePasswordDebounced = useDebouncedCallback(() => {
    const pass = document.getElementById("password") as HTMLInputElement;
    const passConfirm = document.getElementById(
      "password-confirm",
    ) as HTMLInputElement;

    if (pass.value !== passConfirm.value) {
      passConfirm.setCustomValidity("Password does not match");
    } else {
      passConfirm.setCustomValidity("");
    }
    if (!(pass.reportValidity() && passConfirm.reportValidity())) return;

    postWithAuth("/auth/change-password", { password: pass.value }).then(
      async (response) => {
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
          text: "Password was successfully changed",
          duration: 5000,
        });

        passConfirm.value = "";
        pass.value = "";
      },
    );
  }, 500);

  const toggleInputType = (elId: string) => {
    const passwordInput = document.getElementById(elId) as HTMLInputElement;

    if (!elId) return;

    passwordInput.type === "password"
      ? (passwordInput.type = "text")
      : (passwordInput.type = "password");
  };

  return (
    <div className={"change-password-page"}>
      <div className={"pass-input-wrapper"}>
        <h3>New password</h3>
        <div>
          <input
            type={"password"}
            placeholder={"Type here..."}
            autoComplete={"off"}
            minLength={8}
            id={"password"}
          />
          <div onClick={() => toggleInputType("password")}>
            <Eye />
          </div>
        </div>
      </div>

      <div className={"pass-input-wrapper"}>
        <h3>Confirm password</h3>
        <div>
          <input
            type={"password"}
            placeholder={"Type here..."}
            autoComplete={"off"}
            title={"Password does not match"}
            id={"password-confirm"}
          />
          <div onClick={() => toggleInputType("password-confirm")}>
            <Eye />
          </div>
        </div>
      </div>

      <button onClick={savePasswordDebounced}>Confirm</button>
    </div>
  );
}
