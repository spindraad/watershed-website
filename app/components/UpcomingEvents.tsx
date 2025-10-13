import Heading from '~/components/Heading';
import Icon from '~/components/Icon';
import type { Event } from '~/models/events.server';

export type UpcomingEventDetails = Pick<
  Event,
  'id' | 'title' | 'organiser' | 'eventDate' | 'image'
>;

type Props = {
  events: UpcomingEventDetails[];
};

export default function UpcomingEvents({ events }: Props) {
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <Icon name="heading-arrow" />
          <Heading level={2}>coming UP</Heading>
        </div>

        <Gimmick />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {events.map((event) => (
          <div key={event.id} className="flex flex-col gap-2">
            <img
              src={`/afbeelding/${event.image}`}
              alt={event.title.en}
              className="w-24 h-auto rounded-lg"
            />
            <h3 className="text-xl font-bold">{event.title.en}</h3>
            {event.organiser && (
              <p className="text-sm text-gray-500">{event.organiser}</p>
            )}
            <p className="text-sm text-gray-500">
              {event.eventDate.toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Gimmick() {
  return (
    <div className="relative">
      <span
        style={{
          position: 'absolute',
          top: -50,
          right: 0,
          display: 'inline-block',
          width: 180,
          height: 180,
          backgroundImage: 'url(/illustraties/event-gimmick.svg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
}
