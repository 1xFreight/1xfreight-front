"use client";

import { memo, ReactNode, useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import LoginFormComponent from "@/common/components/login-form/login-form.component";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import { usePathname, useRouter } from "next/navigation";
import { RolesPagesConfig } from "@/common/config/roles-pages.config";

function AuthProvider({ children }: { children: ReactNode }) {
  const [authStatus, setAuthStatus] = useState<null | boolean>(null);
  const [validPath, setValidPath] = useState<null | boolean>(true);
  const { session, setSession, showToast } = useStore();
  const pathname = usePathname();
  const router = useRouter();

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

  useEffect(() => {
    if (pathname && session && RolesPagesConfig[session.role]) {
      RolesPagesConfig[session.role].includes(pathname) ||
      RolesPagesConfig[session.role].some((route) => pathname.includes(route))
        ? setValidPath(true)
        : setValidPath(false);

      RolesPagesConfig.ALL.map((path) =>
        path === pathname ? setValidPath(true) : "",
      );
    } else {
      return setValidPath(true);
    }
  }, [pathname, session]);

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

  if (!validPath) {
    setTimeout(() => router.push("/"), 3000);
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
        <h2>Invalid path, redirecting...</h2>
      </div>
    );
  }

  return <>{children}</>;
}

export default memo(AuthProvider);
