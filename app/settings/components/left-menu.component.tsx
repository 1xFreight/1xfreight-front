"use client";

import Link from "next/link";
import MapMarker from "@/public/icons/35px/map-marker.svg";
import Mail from "@/public/icons/35px/mail.svg";
import SignOut from "@/public/icons/35px/sign-out.svg";
import Slider from "@/public/icons/35px/slider-circle-h.svg";
import Card from "@/public/icons/35px/credit-card.svg";
import Lock from "@/public/icons/35px/lock-alt.svg";
import User from "@/public/icons/35px/user-plus.svg";
import Truck from "@/public/icons/30px/eq-truck.svg";
import { usePathname } from "next/navigation";
import "../styles.css";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import { useDebouncedCallback } from "use-debounce";

export default function LeftMenuComponent() {
  const pathname = usePathname();

  const logoutDebounced = useDebouncedCallback(
    () => postWithAuth("/auth/logout", {}).then(() => window.location.reload()),
    400,
  );

  const menuItems = [
    {
      title: "Contact Info & Branding",
      icon: <Slider />,
      href: "/settings",
    },
    {
      title: "Users",
      icon: <User />,
      href: "/settings/users",
    },
    {
      title: "Carriers",
      icon: <Truck />,
      href: "/settings/carriers",
    },
    {
      title: "Sport Group Emails",
      icon: <Mail />,
      href: "/settings/group-emails",
    },
    {
      title: "Saved Locations",
      icon: <MapMarker />,
      href: "/settings/locations",
    },
    {
      title: "Change Password",
      icon: <Lock />,
      href: "/settings/password",
    },
    {
      title: "Billing",
      icon: <Card />,
      href: "/settings/billing",
    },
  ];

  return (
    <div className={"settings-left-menu"}>
      <div>
        <h2>My Settings</h2>

        {menuItems.map(({ title, icon, href }) => (
          <Link
            href={href}
            className={`menu-item ${pathname === href ? "active" : ""}`}
            key={title}
          >
            {icon}
            {title}
          </Link>
        ))}
      </div>

      <button onClick={() => logoutDebounced()}>
        <SignOut />
        Logout
      </button>
    </div>
  );
}
