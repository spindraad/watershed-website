import { lazy, Suspense, useEffect, useState } from 'react';
import { ComponentConfig } from '@puckeditor/core';
import { QueryKey, useQuery } from '@tanstack/react-query';
import { SerializedMaker as Maker } from '~/models/makers.server';
import MakersOverview from '~/components/MakersOverview';
import Loader from '~/components/Loader';

export type MakersOverviewBlockProps = {
  maxMakers?: number;
};

export const MakersOverviewBlock: ComponentConfig<MakersOverviewBlockProps> = {
  label: 'Makers Overzicht',
  fields: {
    maxMakers: {
      label: 'Maximale aantal makers',
      type: 'number',
    },
  },
  render: (props) => {
    return <MakersOverviewBlockComponent {...props} />;
  },
};

function MakersOverviewBlockComponent(props: MakersOverviewBlockProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <ClientOnlyMakersOverview {...props} />
    </Suspense>
  );
}

const ClientOnlyMakersOverview = lazy(() =>
  Promise.resolve({
    default: ClientOnlyMakersBlockComponent,
  }),
);

function ClientOnlyMakersBlockComponent({
  maxMakers,
}: MakersOverviewBlockProps) {
  const {
    data: makers,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['makers', maxMakers],
    queryFn: _fetchMakers,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="not-prose">
      <MakersOverview makers={makers} />
    </div>
  );
}

async function _fetchMakers({ queryKey }: { queryKey: QueryKey }) {
  const [, maxMakers] = queryKey;
  const response = await fetch(
    // TODO: Replace with environment variable or relative path
    `http://localhost:5173/api/makers?max=${maxMakers ?? 5}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch makers');
  }

  const { makers } = (await response.json()) as { makers: Maker[] };
  return makers;
}
