import Image from "next/image";
import BreadcrumbsComponent from "@/app/components/breadcrumbs/breadcrumbs.component";

export default function Home() {
  return (
    <div>
      <BreadcrumbsComponent
        items={[
          { title: "Request Quote", href: "" },
          { title: "FTL", href: "" },
          { title: "Request Quote", href: "" },
          { title: "FTL", href: "" },
        ]}
      />
      <div className={"container1"}></div>
    </div>
  );
}
