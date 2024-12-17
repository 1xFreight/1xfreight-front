import TagComponent from "@/app/get-quote/pages/partners/components/tag.component";
import { memo } from "react";
import { clearText } from "@/common/utils/data-convert.utils";
import useStore from "@/common/hooks/use-store.context";

function SavedLocationsTable({ address }: { address: any[] }) {
  const { addToStore } = useStore();

  return (
    <div className={"locations-settings-table"}>
      <table>
        <thead>
          <tr className={"fade-in"}>
            <th></th>
            <th>Company name</th>
            <th>Address</th>
            <th>Hours</th>
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
                  address: addr,
                  partial_address,
                  shipping_hours,
                  time_start,
                  time_end,
                  location_type,
                  accessorials,
                  company_name,
                  notes,
                },
                index,
              ) => (
                <tr
                  key={index + addr}
                  className={"tr-edit-table-hover-effect"}
                  onClick={() =>
                    addToStore({
                      name: "edit-saved-location-data",
                      data: address[index],
                    })
                  }
                >
                  <td>
                    <div>{index + 1}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{company_name}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{partial_address}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>
                      {time_start}
                      {time_start && time_end ? " - " : ""}
                      {time_end}
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
