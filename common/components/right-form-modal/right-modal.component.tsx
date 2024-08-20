import "./styles.css";
import { Dispatch, memo, ReactNode, SetStateAction } from "react";

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
  if (!open) return;

  return (
    <div className={"right-modal-wrapper"}>
      <div className={"modal-backdrop fade-in"}></div>

      <div className={"modal-body fade-in-right2"}>
        <div>
          <h2>{title}</h2>

          <div className={"modal-content-wrapper"}>{children}</div>
        </div>
        <div className={"modal-actions"}>
          <button className={"cancel"} onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button
            className={"confirm"}
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
