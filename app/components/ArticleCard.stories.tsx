import type { Meta, StoryObj } from '@storybook/react';
import { faker } from '@faker-js/faker';
import ArticleCard, { Props } from './ArticleCard';
import { convertDateToLocaleString } from '~/utils/date';
import { Tag } from '@prisma/client';

export default {
  title: 'Components/News Article Card',
  component: ArticleCard,
} satisfies Meta<typeof ArticleCard>;

type Story = StoryObj<typeof ArticleCard>;

const tags = Array.from({ length: 3 }).map<Tag>(() => ({
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
  contentRelationId: '',
  slug: faker.lorem.slug(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
}));

export const SingleArticle: Story = {
  args: {
    imageUrl: faker.image.urlPicsumPhotos(),
    imageAlt: faker.lorem.sentence(),
    title: faker.lorem.sentence(),
    summary: faker.lorem.paragraph(),
    slug: faker.lorem.slug(),
    date: convertDateToLocaleString(faker.date.past()),
    tags,
  },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
};

export const SingleArticleWithoutImage: Story = {
  args: {
    imageAlt: faker.lorem.sentence(),
    title: faker.lorem.sentence(),
    summary: faker.lorem.paragraph({ min: 1, max: 2 }),
    slug: faker.lorem.slug(),
    date: convertDateToLocaleString(faker.date.past()),
    tags,
  },
  decorators: [(Story) => <div className="w-96">{Story()}</div>],
};

export const MultipleArticles: Story = {
  render() {
    const articles = Array.from({ length: 9 }).map<Props>(() => ({
      imageUrl: faker.image.urlPicsumPhotos({
        width: 700,
        height: 900,
        blur: 0,
      }),
      imageAlt: faker.lorem.sentence(),
      title: faker.lorem.sentence(),
      summary: faker.lorem.paragraph({ min: 1, max: 2 }),
      slug: faker.lorem.slug(),
      date: convertDateToLocaleString(faker.date.past()),
      tags,
    }));

    return (
      <div className="grid grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <ArticleCard key={index} {...article} />
        ))}
      </div>
    );
  },
};
