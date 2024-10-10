"use client";

import AddNote from "@/public/icons/24px/add-note.svg";
import Document from "@/public/icons/24px/document.svg";
import LineChart from "@/public/icons/24px/line-chart.svg";
import Settings from "@/public/icons/24px/settings.svg";
import Flag from "@/public/icons/24px/flag.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerMenuComponent() {
  const pathname = usePathname();

  return (
    <div className={"seller-menu"}>
      <Link className={`get-quote menu-item-addnote`} href={"/get-quote"}>
        <AddNote />
        Get Quote
      </Link>
      <Link
        className={`item ${pathname.includes("quotes") ? "active" : ""} menu-item-document`}
        href={"/quotes"}
      >
        <Document />
        Quotes
      </Link>

      <Link
        className={`item ${pathname.includes("shipments") ? "active" : ""} menu-item-flag`}
        href={"/shipments"}
      >
        <Flag />
        Shipments
      </Link>

      <Link
        className={`item ${pathname.includes("analytics") ? "active" : ""} menu-item-analytics`}
        href={"/analytics"}
      >
        <LineChart />
        Analytics
      </Link>

      <Link
        className={`item ${pathname.includes("settings") ? "active" : ""} menu-item-settings`}
        href={"/settings"}
      >
        <Settings />
        Settings
      </Link>
    </div>
  );
}
