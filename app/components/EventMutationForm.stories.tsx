import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import EventMutationForm from './EventMutationForm';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';
import { validateEvent } from '~/validations/models/event';
import { expect, screen } from '@storybook/test';

export default {
  title: 'Components/Event Mutation Form',
  component: EventMutationForm,
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
  eventDate: faker.date.future(),
};

export const EmptyForm: Story = {
  args: {},
};

export const FilledForm: Story = {
  args: fakeEvent,

  play: async () => {
    await screen.findByText('Save');
    const form = (await screen.findByRole('form')) as HTMLFormElement;

    const formData = new FormData(form);

    await expect(formData.get('title.en')).toBe(fakeEvent.title.en);
    await expect(formData.get('title.nl')).toBe(fakeEvent.title.nl);
    await expect(formData.get('title.pap')).toBe(fakeEvent.title.pap);

    await expect(formData.get('description.en')).toBe(fakeEvent.description.en);
    await expect(formData.get('description.nl')).toBe(fakeEvent.description.nl);
    await expect(formData.get('description.pap')).toBe(
      fakeEvent.description.pap,
    );

    await expect(formData.get('address')).toBe(fakeEvent.address);
    await expect(formData.get('eventDate')).toBe(
      fakeEvent.eventDate.toISOString(),
    );
    await expect(formData.get('link')).toBe(fakeEvent.link);
  },
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

  play: async () => {
    const submit = await screen.findByText('Save');

    submit.click();

    screen.findByText('Invalid datetime');
    screen.findByText('String must contain at least 1 character(s)');
  },
};
