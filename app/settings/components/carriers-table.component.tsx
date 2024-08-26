import TagComponent from "@/app/get-quote/pages/partners/components/tag.component";
import { memo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";

function CarriersTableComponent({ partners }: { partners: any[] }) {
  const { showToast } = useStore();

  const debounceUpdateStatus = useDebouncedCallback(
    async (value: string, index: number) => {
      const { name, _id } = partners[index];

      postWithAuth("/carrier/update", { status: value, _id }).then(
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

          partners[index].status = value;
        },
      );
    },
    500,
  );

  return (
    <div className={"carriers-table"}>
      <table>
        <thead>
          <tr className={"fade-in"}>
            <th></th>
            <th>Name</th>
            <th>Status</th>
            <th>Email</th>
            <th>Location</th>
            <th>Phone</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody className={"fade-in"}>
          {partners &&
            partners.map(
              (
                { name, email, address, tags, phone, city, status, _id },
                index,
              ) => (
                <tr key={index + email}>
                  <td>
                    <div>{index + 1}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{name?.toLowerCase()}</div>
                  </td>
                  <td>
                    <div className={`main-text ${status}`}>
                      <select
                        defaultValue={status}
                        onChange={(e) => {
                          if (e.target.value !== status) {
                            debounceUpdateStatus(e.target.value, index);
                          }
                        }}
                      >
                        <option value={"active"}>active</option>
                        <option value={"inactive"}>inactive</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <div className={"main-text"}>{email?.toLowerCase()}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>
                      {address?.toLowerCase()}
                      {" , "}
                      {city?.toLowerCase()}
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
