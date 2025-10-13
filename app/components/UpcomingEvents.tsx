import Heading from '~/components/Heading';
import Icon from '~/components/Icon';
import type { Event } from '~/models/events.server';
import { useTranslation } from 'react-i18next';
import HandDrawnBox from '~/components/HandDrawnBox';
import PostItNote from '~/components/PostItNote';

export type UpcomingEventDetails = Pick<
  Event,
  'id' | 'title' | 'organiser' | 'eventDate' | 'image'
>;

type Props = {
  events: UpcomingEventDetails[];
};

export default function UpcomingEvents({ events }: Props) {
  const { t } = useTranslation('UpcomingEvents');

  const formatDate = (date: Date) =>
    date.toLocaleDateString('nl-NL', {
      weekday: 'short', // "wo"
      day: 'numeric', // "11"
      month: 'short', // "sept"
    });

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <Icon name="heading-arrow" />
          <Heading level={2} textSizeClass="text-xl">
            coming UP
          </Heading>
        </div>

        <Gimmick />
      </div>

      <ul className="grid grid-cols-[repeat(2,minmax(10vw,20rem))] gap-4 mt-8">
        <li className="w-36 sm:w-44 h-auto">
          <img
            src="/illustraties/ezel-ZW.png"
            alt={t('altTextIllustration')}
            className="w-full h-auto sm:w-44 sm:h-44"
          />
        </li>
        {events.map((event) => (
          <li key={event.id} className="w-36 h-auto flex flex-col gap-2">
            <HandDrawnBox drawStyle="dotted" padding="p-3" classes="relative">
              <img
                src={`/afbeelding/${event.image}`}
                alt={event.title.en}
                className="w-36 h-36 object-cover"
              />
              <PostItNote classes="absolute bottom-4 -right-4 text-xs">
                {formatDate(event.eventDate)}
              </PostItNote>
            </HandDrawnBox>
            <Heading level={3} textSizeClass="text-base" bold={false}>
              {event.title.en}
            </Heading>
            {event.organiser && (
              <p className="text-sm text-gray-500">{event.organiser}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Gimmick() {
  return (
    <div className="relative">
      <span
        style={{
          position: 'absolute',
          top: -30,
          right: -10,
          display: 'inline-block',
          width: 'min(20vw, 180px)',
          height: 'min(20vw, 180px)',
          backgroundImage: 'url(/illustraties/event-gimmick.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
