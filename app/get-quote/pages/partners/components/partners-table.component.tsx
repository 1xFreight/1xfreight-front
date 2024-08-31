import "./styles.css";
import TagComponent from "@/app/get-quote/pages/partners/components/tag.component";

export default function PartnersTableComponent({
  partners,
}: {
  partners: any[];
}) {
  return (
    <div className={"partners-table"}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {partners?.length &&
            partners?.map(
              ({ name, email, address, tags, phone, city }, index) => (
                <tr key={index + email}>
                  <td>
                    <div>
                      <input type={"checkbox"} name={email} />
                    </div>
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
