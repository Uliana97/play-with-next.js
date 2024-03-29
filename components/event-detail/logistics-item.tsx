import classes from "./logistics-item.module.css";

const LogisticsItem = (props: {
  icon: () => JSX.Element;
  children: React.ReactNode;
}) => {
  const { icon: Icon } = props;

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
        <Icon />
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
};

export default LogisticsItem;
