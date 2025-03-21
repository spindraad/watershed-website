import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import EventMutationForm from 'app/components/EventMutationForm';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';
import {
  EventErrors,
  EventValidator,
  eventValidator,
  validateEvent,
} from '~/validations/models/event';
import { ErrorResponse } from '~/types/Validations';

export default {
  title: 'Components/Event Mutation Form',
  component: EventMutationForm,
  render(args) {
    localStorage.removeItem('eventContent');
    return <EventMutationForm {...args} />;
  },
} satisfies Meta<typeof EventMutationForm>;

type Story = StoryObj<typeof EventMutationForm>;

const fakeEvent = {
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
  eventDate: faker.date.future().toISOString(),
};

export const EmptyForm: Story = {
  args: {},
};

export const FilledForm: Story = {
  args: fakeEvent,
};

export const ErrorForm: Story = {
  args: {
    title: {
      en: faker.lorem.words(),
      pap: faker.lorem.words(),
    },
    description: {
      nl: faker.lorem.paragraph(),
      pap: faker.lorem.paragraph(),
    },
    address: `${faker.location.streetAddress()} ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`,
    link: faker.internet.url(),
    eventDate: faker.date.future(),
  },

  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
        action: async ({ request }) => {
          return validateEvent(request);
        },
      },
    }),
  },
};

export const LocalStoragePreFilledForm: Story = {
  render() {
    localStorage.setItem('eventContent', JSON.stringify(fakeEvent));
    return <EventMutationForm />;
  },
};
