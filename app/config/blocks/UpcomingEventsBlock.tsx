import { lazy, Suspense, useEffect, useState } from 'react';
import { ComponentConfig } from '@puckeditor/core';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { SerializedEvent as Event } from '~/models/events.server';
import UpcomingEvents from '~/components/UpcomingEvents';
import Loader from '~/components/Loader';

export type UpcomingEventsBlockProps = {
  maxEvents?: number;
  alignment: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'center' | 'bottom';
  };
};

export const UpcomingEventsBlock: ComponentConfig<UpcomingEventsBlockProps> = {
  label: 'Aankomende Evenementen',
  fields: {
    maxEvents: {
      label: 'Maximale aantal evenementen',
      type: 'number',
    },
    alignment: {
      label: 'Uitlijning',
      type: 'object',
      objectFields: {
        horizontal: {
          label: 'Horizontaal',
          type: 'select',
          options: [
            { label: 'Links', value: 'left' },
            { label: 'Midden', value: 'center' },
            { label: 'Rechts', value: 'right' },
          ],
        },
        vertical: {
          label: 'Verticaal',
          type: 'select',
          options: [
            { label: 'Boven', value: 'top' },
            { label: 'Midden', value: 'center' },
            { label: 'Onder', value: 'bottom' },
          ],
        },
      },
    },
  },
  defaultProps: {
    maxEvents: 5,
    alignment: {
      horizontal: 'center',
      vertical: 'top',
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
  alignment,
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

  const alignmentMap: Record<string, string> = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    top: 'flex-start',
    bottom: 'flex-end',
  };

  return (
    <div
      className="w-full h-full flex"
      style={{
        justifyContent: alignmentMap[alignment.horizontal],
        alignItems: alignmentMap[alignment.vertical],
      }}
    >
      <UpcomingEvents events={events} />
    </div>
  );
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
