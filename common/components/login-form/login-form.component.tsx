"use client";

import "./styles.css";
import { useEffect, useState } from "react";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import Logo from "@/public/logo/1xfreight-logo.svg";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import useStore from "@/common/hooks/use-store.context";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import { isValidEmail } from "@/common/utils/email.util";
import Image from "next/image";
import LoginGif from "@/public/login-img.jpg";
import { useDebouncedCallback } from "use-debounce";

enum LoginFormTabsEnum {
  EMAIL_PASS = "email & pass",
  EMAIL = "email",
}

export default function LoginFormComponent() {
  const [tab, setTab] = useState("EMAIL_PASS");
  const { showToast } = useStore();
  const [isSendEmailUnavailable, setSendEmailUnavailable] = useState(false);

  const signIn = () => {
    const form = document.forms["login-form"];
    if (!form[0].reportValidity()) {
      return;
    }

    const emailInput = document.getElementsByName(
      "email",
    )[0] as HTMLInputElement;
    const passInput = document.getElementsByName(
      "password",
    )[0] as HTMLInputElement;
    const email = emailInput.value?.trim();
    const password = passInput.value?.trim();

    if (isSendEmailUnavailable) return;

    console.log(tab);

    postWithAuth(`/auth/login-${tab == "EMAIL_PASS" ? "pass" : "email"}`, {
      email,
      password,
    }).then(async (response) => {
      emailInput.disabled = true;
      passInput.disabled = true;

      if (!response.ok) {
        const errorData = await response.json();
        emailInput.disabled = false;
        passInput.disabled = false;
        return showToast({
          type: ToastTypesEnum.ERROR,
          text: errorData.message || "Something went wrong",
          duration: 10000,
        });
      }

      if (tab != "EMAIL_PASS") {
        showToast({
          type: ToastTypesEnum.SUCCESS,
          text: "We have sent you an email.",
          duration: 10000,
        });
        setSendEmailUnavailable(true);
        emailInput.disabled = true;
        passInput.disabled = true;

        setTimeout(() => {
          setSendEmailUnavailable(false);
          emailInput.disabled = false;
        }, 30000);
      }

      if (tab == "EMAIL_PASS") {
        setTimeout(() => window.location.reload(), 1000);
      }
    });
  };

  return (
    <div className={"login-form"}>
      <div className={"login-gif"}>
        <div>
          <Image src={LoginGif} alt={"login-img"} />
        </div>
      </div>

      <div className={"login-form-wrapper"}>
        <div className={"logo-logo"}>
          <Logo />
        </div>
        <div className={"tab-selector"}>
          <TypeSelectorComponent
            type={tab}
            setType={setTab}
            typeEnum={LoginFormTabsEnum}
          />
        </div>

        <form name={"login-form"} className={"login-input"}>
          <input
            type={"email"}
            name={"email"}
            required={true}
            placeholder={"email@example.com"}
          />
          <input
            type={"password"}
            name={"password"}
            placeholder={"password"}
            required={tab === "EMAIL_PASS"}
            disabled={tab !== "EMAIL_PASS"}
            minLength={8}
          />

          <ButtonWithTimer
            isSendEmailUnavailable={isSendEmailUnavailable}
            signIn={signIn}
          />
        </form>
      </div>
    </div>
  );
}

export function ButtonWithTimer({ isSendEmailUnavailable, signIn }) {
  const [time, setTime] = useState(0);

  const startTimer = useDebouncedCallback(
    () => {
      setTime(30);
      setInterval(() => setTime((time) => time - 1), 1000);
    },
    500,
    { leading: true },
  );

  useEffect(() => {
    if (isSendEmailUnavailable) {
      startTimer();
    }
  }, [isSendEmailUnavailable]);

  return (
    <button onClick={() => signIn()} type={"button"}>
      {isSendEmailUnavailable
        ? `you will be able to resend email in ${time}`
        : "sign in"}
    </button>
  );
}
