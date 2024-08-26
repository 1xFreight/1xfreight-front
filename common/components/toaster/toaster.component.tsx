"use client";

import useStore from "@/common/hooks/use-store.context";
import ToastComponent from "@/common/components/toaster/toast.component";
import { memo, useEffect, useState } from "react";

function ToasterComponent() {
  const { toasts } = useStore();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          gap: "0.5rem",
          zIndex: 200,
          top: "5rem",
          width: "100%",
          alignItems: "end",
          justifyContent: "end",
          transition: "all 200ms ease-in-out",
          right: "1rem",
        }}
      >
        {toasts &&
          toasts.map((config, index) => (
            <ToastComponent {...config} key={config.id} index={index} />
          ))}
      </div>
    </>
  );
}

export default memo(ToasterComponent);
