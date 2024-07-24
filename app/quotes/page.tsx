import "./styles.css";
import QuotesTableComponent from "@/app/quotes/components/quotes-table/quotes-table.component";
import { mockData } from "@/app/quotes/components/quotes-table/mock-data";
import FiltersPanelComponent from "@/app/quotes/components/filters-panel/filters-panel.component";

export default function QuotesPage() {
  return (
    <div className={"quotes-page page"}>
      <div className={"container page-header"}>
        <h4 className={"title"}>Quotes</h4>
      </div>

      <div className={"container"}>
        <FiltersPanelComponent />
      </div>

      <div className={"container"}>
        <QuotesTableComponent rows={mockData} />
      </div>
    </div>
  );
}
