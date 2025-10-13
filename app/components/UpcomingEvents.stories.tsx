import type { Meta, StoryObj } from '@storybook/react';
import UpcomingEvents, {
  UpcomingEventDetails,
} from '~/components/UpcomingEvents';

export default {
  title: 'Organisms/Upcoming Events',
  component: UpcomingEvents,
  tags: ['components', 'events', 'ui-styling'],
} satisfies Meta<typeof UpcomingEvents>;

type Story = StoryObj<typeof UpcomingEvents>;

const events: UpcomingEventDetails[] = [
  {
    id: '1',
    title: {
      nl: 'Buskeda in de bieb',
      en: 'Buskeda in the library',
      pap: 'Buskeda den bibi',
    },
    image: 'buskeda-milouska.png',
    organiser: 'Milouska Meulens',
    eventDate: new Date('2025-09-11T15:00:00Z'),
  },
  {
    id: '2',
    title: {
      nl: 'Echt gebeurd verhalenavond',
      en: 'True stories evening',
      pap: 'Verhalen di ta pasa',
    },
    image: 'echte-verhalen.png',
    organiser: null,
    eventDate: new Date('2025-09-11T17:00:00Z'),
  },
  {
    id: '3',
    title: {
      nl: 'Ik weet zeker dat het niet alleen mijn verhaal is',
      en: 'I am sure it is not only my story',
      pap: 'Mi ta sigur ku no so mi ta konta e historia',
    },
    image: 'ik-weet-zeker.png',
    organiser: 'Monique Hendriks',
    eventDate: new Date('2025-09-11T19:00:00Z'),
  },
];

export const Default: Story = {
  args: {
    events,
  },
};
