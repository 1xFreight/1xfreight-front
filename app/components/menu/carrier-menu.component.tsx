import Bid from "@/public/icons/24px/bid.svg";
import DeliveryTruck from "@/public/icons/24px/delivery-truck.svg";
import History from "@/public/icons/24px/history.svg";
import Link from "next/link";

export default function CarrierMenuComponent() {
  return (
    <div className={"carrier-menu"}>
      <Link className={"item"} href={"/available-quotes"}>
        <Bid />
        Available Quotes
      </Link>

      <Link className={"item"} href={"/"}>
        <DeliveryTruck />
        Active Loads
      </Link>

      <Link className={"item"} href={"/"}>
        <History />
        History
      </Link>
    </div>
  );
}
