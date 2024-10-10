"use client";

import "./styles.css";
import Bell from "@/public/icons/40px/bell.svg";
import { useEffect, useState } from "react";
import useStore from "@/common/hooks/use-store.context";
import { useNotifications } from "@/common/hooks/use-notifications.hook";
import { useDebouncedCallback } from "use-debounce";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import RefreshDouble from "@/public/icons/24px/refresh-double.svg";
import { formatDate, formatDateTime } from "@/common/utils/date.utils";
import Cross from "@/public/icons/24px/cross.svg";

export default function NotificationsComponent() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>(null);
  const { connect, disconnect, getUserNotifications, notificationService } =
    useNotifications();
  const { session, showToast } = useStore();

  const handleNewMessage = (message) => {
    setNotifications((prev) => [...prev, message]);
    showToast({
      type: ToastTypesEnum.INFO,
      text: "You got a notification",
    });
  };

  const initializeNotifications = useDebouncedCallback(() => {
    connect()
      .then(() => getUserNotifications().then((re) => setNotifications(re)))
      .then(() =>
        notificationService.socket.on("new-notification", handleNewMessage),
      );
  }, 350);

  useEffect(() => {
    initializeNotifications();
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
        onClick={() => setOpen(false)}
      ></div>
      <div
        onClick={() => setOpen((open) => !open)}
        className={"notif-menu-btn"}
      >
        <Bell />

        {notifications?.length >= 1 ? (
          <div className={"number"}>{notifications?.length}</div>
        ) : !notifications ? (
          <div className={"number"}>
            <div className="notif-number-update">
              <RefreshDouble />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>

      {open && (
        <div className={"notification-center slide-in-tr"}>
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
                    {notif.button_name && <button>{notif.button_name}</button>}
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
