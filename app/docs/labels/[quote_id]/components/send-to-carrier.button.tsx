"use client";

import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import React, { useState } from "react";
import LoadingSVG from "@/public/icons/loading.svg";

export default function SendToCarrierButton({ quote, downloadPDF }) {
  const [sendingMessage, setSendingMessage] = useState(false);
  const { session, showToast } = useStore();

  const sendToCarrier = async () => {
    if (!quote) return;
    setSendingMessage(true);

    const chatRoomId = quote._id + ":" + quote.bid._id;
    const pdf = await downloadPDF(true);

    const formData = new FormData();
    formData.append("file", pdf);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat/upload-document/${chatRoomId}`,
      {
        credentials: "include",
        method: "POST",
        body: formData,
      } as RequestInit,
    ).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        setTimeout(() => setSendingMessage(false), 500);

        return showToast({
          type: ToastTypesEnum.ERROR,
          text: errorData.message || "Something went wrong",
          duration: 5000,
        });
      }

      showToast({
        type: ToastTypesEnum.SUCCESS,
        text: "Your document was sent to carrier Successfully!",
        duration: 5000,
      });
      setTimeout(() => setSendingMessage(false), 500);
    });
  };

  return (
    <button onClick={() => sendToCarrier()}>
      {" "}
      {sendingMessage ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "1.5rem",
              height: "1.5rem",
              border: "2px dashed #3A56EA",
              borderRadius: "100%",
              animation: "RotateCircleAnimation 1s linear infinite",
              transition: "all 150ms ease-in-out",
            }}
          ></div>
        </div>
      ) : (
        "Send to Carrier"
      )}{" "}
    </button>
  );
}
