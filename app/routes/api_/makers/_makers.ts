import type { Route } from './+types/_makers';
import { getMakers, Maker } from '~/models/makers.server';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const maxParam = url.searchParams.get('max');
  const max = maxParam ? parseInt(maxParam, 10) : 5;

  if (isNaN(max) || max <= 0) {
    return new Response('Invalid "max" parameter', { status: 400 });
  }

  try {
    const makers: Maker[] = await getMakers(max);

    return {
      makers,
    };
  } catch (error) {
    console.error('Error fetching makers:', error);
    throw new Response('Error fetching makers', { status: 500 });
  }
}
