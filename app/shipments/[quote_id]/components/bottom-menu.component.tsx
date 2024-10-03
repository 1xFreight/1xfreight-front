import Document from "@/public/icons/24px/document2.svg";
import Archive from "@/public/icons/24px/archives 1.svg";
import Refresh from "@/public/icons/24px/refresh-double.svg";
import Printer from "@/public/icons/24px/printer.svg";
import AddNote from "@/public/icons/24px/add-note2.svg";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import { useState } from "react";
import {
  AddPO,
  DuplicateLoad,
} from "@/app/shipments/[quote_id]/components/bottom-menu-actions.component";
import { useDebouncedCallback } from "use-debounce";
import { formDataToJSON } from "@/common/utils/formData.util";
import { extractReferenceNo } from "@/common/utils/data-convert.utils";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import { useRouter } from "next/navigation";

export default function BottomMenuComponent({ quoteId }) {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({
    title: "",
    data: null,
    action: null,
  });
  const { showToast, setTriggerUpdate } = useStore();
  const router = useRouter();

  const addPo = useDebouncedCallback(() => {
    const form = document.forms["add_po_form"];
    const valid = form.reportValidity();

    if (!valid) return;

    const formData = new FormData(form);
    const obj = formDataToJSON(formData);
    const references = [];

    Array(5)
      .fill(1)
      .map((x, index) => {
        const number = Object.keys(obj).find((key) =>
          key.includes(`reference_no${index}`),
        );
        const type = Object.keys(obj).find((key) =>
          key.includes(`reference_type${index}`),
        );
        number && type ? references.push(obj[type] + "/" + obj[number]) : "";
      });

    if (!references) return;

    postWithAuth(`/quote/add_po/${quoteId}`, references).then(
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
          text: "PO# was added successfully",
          duration: 5000,
        });

        setTriggerUpdate(Math.random());
        setOpen(false);
      },
    );
  }, 300);

  const changeCarrier = useDebouncedCallback(() => {
    postWithAuth(`/quote/change_carrier/${quoteId}`, {}).then(
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
          text: "Carrier was removed successfully",
          duration: 5000,
        });

        router.push(`/quotes/${quoteId}`);
      },
    );
  }, 300);

  const duplicateLoad = useDebouncedCallback(() => {
    const form = document.forms["duplicate-load-data"];
    const valid = form.reportValidity();

    if (!valid) return;

    const formData = new FormData(form);
    const obj = formDataToJSON(formData);
    const addressesUpdateData = [];

    Object.keys(obj).map((key) => {
      if (key.includes("add-time")) {
        if (obj[key] !== "on") return;
        const index = key[key.length - 1];
        addressesUpdateData.push({
          id: obj[`address-id-${index}`],
          date: obj[`address-date-${index}`],
          time_start: obj[`time-start-${index}`],
          time_end: obj[`time-end-${index}`],
        });
      }
    });

    const duplicateLoadData = {
      addresses: addressesUpdateData,
      deadline_date: obj.deadline_date,
      deadline_time: obj.deadline_time,
      quote_id: quoteId,
    };

    console.log(duplicateLoadData);
    console.log(addressesUpdateData);

    postWithAuth(`/quote/duplicate-load`, duplicateLoadData).then(
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
          text: "Load was duplicated successfully",
          duration: 5000,
        });

        // router.push(`/quotes/${quoteId}`);
      },
    );
  }, 300);

  const modalComponents = {
    add_po: {
      title: "Add PO#",
      data: <AddPO />,
      action: addPo,
    },
    duplicate_load: {
      title: "Duplicate Load",
      data: <DuplicateLoad />,
      action: duplicateLoad,
    },
  };

  return (
    <>
      <RightModalComponent
        open={open}
        setOpen={setOpen}
        title={modalData?.title}
        action={modalData?.action}
      >
        {modalData?.data}
      </RightModalComponent>
      <ConfirmActionComponent
        id={"change-carrier-confirm"}
        title={
          "This shipment will be moved to Quotes page and you will be able to select again from all precedent quotes."
        }
        action={changeCarrier}
      />
      <div className={"bottom-menu fade-in-bottom"}>
        <div className={"container"}>
          <div>
            <div className={"main-text"}>Carrier Quote #: 567422</div>
            <div className={"main-text"}>BOL #: 567422</div>
          </div>

          <button>
            <Document /> View BOL
          </button>
          <button>
            <Printer /> Print Labels
          </button>
          <button
            onClick={() => {
              setModalData(modalComponents.duplicate_load);
              setOpen(true);
            }}
          >
            <Archive /> Duplicate Load
          </button>
          <button
            onClick={() => {
              setModalData(modalComponents.add_po);
              setOpen(true);
            }}
          >
            <AddNote /> Add PO#
          </button>
          <button
            onClick={() => {
              document.getElementById("change-carrier-confirm").style.display =
                "flex";
            }}
          >
            <Refresh /> Change Carrier
          </button>
        </div>
      </div>
    </>
  );
}
