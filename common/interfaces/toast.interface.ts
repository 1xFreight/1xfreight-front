import ToastTypesEnum from "@/common/enums/toast-types.enum";

export interface IToast {
  type: ToastTypesEnum;
  title?: string;
  text: string;
  icon?: any;
  duration?: number;
  id?: string;
}

export default IToast;
