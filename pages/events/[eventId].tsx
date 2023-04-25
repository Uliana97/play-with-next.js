import Head from "next/head";

import { ParsedUrlQuery } from "querystring";
import { GetStaticProps, GetStaticPaths } from "next";

import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import Comments from "@/components/input/comments";

import { getFeaturedEvents, getEventById } from "@/helpers/api-util";
import { IEvent } from "@/components/events/types";

interface IParams extends ParsedUrlQuery {
  eventId: string;
}

function EventDetailPage({ event }: { event: IEvent }) {
  if (!event) {
    return (
      <div className="center">
        <p>LOADING...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Event - {event.title}</title>
        <meta name="description" content={event.description} />
      </Head>

      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { eventId } = context.params as IParams;
  const event = await getEventById(eventId);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      event: event,
    },
    revalidate: 1800, // in sec
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((e) => ({ params: { eventId: e.id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default EventDetailPage;
