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
  project: {
    value: faker.commerce.productName(),
    isIndex: true,
    linkUrl: index,
  },
  description: faker.commerce.productDescription(),
  location: faker.location.streetAddress(),
}));

export const Default: Story = {
  args: {
    items,
  },
};
