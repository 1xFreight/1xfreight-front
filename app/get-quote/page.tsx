import BreadcrumbsComponent from "@/app/components/breadcrumbs/breadcrumbs.component";
import "./styles.css";
import Air from "@/public/png/air-transportation.png";
import Ocean from "@/public/png/ocean-transportation.png";
import LTL from "@/public/png/half-truck.png";
import FTL from "@/public/png/full-truck.png";
import Image from "next/image";

export default function GetQuotePage() {
  return (
    <div className={"page get-quote-page"}>
      <div className={"get-quote-breadcrumb"}>
        <BreadcrumbsComponent items={[{ title: "Request Quote" }]} />
      </div>

      <div className={"container select-trans-mode"}>
        <h4>Mode of transportation</h4>
        <h2>Select the appropriate mode of transportation</h2>

        <div className={"mode-of-transportations"}>
          <div className={"item-mode"}>
            <Image src={FTL} alt={"FTL image"} width={166} />
            <h2>FTL</h2>
          </div>

          <div className={"item-mode"}>
            <Image src={LTL} alt={"LTL image"} width={166} />
            <h2>LTL</h2>
          </div>

          <div className={"item-mode"}>
            <Image src={Ocean} alt={"FCL image"} width={160} />
            <h2>Ocean - FCL</h2>
          </div>

          <div className={"item-mode"}>
            <Image src={Air} alt={"Air image"} width={197} />
            <h2>Air</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
