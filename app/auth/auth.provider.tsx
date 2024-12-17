"use client";

import { memo, ReactNode, useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";
import LoginFormComponent from "@/common/components/login-form/login-form.component";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { RolesPagesConfig } from "@/common/config/roles-pages.config";
import Cookies from "js-cookie";
import React from "react";
import Loading2Component from "@/common/components/loading/loading-as-page.component";

function AuthProvider({ children }: { children: ReactNode }) {
  const [authStatus, setAuthStatus] = useState<null | boolean>(null);
  const [validPath, setValidPath] = useState<null | boolean>(true);
  const { session, setSession, showToast, setCurrencies } = useStore();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const goToHome = useDebouncedCallback(() => router.push("/"), 5000, {
    leading: true,
  });

  useEffect(() => {
    if (validPath) return;
    goToHome();
  }, [validPath]);

  const authWithLinkToken = useDebouncedCallback(() => {
    postWithAuth("/auth/use-token", {
      accessToken: token,
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        return showToast({
          type: ToastTypesEnum.ERROR,
          text: errorData.message || "Something went wrong",
          duration: 5000,
        });
      }

      setAuthStatus(true);
    });

    router.push(pathname);
  }, 300);

  const checkAuth = useDebouncedCallback(() => {
    const ignoreCache = true;

    getWithAuth("/users/me", ignoreCache)
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
  }, 350);

  const getCurrencies = useDebouncedCallback(() => {
    getWithAuth("/currency/daily")
      .then((data) => {
        setCurrencies(data);
      })
      .catch(() => {});
  }, 350);

  useEffect(() => {
    if (!authStatus && authStatus !== false) {
      checkAuth();
      getCurrencies();
    }
    if (token) {
      const currentToken = Cookies.get("accessToken");

      if (!currentToken) {
        authWithLinkToken();
      }
    }
  }, []);

  useEffect(() => {
    if (session === "check") {
      checkAuth();
      getCurrencies();
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

function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <React.Suspense fallback={<Loading2Component />}>
      <AuthProvider>{children}</AuthProvider>
    </React.Suspense>
  );
}

export default memo(AppWrapper);
