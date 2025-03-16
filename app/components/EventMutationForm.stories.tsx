import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import EventMutationForm from 'app/components/EventMutationForm';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

export default {
  title: 'Components/Event Mutation Form',
  component: EventMutationForm,
} satisfies Meta<typeof EventMutationForm>;

type Story = StoryObj<typeof EventMutationForm>;

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
