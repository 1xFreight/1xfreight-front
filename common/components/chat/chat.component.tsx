"use client";

import "./styles.css";
import Chat from "@/public/icons/30px/comment.svg";
import AddFile from "@/public/icons/30px/Layer 2.svg";
import MessageComponent from "@/common/components/chat/components/message.component";
import React, { useEffect, useState } from "react";
import { useChat } from "@/common/hooks/use-chat.hook";
import { useDebouncedCallback } from "use-debounce";
import useStore from "@/common/hooks/use-store.context";
import { chatDateFormat } from "@/common/utils/date.utils";
import { ChatEventsEnum } from "@/common/enums/socket-events.enum";
import LoadingCircle from "@/common/components/loading/loading-circle.component";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import { useRouter } from "next/navigation";

export default function ChatComponent({ room, title }) {
  const [messages, setMessages] = useState<any[]>(null);
  const { connect, disconnect, sendMessage, joinRoom, chatService } = useChat();
  const { session, showToast } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#chat") {
      const chatElement = document.getElementById("chat");
      if (chatElement) {
        chatElement.classList.add("glow");
        setTimeout(() => {
          chatElement.scrollIntoView({ behavior: "smooth", inline: "start" });
        }, 700); // Delay the scroll to ensure element is rendered
      }
    }
  }, []);

  const handleNewMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      sendMessageDebounced();
    }
  };

  const initializeChat = useDebouncedCallback(() => {
    connect()
      .then(() => joinRoom(room).then((re) => setMessages(re)))
      .then(() =>
        chatService.socket.on(ChatEventsEnum.NEW_MESSAGE, handleNewMessage),
      );
  }, 350);

  useEffect(() => {
    initializeChat();
  }, []);

  useEffect(() => {
    const chatBodyEl = document.getElementById("chat-body");
    chatBodyEl.scrollTop = chatBodyEl.scrollHeight;
  }, [messages]);

  const sendMessageDebounced = useDebouncedCallback(() => {
    const messageInput = document.getElementById(
      "chat-message-input",
    ) as HTMLInputElement;
    const message = messageInput.value;

    if (message?.length > 0) {
      sendMessage(message);
    }

    messageInput.value = "";
  }, 350);

  const handleFileChange = useDebouncedCallback((event) => {
    const file = event.target.files[0];

    if (!file) return;
    if (file.size > 1024 * 1024 * 5)
      return showToast({
        type: ToastTypesEnum.ERROR,
        text: "File too large. Maximum allowed size is 5 MB.",
        duration: 5000,
      }); // 1mb

    // document.getElementById("logo-file-btn").setAttribute("disabled", "true");

    const formData = new FormData();
    formData.append("file", file);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/upload-document/${room}`, {
      credentials: "include",
      method: "POST",
      body: formData,
    } as RequestInit).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        return showToast({
          type: ToastTypesEnum.ERROR,
          text: errorData.message || "Something went wrong",
          duration: 5000,
        });
      }

      showToast({
        type: ToastTypesEnum.SUCCESS,
        text: "Your document was uploaded successfully",
        duration: 5000,
      });

      // document.getElementById("logo-file-btn").removeAttribute("disabled");
    });
  }, 350);

  return (
    <div className={"default-chat-wrapper"} id={"chat"}>
      <div className={"chat-title"}>
        <div>
          <Chat />
          <div className={"chat-text"}>
            <h5>Chat</h5>
          </div>
        </div>
        <div className={"username"}>{title}</div>
      </div>

      <div
        className={"chat-body"}
        id={"chat-body"}
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {!!messages?.length &&
          messages.map((mess) => {
            return (
              <MessageComponent
                key={mess?.createdAt?.toString()}
                time={chatDateFormat(mess?.createdAt?.toString())}
                isCurrentUser={mess?.user_id?.email !== session?.email}
                message={mess?.message}
                user={mess?.user_id}
                document={mess?.document}
                documentName={mess?.documentName}
                documentSize={mess?.documentSize}
                localCarrier={mess?.local_carrier}
              />
            );
          })}
        {messages && !messages?.length && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h6>no messages yet.</h6>
          </div>
        )}
        {!messages && <LoadingCircle />}
        {/*<LoadingCircle />*/}
      </div>

      <div
        className={"attach-doc"}
        onClick={() => {
          document.getElementById("logo-file-input").click();
        }}
      >
        <AddFile /> <span>add document</span>
      </div>

      <input
        type={"file"}
        onChange={handleFileChange}
        style={{
          display: "none",
        }}
        id={"logo-file-input"}
      />

      <div className={"chat-input"}>
        <input
          type={"text"}
          id={"chat-message-input"}
          placeholder={"Message..."}
          onKeyDown={keyDownHandler}
        />

        <button onClick={sendMessageDebounced}>SEND</button>
      </div>
    </div>
  );
}
