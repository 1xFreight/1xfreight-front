import "./styles.css";
import { Dispatch, memo, ReactNode, SetStateAction, useState } from "react";

function RightModalComponent({
  open,
  setOpen,
  children,
  title,
  action,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
  action?: any;
}) {
  const closeModal = () => {
    const modalBodyEL = document.getElementById("right-modal-body-id");
    const modalBackdropEL = document.getElementById(
      "right-modal-body-backdrop-id",
    );
    modalBodyEL.style.opacity = "0";
    modalBackdropEL.style.opacity = "0";

    setTimeout(() => {
      setOpen(false); // Close the modal
    }, 100); // Match the animation duration
  };

  if (!open) return null;

  return (
    <div className="right-modal-wrapper">
      <div
        className="modal-backdrop fade-in"
        id="right-modal-body-backdrop-id"
        onClick={closeModal}
      ></div>

      <div className={"modal-body  fade-in-right2"} id="right-modal-body-id">
        <div className="modal-content">
          <h2>{title}</h2>

          <div className="modal-content-wrapper">{children}</div>
        </div>
        <div className="modal-actions">
          <button className="cancel" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="confirm"
            onClick={() => (action ? action() : null)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(RightModalComponent);
