import type { Route } from './+types/_event-detail';
import { getEvent } from '~/models/events.server';
import { useLoaderData } from 'react-router';
import { useTranslation } from 'react-i18next';
import Heading from '~/components/Heading';
import {
  convertDateToLocaleString,
  convertTimeToLocaleString,
} from '~/utils/date';
import { SupportedLanguages } from '~/config/i18n';
import i18nServer from '~/modules/i18n.server';

export async function loader({ request, params }: Route.LoaderArgs) {
  const t = await i18nServer.getFixedT(request, 'EventDetailRoute');
  const { eventId } = params;

  const event = await getEvent(eventId);

  return {
    event,
    metaTranslations: {
      title: t('Meta.Title', {
        title: event.title.nl,
      }),
      description: t('Meta.Description', {
        description: event.description.nl,
      }),
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

export default function EventDetailRoute() {
  const { event } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  const content = {
    __html: event.description[i18n.language as SupportedLanguages],
  };

  const datetime = `${convertDateToLocaleString(event.eventDate)} ${convertTimeToLocaleString(event.eventDate)}`;

  return (
    <>
      <div className="content space-y-4">
        <Heading level={1}>
          {event.title[i18n.language as SupportedLanguages]}
        </Heading>
        <p className="flex flex-row gap-4">
          <span>{datetime}</span>
          <span>{event.address}</span>
        </p>

        <div className="prose prose-2xl" dangerouslySetInnerHTML={content} />
      </div>
    </>
  );
}
