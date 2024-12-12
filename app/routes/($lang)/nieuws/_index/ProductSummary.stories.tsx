import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import ProductSummary from './ProductSummary';

export default {
  title: 'Components/Product Summary',
  component: ProductSummary,
} satisfies Meta<typeof ProductSummary>;

type Story = StoryObj<typeof ProductSummary>;

export const Default: Story = {
  args: {
    imageUrl: faker.image.urlPicsumPhotos({ width: 1024, blur: 0 }),
    imageAlt: faker.lorem.sentence(),
    creator: faker.person.fullName(),
    language: faker.helpers.arrayElement([
      'Engels',
      'Nederlands',
      'Papiamentu',
    ]),
    slug: faker.lorem.slug(),
    summary: {
      en: faker.lorem.paragraph(),
      nl: faker.lorem.paragraph(),
      pap: faker.lorem.paragraph(),
    },
  },
};
