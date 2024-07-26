import "./styles.css";
import ChevronRight from "@/public/icons/16px/chevron-right.svg";
import React from "react";

export interface BreadcrumbsI {
  items: BreadcrumbsItem[];
}

export interface BreadcrumbsItem {
  href?: string;
  title: string;
}

function BreadcrumbsComponent({ items }: BreadcrumbsI) {
  return (
    <div className={"general-breadcrumbs"}>
      {items &&
        items.map(({ href, title }, index) => (
          <div className={"item fade-in-left"} key={title}>
            {index >= 1 ? <ChevronRight /> : ""}
            <p
              style={{
                color: index === items.length - 1 ? "#545454" : "inherit",
              }}
            >
              {title}
            </p>
          </div>
        ))}
    </div>
  );
}

export default React.memo(BreadcrumbsComponent);
