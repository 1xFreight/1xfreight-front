"use client";

import "./styles.css";
import Bell from "@/public/icons/40px/bell.svg";
import { memo, useContext, useEffect, useState } from "react";
import RefreshDouble from "@/public/icons/24px/refresh-double.svg";
import { formatDateTime } from "@/common/utils/date.utils";
import Cross from "@/public/icons/24px/cross.svg";
import Link from "next/link";
import { NotificationContext } from "@/common/contexts/notifications.context";
import useStore from "@/common/hooks/use-store.context";
import { UserRolesEnum } from "@/common/enums/user-roles.enum";

function NotificationsComponent() {
  const [open, setOpen] = useState(false);
  const { session } = useStore();
  const {
    clearAllNotifications,
    deleteOneNotification,
    notifications,
    setNotifications,
  } = useContext(NotificationContext);

  const close = () => {
    const notificationCenterDiv = document.getElementById(
      "notification-center",
    );

    if (!notificationCenterDiv) return;
    setNotifications((prevState) =>
      prevState?.map((notification) => {
        return { ...notification, isNewNotification: false };
      }),
    );
    notificationCenterDiv.style.animation =
      "anim2 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) reverse both";
    setTimeout(() => setOpen(false), 200);
  };

  useEffect(() => {
    document.addEventListener("scroll", close);

    return () => {
      document.removeEventListener("scroll", close);
    };
  }, []);

  const identifyNotificationSubType = (text: string) => {
    if (session?.role != UserRolesEnum.CARRIER) {
      if (text.includes("New Chat Message")) {
        return "Chat";
      }

      if (text.includes("updated quote status")) {
        return "Shipments";
      }

      return "Quotes";
    } else {
      if (text.includes("New Chat Message")) {
        return "Chat";
      }

      if (
        text.includes("Shipment was canceled") ||
        text.includes("accepted your quote")
      ) {
        return "Active Loads";
      }

      return "Available Quotes";
    }
  };

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
                    <div className={"notif-item-title"}>
                      <h5>{identifyNotificationSubType(notif.text)} </h5>
                      {notif?.isNewNotification && (
                        <div className={"new-notification-circle"}></div>
                      )}
                      <span>{formatDateTime(notif.createdAt)}</span>
                    </div>
                    <div onClick={() => deleteOneNotification(notif._id)}>
                      <Cross />
                    </div>
                  </div>

                  <div className={"notif-content main-content"}>
                    <h4>{notif.text}</h4>
                  </div>

                  <div className={"notif-meta"}>
                    {notif.button_name && (
                      <Link
                        href={notif.button_link}
                        onClick={() => setOpen(false)}
                      >
                        <div>{notif.button_name}</div>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            {notifications && notifications.length == 0 && (
              <div className={"notifications-empty"}>
                {/*<Image src={EmptyMail} alt={"empty"} width={125} />*/}
                <h3>No new notifications</h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(NotificationsComponent);
