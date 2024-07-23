import AddNote from "@/public/icons/24px/add-note.svg";
import Document from "@/public/icons/24px/document.svg";
import LineChart from "@/public/icons/24px/line-chart.svg";
import Settings from "@/public/icons/24px/settings.svg";
import Link from "next/link";

export default function AdminMenuComponent() {
  return (
    <div className={"admin-menu"}>
      <Link className={"new-demo"} href={"/"}>
        <AddNote />
        New Demo
      </Link>

      <Link className={"item"} href={"/"}>
        <Document />
        Users
      </Link>

      <Link className={"item"} href={"/"}>
        <LineChart />
        Analytics
      </Link>

      <Link className={"item"} href={"/"}>
        <Settings />
        Settings
      </Link>
    </div>
  );
}
