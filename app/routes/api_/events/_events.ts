import type { Route } from './+types/_events';
import { getEvents, Event } from '~/models/events.server';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const maxParam = url.searchParams.get('max');
  const max = maxParam ? parseInt(maxParam, 10) : 5;

  if (isNaN(max) || max <= 0) {
    return new Response('Invalid "max" parameter', { status: 400 });
  }

  try {
    const events: Event[] = await getEvents(max);

    return {
      events,
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Response('Error fetching events', { status: 500 });
  }
}
