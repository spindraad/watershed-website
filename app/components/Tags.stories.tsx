import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import Tags from './Tags';

export default {
  title: 'Components/Tags',
  component: Tags,
} satisfies Meta<typeof Tags>;

type Story = StoryObj<typeof Tags>;

export const SingleTag: Story = {
  args: {
    tags: [
      {
        id: '1',
        name: {
          nl: faker.lorem.word(),
          en: faker.lorem.word(),
          pap: faker.lorem.word(),
        },
        description: {
          nl: faker.lorem.sentence(),
          en: faker.lorem.sentence(),
          pap: faker.lorem.sentence(),
        },
        slug: faker.lorem.slug(),
      },
    ],
  },
};

export const MultipleTags: Story = {
  render() {
    const tags = Array.from({ length: 5 }).map(() => ({
      id: faker.string.uuid(),
      name: {
        nl: faker.lorem.word(),
        en: faker.lorem.word(),
        pap: faker.lorem.word(),
      },
      description: {
        nl: faker.lorem.sentence(),
        en: faker.lorem.sentence(),
        pap: faker.lorem.sentence(),
      },
      slug: faker.lorem.slug(),
    }));

    return <Tags tags={tags} />;
  },
};
