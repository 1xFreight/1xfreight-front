import Checkmark from "@/public/icons/24px/checked-tick.svg";
import { QuoteStatusEnum as QuoteStatusEnumFull } from "@/common/enums/quote-status.enum";
import { clearText } from "@/common/utils/data-convert.utils";
import "./shipment.styles.css";
import Truck from "@/public/icons/truck.svg";

const QuoteStatusEnum = Object.fromEntries(
  Object.entries(QuoteStatusEnumFull).slice(1, -1),
);

export default function ShipmentStatusComponent({
  status,
}: {
  status: QuoteStatusEnumFull;
}) {
  let statusIndex = 0;
  Object.values(QuoteStatusEnum).map((_status, index) => {
    if (status === _status) {
      statusIndex = index;
    }
  });

  return (
    <div className={"shipment-status"}>
      {Object.values(QuoteStatusEnum).map((_status, index) => {
        return (
          <div
            key={status + index}
            className={`status-item ${
              index < statusIndex
                ? "finished"
                : index > statusIndex
                  ? "unfinished"
                  : "current"
            }`}
          >
            {index < statusIndex ? (
              <div className={"checkmark-box"}>
                <Checkmark />
              </div>
            ) : (
              ""
            )}
            <div className={"current-icon"}>
              <Truck />
              <div className={"road-animation"}>
                <div></div>
                <div></div>
              </div>
            </div>
            <h4>{clearText(_status)}</h4>
          </div>
        );
      })}
    </div>
  );
}
