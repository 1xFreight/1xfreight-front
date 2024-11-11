import TagComponent from "@/app/get-quote/pages/partners/components/tag.component";
import { memo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";

function CarriersTableComponent({ partners }: { partners: any[] }) {
  const { addToStore } = useStore();

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
                <tr
                  key={index + email}
                  onClick={() =>
                    addToStore({
                      name: "edit-carrier-data",
                      data: partners[index],
                    })
                  }
                  className={"tr-edit-table-hover-effect"}
                >
                  <td>
                    <div>{index + 1}</div>
                  </td>
                  <td>
                    <div className={"main-text"}>{name?.toLowerCase()}</div>
                  </td>
                  <td>
                    <div className={`main-text ${status}`}>{status}</div>
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
