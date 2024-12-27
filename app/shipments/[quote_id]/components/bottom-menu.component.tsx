import Document from "@/public/icons/24px/document2.svg";
import Archive from "@/public/icons/24px/archives 1.svg";
import Refresh from "@/public/icons/24px/refresh-double.svg";
import Printer from "@/public/icons/24px/printer.svg";
import AddNote from "@/public/icons/24px/add-note2.svg";
import Template from "@/public/icons/24px/archive.svg";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import React, { useEffect, useState } from "react";
import {
  AddPO,
  DuplicateLoad,
  SaveAsTemplate,
} from "@/app/shipments/[quote_id]/components/bottom-menu-actions.component";
import { useDebouncedCallback } from "use-debounce";
import { formDataToJSON } from "@/common/utils/formData.util";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ExtraBottomMenuComponent from "@/app/shipments/[quote_id]/components/extra-botom-menu/extra-bottom-menu.component";

export default function BottomMenuComponent({ quoteId, status, request }) {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({
    title: "",
    data: null,
    action: null,
    extraAction: null,
  });
  const { showToast, setTriggerUpdate, addToStore, getFromStore } = useStore();
  const [quote, setQuote] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const data = getFromStore("shipment_quote").data;
    setQuote(data);
  }, []);

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

  const saveAsTemplate = useDebouncedCallback(() => {
    const form = document.forms["save_as_template"];
    const valid = form.reportValidity();

    if (!valid) return;

    const formData = new FormData(form);
    const obj = formDataToJSON(formData);

    const templateObj = {
      name: obj.name,
      quote_id: quoteId,
    };

    postWithAuth(`/quote/template`, templateObj).then(async (response) => {
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
        text: "Template was saved successfully!",
        duration: 5000,
      });

      setOpen(false);
    });
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

        setOpen(false);
      },
    );
  }, 300);

  const redirectToGetQuote = () => {
    addToStore({
      name: "get-quote-settings",
      data: quote,
    });

    router.push("/get-quote");
  };

  const editFullQuoteButton = (
    <button type={"button"} onClick={() => redirectToGetQuote()}>
      Edit Full Quote
    </button>
  );

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
      extraAction: editFullQuoteButton,
    },
    save_as_template: {
      title: "Save as Template",
      data: <SaveAsTemplate />,
      action: saveAsTemplate,
    },
  };

  const customSetOpen = (state: boolean) => {
    if (!state) return setOpen(state);

    const confirmActionModal = document.getElementById(
      "change-carrier-confirm",
    );
    confirmActionModal ? (confirmActionModal.style.display = "none") : "";

    setOpen(state);
  };

  return (
    <>
      <RightModalComponent
        open={open}
        setOpen={customSetOpen}
        title={modalData?.title}
        action={modalData?.action}
        extraButton={modalData?.extraAction}
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
        <ExtraBottomMenuComponent status={status} request={request} />
        <div className={"bottom-menu-container"}>
          <Link href={`/docs/bol/${quoteId}`} target={"_blank"} prefetch>
            <button>
              <Document />
              Generate BOL
            </button>
          </Link>
          <Link href={`/docs/labels/${quoteId}`} target={"_blank"} prefetch>
            <button>
              <Printer />
              Generate Label
            </button>
          </Link>
          <button
            onClick={() => {
              setModalData(modalComponents.duplicate_load);
              customSetOpen(true);
            }}
          >
            <Archive /> Duplicate
          </button>
          <button
            onClick={() => {
              setModalData(modalComponents.add_po);
              customSetOpen(true);
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

          <button
            onClick={() => {
              setModalData(modalComponents.save_as_template);
              customSetOpen(true);
            }}
            className={"template-btn"}
          >
            <Template /> Template
          </button>
        </div>
      </div>
    </>
  );
}
