import "./styles.css";
import FiltersPanelComponent from "@/app/shipments/components/filters-panel.component";
import Excel from "@/public/icons/20px/excel 1.svg";
import ShipmentsTableComponent from "@/app/shipments/components/shipments-table.component";

export default function ShipmentsPage() {
  return (
    <div className={"shipments-page page"}>
      <div className={"container page-header"}>
        <h4 className={"title"}>Shipments</h4>

        <div>
          <h6>256 Shipments</h6>

          <button>
            <Excel /> Export to Excel
          </button>
        </div>
      </div>

      <div className={"container"}>
        <FiltersPanelComponent />
      </div>

      <div className={"shipments-table container"}>
        <ShipmentsTableComponent />
      </div>
    </div>
  );
}
