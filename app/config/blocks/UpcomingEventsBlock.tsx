import { lazy, Suspense, useEffect, useState } from 'react';
import { ComponentConfig } from '@puckeditor/core';
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

function UpcomingEventsBlockComponent(props: UpcomingEventsBlockProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <ClientOnlyUpcomingEvents {...props} />
    </Suspense>
  );
}

const ClientOnlyUpcomingEvents = lazy(() =>
  Promise.resolve({
    default: ClientOnlyEventsBlockComponent,
  }),
);

function ClientOnlyEventsBlockComponent({
  maxEvents,
}: UpcomingEventsBlockProps) {
  const {
    data: events,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['upcoming-events', maxEvents],
    queryFn: _fetchEvents,
    staleTime: 1000 * 60 * 5,
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
  const response = await fetch(
    // TODO: Replace with environment variable or relative path
    `http://localhost:5173/api/events?max=${maxEvents ?? 5}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch events');
  }

  const { events } = (await response.json()) as { events: Event[] };
  return events;
}
