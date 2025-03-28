import { getEvents } from '~/models/events.server';
import { Link, useLoaderData } from 'react-router';
import Heading from '~/components/Heading';

export async function loader() {
  const events = await getEvents();
  return {
    events,
  };
}

export default function EventsRoute() {
  const { events } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="content">
        <Heading level={1}>coming up</Heading>

        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <Link to={`/evenementen/${event.id}`}>
                <Heading level={4}>{event.title.nl}</Heading>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
