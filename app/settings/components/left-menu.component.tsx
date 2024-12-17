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
import { UserRolesEnum } from "@/common/enums/user-roles.enum";
import useStore from "@/common/hooks/use-store.context";

export default function LeftMenuComponent() {
  const pathname = usePathname();
  const { session } = useStore();

  const logoutDebounced = useDebouncedCallback(
    () => postWithAuth("/auth/logout", {}).then(() => window.location.reload()),
    400,
  );

  const menuItems = [
    {
      title: "Contact Info & Branding",
      icon: <Slider className={""} />,
      href: "/settings",
      roles: [
        UserRolesEnum.SHIPPER,
        UserRolesEnum.SHIPPER_DEMO,
        UserRolesEnum.SHIPPER_MEMBER,
      ],
    },
    {
      title: "Users",
      icon: <User />,
      href: "/settings/users",
      roles: [UserRolesEnum.SHIPPER, UserRolesEnum.SHIPPER_DEMO],
    },
    {
      title: "Carriers",
      icon: <Truck className={"truck-svg"} />,
      href: "/settings/carriers",
      roles: [
        UserRolesEnum.SHIPPER,
        UserRolesEnum.SHIPPER_DEMO,
        UserRolesEnum.SHIPPER_MEMBER,
      ],
    },
    {
      title: "Spot Group Emails",
      icon: <Mail className={"email-svg"} />,
      href: "/settings/spot-group",
      roles: [
        UserRolesEnum.SHIPPER,
        UserRolesEnum.SHIPPER_DEMO,
        UserRolesEnum.SHIPPER_MEMBER,
      ],
    },
    {
      title: "Saved Locations",
      icon: <MapMarker />,
      href: "/settings/locations",
      roles: [
        UserRolesEnum.SHIPPER,
        UserRolesEnum.SHIPPER_DEMO,
        UserRolesEnum.SHIPPER_MEMBER,
      ],
    },
    {
      title: "Change Password",
      icon: <Lock />,
      href: "/settings/password",
      roles: [
        UserRolesEnum.SHIPPER,
        UserRolesEnum.SHIPPER_DEMO,
        UserRolesEnum.SHIPPER_MEMBER,
      ],
    },
    {
      title: "Billing",
      icon: <Card />,
      href: "/settings/billing",
      roles: [UserRolesEnum.SHIPPER, UserRolesEnum.SHIPPER_DEMO],
    },
  ];

  return (
    <div className={"settings-left-menu"}>
      <div>
        <h2>My Settings</h2>

        {menuItems.map(({ title, icon, href, roles }) => {
          if (!roles.includes(session.role)) return "";

          return (
            <Link
              href={href}
              className={`menu-item ${pathname === href ? "active" : ""}`}
              key={title}
              prefetch
            >
              {icon}
              {title}
            </Link>
          );
        })}
      </div>

      <button onClick={() => logoutDebounced()}>
        <SignOut />
        Logout
      </button>
    </div>
  );
}
