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
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {members?.length &&
            members?.map(({ name, email, status }, index) => (
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
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
