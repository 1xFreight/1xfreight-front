"use client";

import Bid from "@/public/icons/24px/bid.svg";
import DeliveryTruck from "@/public/icons/24px/delivery-truck.svg";
import History from "@/public/icons/24px/history.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CarrierMenuComponent() {
  const pathname = usePathname();

  return (
    <div className={"carrier-menu"}>
      <Link
        className={`item ${pathname.includes("available-quotes") ? "active" : ""}`}
        href={"/available-quotes"}
      >
        <Bid />
        Available Quotes
      </Link>

      <Link
        className={`item ${pathname.includes("active-loads") ? "active" : ""}`}
        href={"/active-loads"}
      >
        <DeliveryTruck />
        Active Loads
      </Link>

      <Link
        className={`item ${pathname.includes("history") ? "active" : ""}`}
        href={"/history"}
      >
        <History />
        History
      </Link>
    </div>
  );
}
