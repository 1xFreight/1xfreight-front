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

function SpotTableComponent({ members }: { members: MemberI[] }) {
  const { showToast } = useStore();

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
    <div className={"spot-table-settings"}>
      <table>
        <thead>
          <tr className={"fade-in"}>
            <th></th>
            <th>Name (tag)</th>
            <th>Carrier Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className={"fade-in"}>
          {members &&
            members.map(({ name, status, carriers }, index) => (
              <tr key={index + name}>
                <td>
                  <div>{index + 1}</div>
                </td>
                <td>
                  <div className={"main-text"}>{name}</div>
                </td>
                <td>
                  <div className={"main-text"}>{carriers.length}</div>
                </td>
                <td>
                  <div className={`main-text ${status}`}>
                    <select
                      defaultValue={status}
                      onChange={(e) => {
                        if (e.target.value !== status) {
                          debounceUpdateStatus(e.target.value, index);
                          e.target.blur();
                        }
                      }}
                    >
                      <option value={"active"}>active</option>
                      <option value={"inactive"}>inactive</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(SpotTableComponent);
