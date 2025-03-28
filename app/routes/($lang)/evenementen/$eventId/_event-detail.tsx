import type { Route } from './+types/_event-detail';
import { getEvent } from '~/models/events.server';
import { useLoaderData } from 'react-router';
import { useTranslation } from 'react-i18next';
import Heading from '~/components/Heading';
import {
  convertDateToLocaleString,
  convertTimeToLocaleString,
} from '~/utils/date';

export async function loader({ params }: Route.LoaderArgs) {
  const { eventId } = params;

  const event = await getEvent(eventId);

  return {
    event,
  };
}

export default function EventDetailRoute() {
  const { event } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  const content = { __html: event.description[i18n.language] };

  const datetime = `${convertDateToLocaleString(event.eventDate)} ${convertTimeToLocaleString(event.eventDate)}`;

  return (
    <>
      <div className="content space-y-4">
        <Heading level={1}>{event.title[i18n.language]}</Heading>
        <p className="flex flex-row gap-4">
          <span>{datetime}</span>
          <span>{event.address}</span>
        </p>

        <div className="prose prose-2xl" dangerouslySetInnerHTML={content} />
      </div>
    </>
  );
}
