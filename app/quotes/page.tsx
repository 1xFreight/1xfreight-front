import "./styles.css";
import QuotesTableComponent from "@/app/quotes/components/quotes-table/quotes-table.component";
import { mockData } from "@/app/quotes/components/quotes-table/mock-data";
import Refresh from "@/public/icons/24px/refresh-right.svg";

export default function QuotesPage() {
  return (
    <div className={"quotes-page page"}>
      <div className={"container page-header"}>
        <h4 className={"title"}>Quotes</h4>

        <div className={"refresh"}>
          <p>Last refreshed at: 10:25</p>

          <button className={"refresh-btn"}>
            <Refresh />
          </button>
        </div>
      </div>
      <div className={"quotes-table-wrapper"}>
        <QuotesTableComponent rows={mockData} />
      </div>
    </div>
  );
}
