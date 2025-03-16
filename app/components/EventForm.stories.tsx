import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import EventForm from './EventForm';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

export default {
  title: 'Components/Event Form',
  component: EventForm,
} satisfies Meta<typeof EventForm>;

type Story = StoryObj<typeof EventForm>;

export const EmptyForm: Story = {
  args: {},
};

export const FilledForm: Story = {
  args: {
    title: {
      en: faker.lorem.words(),
      nl: faker.lorem.words(),
      pap: faker.lorem.words(),
    },
    description: {
      en: faker.lorem.paragraph(),
      nl: faker.lorem.paragraph(),
      pap: faker.lorem.paragraph(),
    },
    address: `${faker.location.streetAddress()} ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`,
    link: faker.internet.url(),
    eventDate: faker.date.future(),
  },
};

export const ErrorForm: Story = {
  args: {
    link: faker.internet.url(),
  },

  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
        action: async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return {
            errors: {
              title: ['Title is required'],
              description: ['Description is required'],
              address: ['Address is required'],
              link: ['Link is required'],
              eventDate: ['Event date is required'],
            },
          };
        },
      },
    }),
  },
};
