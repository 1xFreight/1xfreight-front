import "./styles.css";
import ChevronRight from "@/public/icons/16px/chevron-right.svg";

interface BreadcrumbsI {
  background: string | null;
  items: BreadcrumbsItem[];
}

interface BreadcrumbsItem {
  href: string;
  title: string;
}

export default function BreadcrumbsComponent({
  items,
  background,
}: BreadcrumbsI) {
  return (
    <div className={"breadcrumbs-get-quote"}>
      {items &&
        items.map(({ href, title }, index) => (
          <div className={"item"} key={title}>
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
