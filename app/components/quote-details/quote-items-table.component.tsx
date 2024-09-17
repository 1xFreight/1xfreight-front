import React, { Fragment } from "react";
import Hazard from "@/public/icons/30px/hazardous-material.svg";

export default function QuoteItemsTableComponent({
  items,
}: {
  items: Array<any>;
}) {
  return (
    <div className={"items-wrapper-quote-preview"}>
      <div className={"item-style"}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Quantity</th>
              <th>Weight</th>
              <th>Dimensions</th>
              <th>Handling unit</th>
              <th>NMFC</th>
              <th>Freight Class</th>
              <th>Sub Class</th>
              <th>Commodity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <Fragment key={index}>
                <tr className={`${item.hazardous_material && "hazard-item"}`}>
                  <td>{index + 1}</td>
                  <td>
                    <div className={"main-text"}>{item.quantity}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{item.weight}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>
                      {" "}
                      {item.width} x {item.length} x {item.height}{" "}
                    </div>
                  </td>
                  <td>
                    <div className={"main-text"}>
                      {item.handling_unit}
                      {item.mixed_pallet && ", Mixed pallet"}
                    </div>
                  </td>

                  <td>
                    <div className={"main-text"}>{item.nmfc}</div>
                  </td>

                  <td>
                    <div className={"main-text"}>{item.freight_class}</div>
                  </td>

                  <td>
                    <div className={"main-text"}>{item?.sub_class}</div>
                  </td>

                  <td>
                    <div className={"main-text"}>{item.commodity}</div>
                  </td>
                </tr>
                {item.hazardous_material && (
                  <tr className={"hazardous-material-item"}>
                    <td colSpan={3}>
                      <div className={"info"}>
                        {/*<Hazard />*/}
                        <h6>This item contain hazardous material</h6>
                      </div>
                    </td>
                    <td>
                      <h6>UN: {item.un_number}</h6>
                    </td>
                    <td colSpan={5}>
                      <h6>
                        Emergency Contact: {item.emergency_contact},
                        {item.emergency_phone} {item.emergency_phone2}
                      </h6>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}

            <tr className={"items-total"}>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
