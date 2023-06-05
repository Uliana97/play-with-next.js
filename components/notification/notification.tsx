import classes from "./notification.module.css";
import { useNotification } from "@/store/notification-provider";

export interface INotification {
  title: string;
  message: string;
  status: "success" | "error" | "pending";
}

const Notification = (props: INotification) => {
  const { hideNotification } = useNotification();

  const { title, message, status } = props;

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
