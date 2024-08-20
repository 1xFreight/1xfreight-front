import { memo } from "react";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";

export interface MemberI {
  contact: string;
  email: string;
  phone: string;
  status: string;
}

function MembersTableComponent({ members }: { members: MemberI[] }) {
  return (
    <div className={"members-table-settings"}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {members &&
            members.map(({ name, email, phone, status }, index) => (
              <tr key={index + email + name}>
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
                  <div className={"main-text"}>{phone}</div>
                </td>
                <td>
                  <div className={`main-text ${status}`}>{status}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <RightModalComponent></RightModalComponent>
    </div>
  );
}

export default memo(MembersTableComponent);
