import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import EventSummary from './EventSummary';

export default {
  title: 'Organisms/Event Summary',
  component: EventSummary,
  tags: ['components', 'events'],
  decorators: [(Story) => <div className="w-1/3">{Story()}</div>],
} satisfies Meta<typeof EventSummary>;

type Story = StoryObj<typeof EventSummary>;

export const Default: Story = {
  args: {
    summary: {
      en: faker.lorem.paragraph(),
      nl: faker.lorem.paragraph(),
      pap: faker.lorem.paragraph(),
    },
    slug: faker.lorem.slug(),
    date: faker.date.future(),
    address: faker.location.streetAddress(),
  },
};
