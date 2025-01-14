import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import ArtistProfileSummary from './ArtistProfileSummary';

export default {
  title: 'Components/Artist Profile Summary',
  component: ArtistProfileSummary,
} satisfies Meta<typeof ArtistProfileSummary>;

type Story = StoryObj<typeof ArtistProfileSummary>;

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
