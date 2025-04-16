import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import ArtistsSummary from './ArtistsSummary';
import { Props as ArtistProfileSummaryProps } from './ArtistProfileSummary';

export default {
  title: 'Organisms/Artists Summary',
  component: ArtistsSummary,
  tags: ['components', 'artists'],
} satisfies Meta<typeof ArtistsSummary>;

type Story = StoryObj<typeof ArtistsSummary>;

const createArtists = (amount: number) => {
  return Array.from({ length: amount }).map<ArtistProfileSummaryProps>(() => ({
    imageUrl: faker.image.urlPicsumPhotos({ width: 512, height: 512, blur: 0 }),
    name: faker.person.fullName(),
    profession: faker.person.jobType(),
    summary: {
      en: faker.person.bio(),
      nl: faker.person.bio(),
      pap: faker.person.bio(),
    },
    slug: faker.lorem.slug(),
  }));
};

export const SingleArtistSummary: Story = {
  args: {
    artists: createArtists(1),
  },
};

export const MultipleArtistSummaries: Story = {
  args: {
    artists: createArtists(3),
  },
};
