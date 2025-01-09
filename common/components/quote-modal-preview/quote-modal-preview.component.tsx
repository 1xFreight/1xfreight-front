import "./styles.css";
import FTL from "@/public/png/full-truck.png";
import LTL from "@/public/png/half-truck.png";
import Ocean from "@/public/png/ocean-transportation.png";
import Air from "@/public/png/air-transportation.png";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { clearText, toShortId } from "@/common/utils/data-convert.utils";
import { formatDate, formatTime } from "@/common/utils/date.utils";
import Database from "@/public/icons/30px/database.svg";
import ExpandAlt from "@/public/icons/30px/expand-alt.svg";
import Archive from "@/public/icons/30px/archive.svg";
import OpenBox from "@/public/icons/30px/open-box.svg";
import Gym from "@/public/icons/30px/gym.svg";
import DollarSign from "@/public/icons/30px/dollar-sign.svg";
import Cog from "@/public/icons/30px/cog.svg";
import TempUp from "@/public/icons/30px/temperature-arrow-up(1).svg";
import TempDown from "@/public/icons/30px/temperature-arrow-down(1).svg";
import Arrow from "@/public/icons/40px/Arrow 1.svg";
import Packages from "@/public/png/sparkle.png";
import DoubleCheck from "@/public/icons/24px/double-check.svg";
import LocationCircleChecked from "@/public/png/location-circle-greenchecked.png";
import Link from "next/link";
import useStore from "@/common/hooks/use-store.context";
import { useDebouncedCallback } from "use-debounce";
import { postWithAuth } from "@/common/utils/fetchAuth.util";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import { QuoteStatusEnum } from "@/common/enums/quote-status.enum";
import { useRouter } from "next/navigation";
import { formDataToJSON } from "@/common/utils/formData.util";
import {
  AddPO,
  DuplicateLoad,
  SaveAsTemplate,
} from "@/app/shipments/[quote_id]/components/bottom-menu-actions.component";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";

const typeImageMapping = {
  [QuoteTypeEnum.FTL]: FTL,
  [QuoteTypeEnum.LTL]: LTL,
  [QuoteTypeEnum.FCL]: Ocean,
  [QuoteTypeEnum.AIR]: Air,
};

export default function QuoteModalPreviewComponent({
  quote,
  setQuote,
  shipmentsButtons = false,
  refreshFn,
  hideActions = false,
  customButtons = null,
}) {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({
    title: "",
    data: null,
    action: null,
    extraAction: null,
  });
  const { showToast, setTriggerUpdate, addToStore, getFromStore } = useStore();
  const router = useRouter();
  const reference = quote?.references;
  const pickup =
    quote?.addresses?.filter(({ address_type }) => address_type === "pickup") ??
    quote?.pickup;
  const drop =
    quote?.addresses?.filter(({ address_type }) => address_type === "drop") ??
    quote?.drop;
  const details = quote?.details ? quote?.details[0] : quote?.shipment_details;
  const items = quote?.items?.length ? quote.items : details?.items;
  const quoteId = quote._id;

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
      keepTheSameCarrier: obj.keepCarrier,
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
      data: <DuplicateLoad directQuote={quote} />,
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

  const cancelLoad = useDebouncedCallback(() => {
    postWithAuth(`/quote/cancel/${quote?._id}`, {}).then(async (response) => {
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

      if (refreshFn) {
        refreshFn();
      }
    });
  }, 300);

  const displayIfQuoteStatus = (...statuses: QuoteStatusEnum[]) => {
    let canDisplay = false;

    statuses.map(
      (status) => (canDisplay = status == quote?.status || canDisplay),
    );

    return canDisplay;
  };

  if (!quote) return;

  return (
    <>
      <ConfirmActionComponent
        title={`Cancel load [${toShortId(quote?._id)}] ?`}
        id={`ship-table-cancel-load-${quote?._id}`}
        action={cancelLoad}
      />
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
      <div className={"quote-modal-preview"} id={"quote-modal-preview"}>
        <div>
          <div className={"qm-header"}>
            <div className={"quote-type"}>
              <Image
                src={typeImageMapping[quote?.type]}
                alt={"type"}
                width={55}
              />
              {quote?.type}
              <span>{quote?.equipments?.join(", ")}</span>
            </div>
            <h3 className={"quote-short-id"}>#{toShortId(quote?._id)}</h3>
          </div>

          <div className={"qm-content"}>
            <div className={"locations-wrapper"}>
              <div className={"pickup-locations"}>
                <h3>Pickup</h3>

                {pickup?.map((location, index) => (
                  <>
                    <div
                      key={location._id + index + index}
                      className={"location-item"}
                    >
                      {location?.arrival_date ? (
                        <Image
                          src={LocationCircleChecked}
                          alt={"location"}
                          width={100}
                          height={100}
                          style={{
                            scale: 1.3,
                            transformOrigin: "center",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      ) : (
                        <Image
                          src={Packages}
                          alt={"location"}
                          width={100}
                          height={100}
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      )}
                      <div className={"location-details-wrapper"}>
                        <div className={"company-name"}>
                          {location.company_name}
                        </div>
                        <div className={"main-text-address"}>
                          {location.partial_address ?? location.address}
                        </div>
                        {location?.arrival_date ? (
                          <div className={"arrival-text sub-text-address"}>
                            {formatDate(location?.arrival_date)}
                            {" at "}
                            {formatTime(location?.arrival_time)}
                            <DoubleCheck />
                          </div>
                        ) : (
                          <div className={"sub-text-address"}>
                            {formatDate(location.date)} {location.time_start}{" "}
                            {location.time_end ? " - " + location.time_end : ""}
                          </div>
                        )}
                      </div>
                    </div>
                    {pickup[index + 1] && (
                      <div className={"between-address-arrow"}>
                        <Arrow />
                      </div>
                    )}
                  </>
                ))}
              </div>
              <div className={"drop-locations"}>
                <h3>Drop</h3>

                {drop?.map((location, index) => (
                  <>
                    <div key={location._id + index} className={"location-item"}>
                      {location?.arrival_date ? (
                        <Image
                          src={LocationCircleChecked}
                          alt={"location"}
                          width={100}
                          height={100}
                          style={{
                            scale: 1.3,
                            transformOrigin: "center",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      ) : (
                        <Image
                          src={Packages}
                          alt={"location"}
                          width={100}
                          height={100}
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      )}
                      <div className={"location-details-wrapper"}>
                        <div className={"company-name"}>
                          {location.company_name}
                        </div>
                        <div className={"main-text-address"}>
                          {location.partial_address ?? location.address}
                        </div>

                        {location?.arrival_date ? (
                          <div className={"arrival-text sub-text-address"}>
                            {formatDate(location?.arrival_date)}
                            {" at "}
                            {formatTime(location?.arrival_time)}
                            <DoubleCheck />
                          </div>
                        ) : (
                          <div className={"sub-text-address"}>
                            {formatDate(location.date)} {location.time_start}{" "}
                            {location.time_end ? " - " + location.time_end : ""}
                          </div>
                        )}
                      </div>
                    </div>
                    {drop[index + 1] && (
                      <div className={"between-address-arrow"}>
                        <Arrow />
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>

            <div className={"quote-details"}>
              <div className={"details-wrapper"}>
                {reference &&
                  reference.map((ref, index) => (
                    <div key={ref + index}>
                      <span>{index + 1}</span>
                      <h4>PO/Reference No: </h4>
                      <h3>{ref}</h3>
                    </div>
                  ))}
                {!!details?.packing_method && (
                  <div>
                    <Database />
                    <h4>Packing method: </h4>
                    <h3
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {clearText(details?.packing_method)}
                    </h3>
                  </div>
                )}

                {!!details?.skid_spots && (
                  <div>
                    <ExpandAlt />
                    <h4>Est. skid spots: </h4>
                    <h3
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      {details?.skid_spots}
                    </h3>
                  </div>
                )}

                {!!details?.volume && (
                  <div>
                    <Database />
                    <h4>volume: </h4>
                    <h3>{details?.volume.toFixed(2)} ft3</h3>
                  </div>
                )}

                {!!details?.density && (
                  <div>
                    <Archive />
                    <h4>density: </h4>
                    <h3>
                      {details?.density.toFixed(2)} {details.weight_unit}/ft3
                    </h3>
                  </div>
                )}

                {!!details?.packing_type && (
                  <div>
                    <Archive />
                    <h4>Packing type: </h4>
                    <h3>{details?.packing_type}</h3>
                  </div>
                )}

                {!!details?.commodity && (
                  <div>
                    <OpenBox />
                    <h4>Commodity: </h4>
                    <h3>{details?.commodity}</h3>
                  </div>
                )}

                {!!details?.weight &&
                  !!details?.weight_unit &&
                  !!details?.quantity && (
                    <div>
                      <Gym />
                      <h4>Weight: </h4>
                      <h3>
                        {details?.weight +
                          " " +
                          details?.weight_unit +
                          ", " +
                          details?.quantity +
                          " units"}
                      </h3>
                    </div>
                  )}

                <div>
                  <DollarSign />
                  <h4>Goods value: </h4>
                  <h3>${details?.goods_value}.00</h3>
                </div>

                {!!details?.accessorials?.length && (
                  <div>
                    <Cog />
                    <h4>Accessorials: </h4>
                    <h3>{details?.accessorials?.join(", ")}</h3>
                  </div>
                )}

                {details?.min_temp && details?.max_temp && (
                  <>
                    <div className={"temp-reefer"}>
                      <TempUp />
                      <h4>Max Temp: </h4>
                      <h3>{details?.max_temp + " "}°F</h3>
                    </div>

                    <div className={"temp-reefer"}>
                      <TempDown />
                      <h4>Min Temp: </h4>
                      <h3>{details?.min_temp + " "}°F</h3>
                    </div>
                  </>
                )}

                {!!quote?.load_number && (
                  <div>
                    <OpenBox />
                    <h4>Load numbers: </h4>
                    <h3>{quote?.load_number}</h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {customButtons && (
          <div className={"qm-preview-actions"}>{customButtons}</div>
        )}

        {!hideActions && (
          <div className={"qm-preview-actions"}>
            <button
              onClick={cancelLoad}
              className={`cancel`}
              disabled={
                !displayIfQuoteStatus(
                  QuoteStatusEnum.REQUESTED,
                  QuoteStatusEnum.BOOKED,
                )
              }
            >
              Cancel load
            </button>
            <button
              onClick={() => {
                setModalData(modalComponents.duplicate_load);
                customSetOpen(true);
              }}
            >
              Duplicate
            </button>
            <button
              onClick={() => {
                setModalData(modalComponents.save_as_template);
                customSetOpen(true);
              }}
              className={"template-btn"}
            >
              Make Template
            </button>
            <button
              disabled={
                !displayIfQuoteStatus(
                  QuoteStatusEnum.REQUESTED,
                  QuoteStatusEnum.BOOKED,
                  QuoteStatusEnum.DISPATCHED,
                  QuoteStatusEnum.IN_TRANSIT,
                  QuoteStatusEnum.AT_PICKUP,
                  QuoteStatusEnum.AT_DESTINATION,
                )
              }
              onClick={() => {
                setModalData(modalComponents.add_po);
                customSetOpen(true);
              }}
            >
              Add PO#
            </button>
            {shipmentsButtons && (
              <div
                style={{
                  display: "inline-flex",
                  gap: "0.5rem",
                }}
              >
                <Link
                  href={`/docs/bol/${quote?._id}`}
                  prefetch
                  target={"_blank"}
                >
                  <button>Generate BOL</button>
                </Link>
                <Link
                  href={`/docs/labels/${quote?._id}`}
                  prefetch
                  target={"_blank"}
                  style={{}}
                >
                  <button>Generate Label</button>
                </Link>

                <button
                  onClick={() => {
                    document.getElementById(
                      "change-carrier-confirm",
                    ).style.display = "flex";
                  }}
                  disabled={!displayIfQuoteStatus(QuoteStatusEnum.BOOKED)}
                >
                  Change Carrier
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
