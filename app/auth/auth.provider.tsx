"use client";

import { memo, ReactNode, useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import LoginFormComponent from "@/common/components/login-form/login-form.component";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";
import ToastTypesEnum from "@/common/enums/toast-types.enum";

function AuthProvider({ children }: { children: ReactNode }) {
  const [authStatus, setAuthStatus] = useState<null | boolean>(null);
  const { session, setSession, showToast } = useStore();

  const checkAuth = useDebouncedCallback(() => {
    getWithAuth("/users/me")
      .then((data) => {
        setAuthStatus(true);
        setSession(data);
        showToast({
          type: ToastTypesEnum.SUCCESS,
          text: "You was logged in",
          duration: 5000,
        });
      })
      .catch(() => {
        setAuthStatus(false);
        showToast({
          type: ToastTypesEnum.ERROR,
          text: "Unauthorized",
          duration: 5000,
        });
      });
  }, 500);

  useEffect(() => {
    if (!authStatus && authStatus !== false) {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    if (session === "check") {
      checkAuth();
    }
  }, [session]);

  if (authStatus === false)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginFormComponent />
      </div>
    );

  if (!authStatus)
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingComponent />
      </div>
    );

  return <>{children}</>;
}

export default memo(AuthProvider);
