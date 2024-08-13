import Checkmark from "@/public/icons/24px/checked-tick.svg";

export enum ShipmentStatusEnum {
  BOOKED = "Booked",
  DISPATCHED = "Dispatched",
  PICKUP = "At Pickup",
  TRANSIT = "In Transit",
  DESTINATION = "At Destination",
  DELIVERED = "Delivered",
}

export default function ShipmentStatusComponent({
  status,
}: {
  status: ShipmentStatusEnum;
}) {
  let statusIndex = 0;
  Object.values(ShipmentStatusEnum).map((_status, index) => {
    if (status === _status) {
      statusIndex = index;
    }
  });

  return (
    <div className={"shipment-status"}>
      {Object.values(ShipmentStatusEnum).map((_status, index) => (
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
          <h4>{_status}</h4>
        </div>
      ))}
    </div>
  );
}
