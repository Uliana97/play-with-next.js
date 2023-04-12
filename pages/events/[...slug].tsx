import Head from "next/head";

import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { IEvent } from "@/components/events/types";

import { getFilteredEvents } from "@/helpers/api-util";

interface IParams extends ParsedUrlQuery {
  slug: string[];
}

function FilteredEventsPage({
  filteredEvents,
  hasError,
  date,
}: {
  filteredEvents: IEvent[];
  hasError: boolean;
  date: Date;
}) {
  return (
    <>
      <Head>
        <title>Events on {date.toLocaleDateString("en-US")}</title>
        <meta name="description" content="Your filtered events" />
      </Head>

      {hasError ? (
        <>
          <ErrorAlert>
            <p>Invalid filter. Please adjust your values!</p>
          </ErrorAlert>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </>
      ) : !filteredEvents || filteredEvents.length === 0 ? (
        <>
          <ErrorAlert>
            <p>No events found for the chosen filter!</p>
          </ErrorAlert>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </>
      ) : (
        <>
          <ResultsTitle date={date} />
          <EventList items={filteredEvents} />
        </>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as IParams;

  const filteredYear = +slug[0];
  const filteredMonth = +slug[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  const date = new Date(filteredYear, filteredMonth - 1);

  return {
    props: {
      filteredEvents,
      date,
    },
  };
};

export default FilteredEventsPage;
