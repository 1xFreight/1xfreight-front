export interface MemberI {
  contact: string;
  email: string;
  phone: string;
  status: string;
}

export default function MembersTableComponent({
  members,
}: {
  members: MemberI[];
}) {
  return (
    <div className={"members-table-settings"}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Contact</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {members &&
            members.map(({ contact, email, phone, status }, index) => (
              <tr key={index + email + contact}>
                <td>
                  <div>{index + 1}</div>
                </td>
                <td>
                  <div className={"main-text"}>{contact}</div>
                </td>
                <td>
                  <div className={"main-text"}>{email}</div>
                </td>
                <td>
                  <div className={"main-text"}>{phone}</div>
                </td>
                <td>
                  <div className={`main-text ${status}`}>{status}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
