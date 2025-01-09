import useStore from "@/common/hooks/use-store.context";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { deleteCache, postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import Cross from "@/public/icons/24px/cross.svg";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import { toShortId } from "@/common/utils/data-convert.utils";

export default function CancelLoadShipTable({ quote_id }) {
  const { showToast } = useStore();
  const router = useRouter();

  const cancelLoad = useDebouncedCallback(() => {
    postWithAuth(`/quote/cancel/${quote_id}`, {}).then(async (response) => {
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
        text: "Quote was canceled",
        duration: 5000,
      });

      deleteCache();
      router.refresh();
    });
  }, 300);

  return (
    <>
      <div className={"tooltip"}>
        <button
          className={"cancel"}
          onClick={() => {
            const confirmAction = document.getElementById(
              `ship-table-cancel-load-${quote_id}`,
            );
            confirmAction.style.display = "flex";
          }}
        >
          <Cross />
        </button>
        <span
          className={"tooltiptext"}
          style={{
            right: 0,
            left: "unset",
          }}
        >
          Cancel
        </span>
      </div>
      <ConfirmActionComponent
        title={`Cancel load [${toShortId(quote_id)}] ?`}
        id={`ship-table-cancel-load-${quote_id}`}
        action={cancelLoad}
      />
    </>
  );
}
