import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import MakerProfileSummary from 'app/components/MakerProfileSummary';

export default {
  title: 'Organisms/Maker Profile Summary',
  component: MakerProfileSummary,
  tags: ['components', 'artists', 'makers'],
  parameters: {
    backgrounds: { default: 'Surface' },
  },
  decorators(Story) {
    return (
      <div className="w-full h-screen bg-surface">
        <div className="max-w-xs mx-auto">
          <Story />
        </div>
      </div>
    );
  },
} satisfies Meta<typeof MakerProfileSummary>;

type Story = StoryObj<typeof MakerProfileSummary>;

export const Default: Story = {
  args: {
    imageUrl: faker.image.urlPicsumPhotos({ width: 512, height: 512, blur: 0 }),
    name: faker.person.fullName(),
    profession: faker.person.jobType(),
    summary: {
      en: faker.person.bio(),
      nl: faker.person.bio(),
      pap: faker.person.bio(),
    },
    slug: faker.lorem.slug(),
  },
};
