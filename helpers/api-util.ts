import { IEvent } from "@/components/events/types";

export async function getAllEvents(): Promise<IEvent[]> {
  const res = await fetch(
    "https://play-next-feed1-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );
  const data = await res.json();
  let events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const data = await getAllEvents();
  return data.filter((event) => event.isFeatured);
}

export async function getEventById(id: string) {
  const data = await getAllEvents();

  return data.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter: {
  year: number;
  month: number;
}) {
  const { year, month } = dateFilter;

  const filteredEvents = await getAllEvents();
  const events = filteredEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return events;
}
