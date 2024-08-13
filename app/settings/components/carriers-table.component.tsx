import TagComponent from "@/app/get-quote/pages/partners/components/tag.component";

export interface PartnerI {
  company: string;
  contact: string;
  email: string;
  location: string;
  tags: string[];
}

export default function CarriersTableComponent({
  partners,
}: {
  partners: PartnerI[];
}) {
  return (
    <div className={"carriers-table"}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Company</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {partners &&
            partners.map(
              ({ company, contact, email, location, tags, phone }, index) => (
                <tr key={index + company + contact}>
                  <td>
                    <div>{index + 1}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{company}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{contact}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{email}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{location}</div>
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
