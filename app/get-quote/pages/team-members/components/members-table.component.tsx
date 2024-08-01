import "./styles.css";

export interface MemberI {
  contact: string;
  email: string;
}

export default function MembersTableComponent({
  members,
}: {
  members: MemberI[];
}) {
  return (
    <div className={"members-table"}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Contact</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {members &&
            members.map(({ contact, email }, index) => (
              <tr key={index + email + contact}>
                <td>
                  <div>
                    <input type={"checkbox"} name={email} />
                  </div>
                </td>
                <td>
                  <div className={"main-text"}>{contact}</div>
                </td>
                <td>
                  <div className={"main-text"}>{email}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
