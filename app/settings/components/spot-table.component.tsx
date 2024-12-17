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
  const { addToStore } = useStore();

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
              <tr
                key={index + name}
                className={"tr-edit-table-hover-effect"}
                onClick={() =>
                  addToStore({
                    name: "edit-spot-group-data",
                    data: members[index],
                  })
                }
              >
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
                  <div className={`main-text ${status}`}>{status}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(SpotTableComponent);
