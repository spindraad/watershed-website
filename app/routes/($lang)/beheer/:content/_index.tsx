import type { Route } from './+types/_index';
import { useLoaderData } from 'react-router';

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { content } = params;

  let data = '';

  switch (content) {
    case 'evenementen':
      data = 'events';
      break;

    case 'projecten':
      data = 'projects';
      break;
  }

  return { data };
};

export default function ContentOverviewRoute() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}
