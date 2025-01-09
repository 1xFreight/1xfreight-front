import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import IToast from "@/common/interfaces/toast.interface";
import { usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useNotifications } from "@/common/hooks/use-notifications.hook";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";

interface NotificationContextI {
  notifications: any;
  setNotifications: Dispatch<SetStateAction<any>>;
  clearAllNotifications: () => void;
  deleteOneNotification: (id: string) => void;
}

const defaultContextValues = {
  setNotifications: () => {},
  notifications: [],
  clearAllNotifications: () => {},
  deleteOneNotification: () => {},
};

export const NotificationContext =
  createContext<NotificationContextI>(defaultContextValues);

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { connect, getUserNotifications, notificationService } =
    useNotifications();
  const { showToast } = useStore();

  const initializeNotifications = useDebouncedCallback(() => {
    connect()
      .then(() => getUserNotifications().then((re) => setNotifications(re)))
      .then(() =>
        notificationService.socket.on("new-notification", handleNewMessage),
      );
  }, 350);

  const handleNewMessage = useDebouncedCallback(
    (message) => {
      setNotifications((prev) => [
        { ...message, isNewNotification: true },
        ...prev,
      ]);
      showToast({
        type: ToastTypesEnum.INFO,
        text: "You got a notification",
      });
    },
    1000,
    { leading: true },
  );

  const clearAllNotifications = useDebouncedCallback(() => {
    notificationService.socket.emit("clear-all");
    setNotifications([]);
  }, 300);

  const deleteOneNotification = useDebouncedCallback((id) => {
    notificationService.socket.emit("clear-one", { _id: id });
    setNotifications((prevState) =>
      prevState.filter((notif) => notif._id != id),
    );
  });

  useEffect(() => {
    initializeNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        clearAllNotifications,
        deleteOneNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
