import TagComponent from "@/app/get-quote/pages/partners/components/tag.component";
import { memo } from "react";

function CarriersTableComponent({ partners }: { partners: any[] }) {
  return (
    <div className={"carriers-table"}>
      <table>
        <thead>
          <tr className={"fade-in"}>
            <th></th>
            <th>name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody className={"fade-in"}>
          {partners &&
            partners.map(
              ({ name, email, address, tags, phone, city }, index) => (
                <tr key={index + email}>
                  <td>
                    <div>{index + 1}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{name}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{email}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>
                      {address}
                      {" , "}
                      {city}
                    </div>
                  </td>
                  <td>
                    <div className={"main-text"}>{phone}</div>
                  </td>

                  <td>
                    <div className={"table-tags"}>
                      {tags &&
                        tags.map((tag, index) => (
                          <TagComponent title={tag} key={tag + index} />
                        ))}
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

export default memo(CarriersTableComponent);
