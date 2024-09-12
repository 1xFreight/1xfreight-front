"use client";

import "./styles.css";
import { useState } from "react";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import Logo from "@/public/logo/1xfreight-logo.svg";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import useStore from "@/common/hooks/use-store.context";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import { isValidEmail } from "@/common/utils/email.util";
import Image from "next/image";
import LoginGif from "@/public/login-img.jpg";

enum LoginFormTabsEnum {
  EMAIL_PASS = "email & pass",
  EMAIL = "email",
}

export default function LoginFormComponent() {
  const [tab, setTab] = useState("EMAIL_PASS");
  const { showToast } = useStore();

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

    postWithAuth("/auth/login-pass", {
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

      setTimeout(() => window.location.reload(), 1000);
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
        </form>

        <button onClick={() => signIn()}>sign in</button>
      </div>
    </div>
  );
}
