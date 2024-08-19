"use client";

import "./styles.css";
import { useState } from "react";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import Logo from "@/public/logo/1xfreight-logo.svg";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import useStore from "@/common/hooks/use-store.context";

enum LoginFormTabsEnum {
  EMAIL_PASS = "email & pass",
  EMAIL = "email",
}

export default function LoginFormComponent() {
  const [tab, setTab] = useState("EMAIL_PASS");
  const { setSession } = useStore();

  const signIn = () => {
    const form = document.forms["login-form"];
    if (!form[0].reportValidity()) {
      return;
    }
    const email = document.getElementsByName("email")[0].value.trim();
    const password = document.getElementsByName("password")[0].value.trim();

    console.log(email, password);

    postWithAuth("/auth/login-pass", {
      email,
      password,
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className={"login-form"}>
      <div>
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
          type={"text"}
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
  );
}
