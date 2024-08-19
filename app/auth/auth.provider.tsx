"use client";

import { memo, ReactNode, useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import LoginFormComponent from "@/common/components/login-form/login-form.component";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";

function AuthProvider({ children }: { children: ReactNode }) {
  const [authStatus, setAuthStatus] = useState<null | boolean>(null);
  const { session, setSession } = useStore();

  const checkAuth = useDebouncedCallback(() => {
    getWithAuth("/users/me")
      .then((data) => {
        setAuthStatus(true);
        setSession(data);
      })
      .catch(() => setAuthStatus(false));
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
