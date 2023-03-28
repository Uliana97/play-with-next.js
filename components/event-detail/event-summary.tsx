import classes from "./event-summary.module.css";

const EventSummary = ({ title }: { title: string }) => {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
