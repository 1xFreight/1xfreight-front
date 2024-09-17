import IToast from "@/common/interfaces/toast.interface";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import Checked from "@/public/icons/24px/success-filled.svg";
import Warning from "@/public/icons/24px/warning-circle.svg";
import Error from "@/public/icons/24px/error-round.svg";
import Info from "@/public/icons/24px/info-circle.svg";

import "./styles.css";
import { clearText } from "@/common/utils/data-convert.utils";
import { useEffect } from "react";

const icon = {
  [ToastTypesEnum.SUCCESS]: <Checked />,
  [ToastTypesEnum.INFO]: <Info />,
  [ToastTypesEnum.ERROR]: <Error />,
  [ToastTypesEnum.WARNING]: <Info />,
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
      }}
    >
      {icon[type]}
      <h5>{text}</h5>
    </div>
  );
}
