import type { Route } from './+types/_events';
import { Link, useLoaderData } from 'react-router';
import { getEvents } from '~/models/events.server';
import Heading from '~/components/Heading';
import i18nServer from '~/modules/i18n.server';
import { useTranslation } from 'react-i18next';

export const handle = {
  i18n: ['EventIndexRoute'],
};

export async function loader({ request }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request, 'EventIndexRoute');
  const events = await getEvents();

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
  return (
    <>
      <div className="content">
        <Heading level={1}>{t('Title')}</Heading>

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
