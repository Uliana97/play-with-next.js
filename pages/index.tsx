import { getFeaturedEvents } from "@/helpers/api-util";
import EventList from "@/components/events/event-list";
import { IEvent } from "@/components/events/types";

function HomePage({ featuredEvents }: { featuredEvents: IEvent[] }) {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800, // in sec
  };
};

export default HomePage;
