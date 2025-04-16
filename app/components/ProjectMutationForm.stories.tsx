import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import ProjectMutationForm from './ProjectMutationForm';
import { expect, screen } from '@storybook/test';
import { validateProject } from '~/validations/models/project';
import { reactRouterParameters } from 'storybook-addon-remix-react-router';

export default {
  title: 'Forms/Project Mutation Form',
  component: ProjectMutationForm,
  tags: ['components', 'content'],
} satisfies Meta<typeof ProjectMutationForm>;

type Story = StoryObj<typeof ProjectMutationForm>;

const fakeProject = {
  title: {
    en: faker.lorem.words(),
    nl: faker.lorem.words(),
    pap: faker.lorem.words(),
  },
  description: {
    en: faker.lorem.paragraph({ min: 2, max: 4 }),
    nl: faker.lorem.paragraph({ min: 2, max: 4 }),
    pap: faker.lorem.paragraph({ min: 2, max: 4 }),
  },
  summary: {
    en: faker.lorem.paragraph(),
    nl: faker.lorem.paragraph(),
    pap: faker.lorem.paragraph(),
  },
  slug: faker.lorem.slug(),
};

export const EmptyForm: Story = {
  args: {},
};

export const FilledForm: Story = {
  args: fakeProject,

  play: async () => {
    await screen.findByText('Save');
    const form = (await screen.findByRole('form')) as HTMLFormElement;

    const formData = new FormData(form);

    await expect(formData.get('title.en')).toBe(fakeProject.title.en);
    await expect(formData.get('title.nl')).toBe(fakeProject.title.nl);
    await expect(formData.get('title.pap')).toBe(fakeProject.title.pap);

    await expect(formData.get('description.en')).toBe(
      fakeProject.description.en,
    );
    await expect(formData.get('description.nl')).toBe(
      fakeProject.description.nl,
    );
    await expect(formData.get('description.pap')).toBe(
      fakeProject.description.pap,
    );

    await expect(formData.get('summary.en')).toBe(fakeProject.summary.en);
    await expect(formData.get('summary.nl')).toBe(fakeProject.summary.nl);
    await expect(formData.get('summary.pap')).toBe(fakeProject.summary.pap);

    await expect(formData.get('slug')).toBe(fakeProject.slug);
  },
};

export const ErrorForm: Story = {
  args: {
    title: {
      en: faker.lorem.words(),
      pap: faker.lorem.words(),
    },
    description: {
      nl: faker.lorem.paragraphs({ min: 2, max: 5 }),
      pap: faker.lorem.paragraphs({ min: 2, max: 5 }),
    },
    summary: {
      en: faker.lorem.paragraph(),
      nl: faker.lorem.paragraph(),
    },
  },

  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/',
        action: async ({ request }) => {
          return validateProject(request);
        },
      },
    }),
  },

  play: async () => {
    const submit = await screen.findByText('Save');

    submit.click();

    screen.findAllByText('String must contain at least 1 character(s)');
  },
};
