import { Fragment } from "react";

import MainHeader from "./main-header";
import Notification from "@/components/notification/notification";
import { useNotification } from "@/store/notification-provider";

const Layout = (props: { children: React.ReactNode }) => {
  const { notification } = useNotification();

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
};

export default Layout;
