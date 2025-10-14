import { ComponentConfig } from '@measured/puck';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { SerializedEvent as Event } from '~/models/events.server';
import UpcomingEvents from '~/components/UpcomingEvents';
import Loader from '~/components/Loader';

export type UpcomingEventsBlockProps = {
  maxEvents?: number;
};

export const UpcomingEventsBlock: ComponentConfig<UpcomingEventsBlockProps> = {
  label: 'Aankomende Evenementen',
  fields: {
    maxEvents: {
      label: 'Maximale aantal evenementen',
      type: 'number',
    },
  },
  render: (props) => {
    return <UpcomingEventsBlockComponent {...props} />;
  },
};

function UpcomingEventsBlockComponent({ maxEvents }: UpcomingEventsBlockProps) {
  const {
    data: events,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['upcoming-events', maxEvents],
    queryFn: _fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return <UpcomingEvents events={events} />;
}

async function _fetchEvents({ queryKey }: { queryKey: QueryKey }) {
  const [, maxEvents] = queryKey;
  const response = await fetch(`/api/events?max=${maxEvents ?? 5}`);
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const { events } = (await response.json()) as { events: Event[] };
  return events;
}
