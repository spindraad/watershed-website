import type { Route } from './+types/_events';
import { Link, useLoaderData } from 'react-router';
import { getEvents, Event } from '~/models/events.server';
import Heading from '~/components/Heading';
import i18nServer from '~/modules/i18n.server';
import { useTranslation } from 'react-i18next';

export const handle = {
  i18n: ['EventIndexRoute'],
};

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request, 'EventIndexRoute');
  const events: Event[] = await getEvents();

  return {
    events,
    metaTranslations: {
      title: t('Meta.Title'),
      description: t('Meta.Description'),
    },
  };
}

export const meta = ({ data }: Route.MetaArgs) => [
  {
    title: data.metaTranslations.title,
  },
  {
    name: 'description',
    content: data.metaTranslations.description,
  },
];

export default function EventsRoute() {
  const { t } = useTranslation('EventIndexRoute');
  const { events } = useLoaderData<typeof loader>();

  const localeDateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  };

  const localeTimeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  return (
    <>
      <div className="content">
        <Heading level={1}>{t('Title')}</Heading>

        <ul className="flex flex-col gap-4">
          {events.map((event) => (
            <li key={event.id}>
              <Link
                className="flex flex-row gap-4"
                to={`/evenementen/${event.id}`}
              >
                <img
                  src={
                    event.imageUrl ?
                      `/afbeelding/${event.imageUrl}`
                    : '/illustraties/placeholder.png'
                  }
                  alt={event.imageAlt || event.title.nl}
                  className="w-[10rem] h-[10rem] object-cover"
                />

                <div className="w-full flex flex-col">
                  <Heading level={4}>{event.title.nl}</Heading>
                  {event.organiser ?
                    <p className="text-sm text-gray-500">{event.organiser}</p>
                  : null}
                  <p>
                    {event.eventDate.toLocaleDateString(
                      'nl',
                      localeDateOptions,
                    )}{' '}
                    om{' '}
                    {event.eventDate.toLocaleTimeString(
                      'nl',
                      localeTimeOptions,
                    )}
                  </p>
                  <p>{event.address}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
