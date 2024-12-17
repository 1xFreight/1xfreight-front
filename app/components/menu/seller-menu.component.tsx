"use client";

import AddNote from "@/public/icons/24px/add-note.svg";
import Document from "@/public/icons/24px/document.svg";
import LineChart from "@/public/icons/24px/line-chart.svg";
import Settings from "@/public/icons/24px/settings.svg";
import Flag from "@/public/icons/24px/flag.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { memo } from "react";

function SellerMenuComponent() {
  const pathname = usePathname();
  const router = useRouter();

  const sellerMenuItems = [
    {
      classNames: "get-quote menu-item-addnote",
      title: "Get Quote",
      href: "/get-quote",
      icon: <AddNote />,
    },
    {
      classNames: `item ${pathname.includes("quotes") ? "active" : ""}`,
      title: "Quotes",
      href: "/quotes",
      icon: <Document />,
      prefetchEndpoint:
        "/quote?skip=0&limit=20&searchText=&pickupDate=&dropDate=&owner=&status=&type=&sort={}",
    },
    {
      classNames: `item ${pathname.includes("shipments") ? "active" : ""}`,
      title: "Shipments",
      href: "/shipments",
      icon: <Flag />,
      prefetchEndpoint:
        "/quote/shipments?skip=0&limit=20&searchText=&pickupDate=&dropDate=&owner=&status=[]&type=&sort={}",
    },
    {
      classNames: `item ${pathname.includes("analytics") ? "active" : ""}`,
      title: "Analytics",
      href: "/analytics",
      icon: <LineChart />,
    },
    {
      classNames: `item ${pathname.includes("settings") ? "active" : ""} menu-item-settings`,
      title: "Settings",
      href: "/settings",
      icon: <Settings />,
    },
  ];

  const prefetchURL = useDebouncedCallback(
    (viewLink: string, prefetchEndpoint: string | null) => {
      router.prefetch(viewLink);
      if (prefetchEndpoint) {
        getWithAuth(`${prefetchEndpoint}`).then((data) => {});
      }
    },
    50,
  );

  return (
    <div className={"seller-menu"}>
      {sellerMenuItems.map(
        ({ classNames, title, href, icon, prefetchEndpoint }) => (
          <Link
            className={classNames}
            href={href}
            key={href}
            onMouseEnter={() => {
              prefetchURL(href, prefetchEndpoint);
            }}
          >
            <div>{icon}</div>
            <div>{title}</div>
          </Link>
        ),
      )}
    </div>
  );
}

export default memo(SellerMenuComponent);
