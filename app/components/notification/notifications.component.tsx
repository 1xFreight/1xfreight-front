"use client";

import "./styles.css";
import Bell from "@/public/icons/40px/bell.svg";
import { useEffect, useState } from "react";
import useStore from "@/common/hooks/use-store.context";
import { useNotifications } from "@/common/hooks/use-notifications.hook";
import { useDebouncedCallback } from "use-debounce";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import RefreshDouble from "@/public/icons/24px/refresh-double.svg";
import { formatDateTime } from "@/common/utils/date.utils";
import Cross from "@/public/icons/24px/cross.svg";
import Link from "next/link";

export default function NotificationsComponent() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>(null);
  const { connect, disconnect, getUserNotifications, notificationService } =
    useNotifications();
  const { session, showToast } = useStore();

  const close = () => {
    const notificationCenterDiv = document.getElementById(
      "notification-center",
    );

    if (!notificationCenterDiv) return;
    notificationCenterDiv.style.animation =
      "anim2 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) reverse both";
    setTimeout(() => setOpen(false), 200);
  };

  const handleNewMessage = useDebouncedCallback(
    (message) => {
      setNotifications((prev) => [message, ...prev]);
      showToast({
        type: ToastTypesEnum.INFO,
        text: "You got a notification",
      });
    },
    1000,
    { leading: true },
  );

  const initializeNotifications = useDebouncedCallback(() => {
    connect()
      .then(() => getUserNotifications().then((re) => setNotifications(re)))
      .then(() =>
        notificationService.socket.on("new-notification", handleNewMessage),
      );
  }, 350);

  useEffect(() => {
    document.addEventListener("scroll", close);
    initializeNotifications();

    return () => {
      document.removeEventListener("scroll", close);
    };
  }, []);

  const clearAllNotifications = useDebouncedCallback(() => {
    notificationService.socket.emit("clear-all");
    setNotifications([]);
  }, 300);

  const deleteOneNotification = useDebouncedCallback((id) => {
    notificationService.socket.emit("clear-one", { _id: id });
    setNotifications((prevState) =>
      prevState.filter((notif) => notif._id != id),
    );
  });

  return (
    <div className={"notifications"}>
      <div
        className={"notifications-backdrop"}
        style={{
          display: open ? "block" : "none",
        }}
        onClick={() => close()}
      ></div>
      <div
        onClick={() => (open ? close() : setOpen(true))}
        className={"notif-menu-btn"}
      >
        <Bell />

        {notifications?.length >= 1 ? (
          <div className={"number"}>{notifications?.length}</div>
        ) : !notifications ? (
          <div className={"number"}>
            <div className={"notif-number-update-wrapper"}>
              <div className="notif-number-update">
                <RefreshDouble width={24} height={24} />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {open && (
        <div
          className={"notification-center slide-in-tr"}
          id={"notification-center"}
        >
          <div className={"notif-header"}>
            <div className={"notif-title"}>
              <Bell />

              <h3>Notifications</h3>
            </div>

            <button onClick={clearAllNotifications}>clear all</button>
          </div>
          <div className={"notif-wrapper anim2 "}>
            {notifications &&
              notifications.map((notif, index) => (
                <div className={"notif-item"} key={notif.text + index}>
                  <div className={"notif-content"}>
                    <h4>{notif.text}</h4>
                    <div onClick={() => deleteOneNotification(notif._id)}>
                      <Cross />
                    </div>
                  </div>

                  <div className={"notif-meta"}>
                    <h5>{formatDateTime(notif.createdAt)}</h5>
                    {notif.button_name && (
                      <Link
                        href={notif.button_link}
                        onClick={() => setOpen(false)}
                      >
                        <button>{notif.button_name}</button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            {notifications && notifications.length == 0 && (
              <div className={"notif-item"}>
                <h4>No new notifications</h4>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
