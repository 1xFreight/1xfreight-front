import { ReactNode } from "react";
import LeftMenuComponent from "@/app/settings/components/left-menu.component";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={"settings-layout"}>
      <LeftMenuComponent />
      <div className={"content-wrapper"}>{children}</div>
    </div>
  );
}
