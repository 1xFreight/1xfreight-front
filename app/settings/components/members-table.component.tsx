import { memo } from "react";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";

export interface MemberI {
  contact: string;
  email: string;
  phone: string;
  status: string;
}

function MembersTableComponent({ members }: { members: MemberI[] }) {
  const { showToast, addToStore } = useStore();

  const debounceUpdateStatus = useDebouncedCallback(
    async (value: string, index: number) => {
      const { name, _id } = members[index];

      postWithAuth("/users/update-member", { status: value, _id }).then(
        async (response) => {
          if (!response.ok) {
            const errorData = await response.json();
            return showToast({
              type: ToastTypesEnum.ERROR,
              text: errorData.message || "Something went wrong",
              duration: 5000,
            });
          }

          showToast({
            type: ToastTypesEnum.SUCCESS,
            text: `${name} status was changed to ${value}`,
            duration: 5000,
          });

          members[index].status = value;
        },
      );
    },
    500,
  );

  return (
    <div className={"members-table-settings"}>
      <table>
        <thead>
          <tr className={"fade-in"}>
            <th></th>
            <th>Name</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className={"fade-in"}>
          {members &&
            members.map(
              ({ name, email, phone, status, position, _id }, index) => (
                <tr
                  key={index + email + name}
                  onClick={() =>
                    addToStore({
                      name: "edit-member-data",
                      data: { name, email, phone, status, position, _id },
                    })
                  }
                  className={"tr-edit-table-hover-effect"}
                >
                  <td>
                    <div>{index + 1}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{name}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{position}</div>
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
              ),
            )}
        </tbody>
      </table>
    </div>
  );
}

export default memo(MembersTableComponent);
