import Head from "next/head";

import { getAllEvents } from "@/helpers/api-util";

import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";

import { IEvent } from "@/components/events/types";

const AllEventsPage = ({ allEvents }: { allEvents: IEvent[] }) => {
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Look at all events we have!" />
      </Head>

      <EventsSearch />
      <EventList items={allEvents} />
    </>
  );
};

export const getStaticProps = async () => {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents,
    },
    revalidate: 60, // in sec
  };
};

export default AllEventsPage;
