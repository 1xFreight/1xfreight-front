"use client";

import Logo from "@/public/logo/1xfreight-logo.svg";
import "./styles.css";
import Link from "next/link";
import CarrierMenuComponent from "@/app/components/menu/carrier-menu.component";
import SellerMenuComponent from "@/app/components/menu/seller-menu.component";
import AvatarComponent from "@/app/components/avatar/avatar.component";
import useStore from "@/common/hooks/use-store.context";
import { memo, useEffect } from "react";
import Logout from "@/public/icons/35px/sign-out.svg";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import NotificationsComponent from "@/app/components/notification/notifications.component";

export function UserMenuComponent({ session }) {
  const avatarName =
    session?.role !== "carrier" && session?.name
      ? session?.name
      : session?.email;

  const logoutDebounced = useDebouncedCallback(
    () => postWithAuth("/auth/logout", {}).then(() => window.location.reload()),
    400,
  );

  return (
    <div className={"user-menu"}>
      <NotificationsComponent />

      <div className={"user"}>
        <AvatarComponent username={avatarName} logo={session?.logo} />

        <div
          className={"user-name"}
          style={{
            width: (avatarName?.length ?? 5) * 0.76 + "rem",
          }}
        >
          <div>
            {session?.role === "carrier" ? session.email : session?.name}
          </div>
          <div>{session?.role}</div>
        </div>
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
  );
}

function MainMenu() {
  const { session } = useStore();

  const handleScroll = () => {
    const mainMenu = document.getElementById("main-menu");

    const scrollPosition = window.scrollY;
    const lowerScrollLimit = 56;
    const scrollAnimationStart = 75;
    const upperScrollLimit = 94;

    if (
      scrollPosition > scrollAnimationStart &&
      scrollPosition < upperScrollLimit &&
      mainMenu
    ) {
      const scrollReverse = 75 - scrollPosition + scrollAnimationStart;

      mainMenu.style.height = scrollReverse + "px";
    }

    if (scrollPosition > upperScrollLimit) {
      mainMenu.style.height = "3.5rem";
      mainMenu.classList.add("scrolled");
    }

    if (scrollPosition < lowerScrollLimit) {
      mainMenu.style.height = "4.6875rem";
      mainMenu.classList.remove("scrolled");
    }
  };

  const debouncedHandleScroll = useDebouncedCallback(() => handleScroll(), 1);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return (
    <header className={"main-menu"} id={"main-menu"}>
      <div className={"container"}>
        <div className={"navigation"}>
          <div className={"logo-wrapper"}>
            <Link href={"/"} className={"logo full-logo"}>
              <Logo />
            </Link>
          </div>

          {session?.role === "carrier" && <CarrierMenuComponent />}
          {session?.role?.includes("shipper") && <SellerMenuComponent />}
        </div>
        <UserMenuComponent session={session} />
      </div>
    </header>
  );
}

export default memo(MainMenu);
