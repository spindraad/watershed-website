import type { Meta, StoryObj } from '@storybook/react';
import { fakerEN, fakerNL, fakerEO } from '@faker-js/faker';
import ProjectSummary from './ProjectSummary';

export default {
  title: 'Components/Project Summary',
  component: ProjectSummary,
  decorators: [(Story) => <div className="w-1/3">{Story()}</div>],
} satisfies Meta<typeof ProjectSummary>;

type Story = StoryObj<typeof ProjectSummary>;

export const Default: Story = {
  args: {
    summary: {
      en: fakerEN.lorem.paragraph(),
      nl: fakerNL.lorem.paragraph(),
      pap: fakerEO.lorem.paragraph(),
    },
    slug: fakerEN.lorem.slug(),
  },
};
