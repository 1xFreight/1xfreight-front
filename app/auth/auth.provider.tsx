"use client";

import { ReactNode, useEffect, useState } from "react";
import LoadingComponent from "@/common/components/loading/loading.component";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [authStatus, setAuthStatus] = useState<null | boolean>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error("Fetch error:", error));
  }, []);

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
        <h3>AuthProvider</h3>
      </div>
    );

  return <>{children}</>;
}
