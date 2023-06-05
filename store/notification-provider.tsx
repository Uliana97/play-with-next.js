import { INotification } from "@/components/notification/notification";
import { createContext, useContext, useEffect, useState } from "react";

type TContextType = {
  notification: INotification | null;
  showNotification: (notificationData: INotification) => void;
  hideNotification: () => void;
};

const NotificationContext = createContext<TContextType>({
  notification: null,
  showNotification: (notificationData: INotification) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [activeNotification, setActiveNotification] =
    useState<INotification | null>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const showNotificationHandler = (notificationData: INotification) => {
    setActiveNotification(notificationData);
  };

  const hideNotificationHandler = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  return context;
};
