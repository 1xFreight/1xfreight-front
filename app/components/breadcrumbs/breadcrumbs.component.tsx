import "./styles.css";
import ChevronRight from "@/public/icons/16px/chevron-right.svg";
import React, { useEffect, useMemo } from "react";
import Link from "next/link";

export interface BreadcrumbsI {
  items: BreadcrumbsItem[];
}

export interface BreadcrumbsItem {
  href?: string;
  title: string;
}

function BreadcrumbsComponent({ items }: BreadcrumbsI) {
  const breadcrumbs = useMemo(() => items?.filter((b) => b), [items]);

  return (
    <div className={"general-breadcrumbs"}>
      {breadcrumbs &&
        breadcrumbs.map(({ href, title }, index) => {
          return (
            <div className={"item fade-in"} key={title + index}>
              {index >= 1 ? <ChevronRight /> : ""}
              <Link href={href ?? ""}>
                <p
                  style={{
                    color: index === items.length - 1 ? "#1e1e1e" : "inherit",
                  }}
                >
                  {title}
                </p>
              </Link>
            </div>
          );
        })}
    </div>
  );
}

export default React.memo(BreadcrumbsComponent);
