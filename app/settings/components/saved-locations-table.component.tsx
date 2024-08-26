import TagComponent from "@/app/get-quote/pages/partners/components/tag.component";
import { memo } from "react";
import { clearText } from "@/common/utils/data-convert.utils";

function SavedLocationsTable({ address }: { address: any[] }) {
  return (
    <div className={"locations-settings-table"}>
      <table>
        <thead>
          <tr className={"fade-in"}>
            <th></th>
            <th>Address</th>
            <th>Hours</th>
            <th>Shipping hours</th>
            <th>Accessorials</th>
            <th>Type</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody className={"fade-in"}>
          {address &&
            address.map(
              (
                {
                  address,
                  shipping_hours,
                  time_start,
                  time_end,
                  location_type,
                  accessorials,
                  notes,
                },
                index,
              ) => (
                <tr key={index + address}>
                  <td>
                    <div>{index + 1}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{address}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>
                      {time_start}
                      {time_start && time_end ? " - " : ""}
                      {time_end}
                    </div>
                  </td>
                  <td>
                    <div
                      className={"main-text"}
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {clearText(shipping_hours)}
                    </div>
                  </td>
                  <td>
                    <div className={"main-text"}>{accessorials?.join(",")}</div>
                  </td>

                  <td>
                    <div className={"main-text"}>{location_type}</div>
                  </td>

                  <td>
                    <div className={"tooltip"}>
                      <div className={"main-text"}>
                        {notes?.substring(0, 100)}
                        {notes?.length > 100 ? "..." : ""}
                      </div>

                      {notes?.length > 100 ? (
                        <span
                          className={"tooltiptext"}
                          style={{
                            bottom: "unset",
                            top: "100%",
                            width: "20rem",
                            left: "0",
                            fontSize: "0.75rem",
                            padding: "0.5rem",
                          }}
                        >
                          {notes}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
              ),
            )}
        </tbody>
      </table>
    </div>
  );
}

export default memo(SavedLocationsTable);
