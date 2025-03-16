import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import ProjectMutationForm from './ProjectMutationForm';

export default {
  title: 'Components/Project Mutation Form',
  component: ProjectMutationForm,
} satisfies Meta<typeof ProjectMutationForm>;

type Story = StoryObj<typeof ProjectMutationForm>;

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
      en: faker.lorem.paragraphs({ min: 2, max: 5 }),
      nl: faker.lorem.paragraphs({ min: 2, max: 5 }),
      pap: faker.lorem.paragraphs({ min: 2, max: 5 }),
    },
    summary: {
      en: faker.lorem.paragraph(),
      nl: faker.lorem.paragraph(),
      pap: faker.lorem.paragraph(),
    },
    slug: faker.lorem.slug(),
  },
};

export const ErrorForm: Story = {
  args: {
    title: {
      en: faker.lorem.words(),
      nl: faker.lorem.words(),
      pap: faker.lorem.words(),
    },
    description: {
      en: faker.lorem.paragraphs({ min: 2, max: 5 }),
      nl: faker.lorem.paragraphs({ min: 2, max: 5 }),
      pap: faker.lorem.paragraphs({ min: 2, max: 5 }),
    },
    summary: {
      en: faker.lorem.paragraph(),
      nl: faker.lorem.paragraph(),
      pap: faker.lorem.paragraph(),
    },
    slug: faker.lorem.slug(),
  },

  parameters: {
    reactRouter: {
      routing: {
        path: '/',
        action: async () => {
          return {
            errors: {
              title: ['Title is required'],
              description: ['Description is required'],
              summary: ['Summary is required'],
              slug: ['Slug is required'],
            },
          };
        },
      },
    },
  },
};
