import Logo from "@/public/logo/1xfreight-logo.svg";
import Bell from "@/public/icons/40px/bell.svg";
import Dots from "@/public/icons/24px/3-dots.svg";
import "./styles.css";
import Link from "next/link";
import AdminMenuComponent from "@/app/components/menu/admin-menu.component";
import CarrierMenuComponent from "@/app/components/menu/carrier-menu.component";
import SellerMenuComponent from "@/app/components/menu/seller-menu.component";
import AvatarComponent from "@/app/components/avatar/avatar.component";

export default function MainMenu() {
  return (
    <header className={"main-menu"}>
      <div className={"navigation"}>
        <Link href={"/"} className={"logo"}>
          <Logo />
        </Link>

        {/*<AdminMenuComponent />*/}
        {/*<CarrierMenuComponent />*/}
        <SellerMenuComponent />
      </div>

      <div className={"user-menu"}>
        <div className={"notifications"}>
          <Bell />
          <div className={"number"}>99</div>
        </div>

        <div className={"user"}>
          <AvatarComponent username={"Mark J"} />

          <div className={"user-name"}>
            <div>Mark Jhonston</div>
            <div>admin</div>
          </div>

          <div className={"open-extra-menu"}>
            <Dots />
          </div>
        </div>
      </div>
    </header>
  );
}
