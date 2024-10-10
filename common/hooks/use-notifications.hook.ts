import { NotificationServiceInstance } from "@/common/libs/notification.service";

export const useNotifications = () => {
  const notifService = NotificationServiceInstance;

  const getUserNotifications = () => {
    return notifService.getUserNotifications();
  };

  const connect = () => {
    return notifService.connect();
  };

  const disconnect = () => {
    return notifService.disconnect();
  };

  const reconnect = () => {
    return notifService.reconnect();
  };

  return {
    getUserNotifications,
    connect,
    disconnect,
    reconnect,
    notificationService: notifService,
  };
};
