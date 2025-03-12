import type { Meta, StoryObj } from '@storybook/react';
import { fakerNL as faker } from '@faker-js/faker';
import ContentTable, { ContentTableItem } from './ContentTable';

export default {
  title: 'Components/Content Table',
  component: ContentTable,
} satisfies Meta<typeof ContentTable>;

type Story = StoryObj<typeof ContentTable>;

const items: ContentTableItem[] = Array.from({ length: 5 }, (_, index) => ({
  id: index,
  project: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  releaseDate: faker.date.recent(),
}));

export const Default: Story = {
  args: {
    items,
  },
};
