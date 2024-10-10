"use client";

import Logo from "@/public/logo/1xfreight-logo.svg";
import Bell from "@/public/icons/40px/bell.svg";
import Dots from "@/public/icons/24px/3-dots.svg";
import "./styles.css";
import Link from "next/link";
import AdminMenuComponent from "@/app/components/menu/admin-menu.component";
import CarrierMenuComponent from "@/app/components/menu/carrier-menu.component";
import SellerMenuComponent from "@/app/components/menu/seller-menu.component";
import AvatarComponent from "@/app/components/avatar/avatar.component";
import useStore from "@/common/hooks/use-store.context";
import { memo, useEffect, useState } from "react";
import ToasterComponent from "@/common/components/toaster/toaster.component";
import Logout from "@/public/icons/35px/sign-out.svg";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import NotificationsComponent from "@/app/components/notification/notifications.component";

function MainMenu() {
  const { session } = useStore();
  const [openNotifications, setOpenNotifications] = useState(false);
  const avatarName =
    session?.role !== "carrier" && session?.name
      ? session?.name
      : session?.email;

  const logoutDebounced = useDebouncedCallback(
    () => postWithAuth("/auth/logout", {}).then(() => window.location.reload()),
    400,
  );

  return (
    <header className={"main-menu"}>
      <div className={"container"}>
        <div className={"navigation"}>
          <Link href={"/"} className={"logo"}>
            <Logo />
          </Link>

          {/*<AdminMenuComponent />*/}
          {session?.role === "carrier" && <CarrierMenuComponent />}
          {session?.role?.includes("shipper") && <SellerMenuComponent />}
        </div>

        <div className={"user-menu"}>
          <NotificationsComponent />

          <div className={"user"}>
            <AvatarComponent username={avatarName} logo={session?.logo} />

            <div className={"user-name"}>
              <div>
                {session?.role === "carrier" ? session.email : session?.name}
              </div>
              <div>{session?.role}</div>
            </div>

            <div className={"open-extra-menu"}></div>
          </div>

          {session?.role === "carrier" && (
            <div className={"tooltip sign-out"} onClick={logoutDebounced}>
              <Logout />
              <span
                className={"tooltiptext"}
                style={{
                  bottom: "unset",
                  top: "100%",
                  padding: "0.25rem 0.25rem",
                  width: "fit-content",
                }}
              >
                sign out
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(MainMenu);
