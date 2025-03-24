import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import EventMutationForm from 'app/components/EventMutationForm';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';
import { validateEvent } from '~/validations/models/event';
import { expect, screen, userEvent, waitFor, within } from '@storybook/test';
import { SlButton } from '@shoelace-style/shoelace/dist/shoelace.js';

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

  play: async ({ canvasElement }) => {
    await waitFor(() =>
      Promise.allSettled([
        customElements.whenDefined('sl-button'),
        customElements.whenDefined('sl-input'),
      ]),
    );

    await new Promise((resolve) => setTimeout(resolve, 0));
    const form = canvasElement.querySelector('form') as HTMLFormElement;

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
    await expect(formData.get('eventDate')).toBe(fakeEvent.eventDate);
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
    eventDate: faker.date.future().toISOString(),
  },

  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
        action: async ({ request }) => {
          const r = await validateEvent(request);
          console.log(r);
          return r;
        },
      },
    }),
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() =>
      Promise.allSettled([
        customElements.whenDefined('sl-button'),
        customElements.whenDefined('sl-input'),
      ]),
    );

    const submit = screen.getByText('Save');

    if (!submit) {
      throw new Error('Submit button not found');
    }

    submit.click();

    await waitFor(() => {
      expect(canvas.getByText('Invalid datetime')).toBeInTheDocument();
      expect(
        canvas.getByText('String must contain at least 1 character(s)'),
      ).toBeInTheDocument();
    });
  },
};
