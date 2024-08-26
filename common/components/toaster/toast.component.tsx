import IToast from "@/common/interfaces/toast.interface";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import Checked from "@/public/icons/24px/checked-tick.svg";
import Warning from "@/public/icons/24px/warning-circle.svg";
import Error from "@/public/icons/24px/error-circle.svg";
import Info from "@/public/icons/24px/document.svg";

import "./styles.css";
import { clearText } from "@/common/utils/data-convert.utils";
import { useEffect } from "react";

const icon = {
  [ToastTypesEnum.SUCCESS]: <Checked />,
  [ToastTypesEnum.INFO]: <Info />,
  [ToastTypesEnum.ERROR]: <Error />,
  [ToastTypesEnum.WARNING]: <Warning />,
};

// slide-out-top
export default function ToastComponent({
  type,
  text,
  duration,
  id,
  index,
}: IToast) {
  return (
    <div
      className={`toast-card ${type} slide-in-right`}
      id={id}
      style={{
        zIndex: index + 1,
        // animationDelay: "1s",
        // animation: "fade-in 1s cubic-bezier(0.215, 0.610, 0.355, 1.000) both",
      }}
    >
      {icon[type]}
      <h5>{text}</h5>
    </div>
  );
}
