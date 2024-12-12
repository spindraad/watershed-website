import { prisma } from '~/.server/db';
import { convertDateToLocaleString } from '~/utils/date';

export async function getNewsArticlesForOverview() {
  const result = await prisma.newsArticle.findMany({
    select: {
      title: true,
      imageUrl: true,
      imageAlt: true,
      summary: true,
      slug: true,
      createdAt: true,
      contentRelation: {
        select: {
          tags: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });

  return result.map((article) => ({
    title: article.title,
    imageUrl: article.imageUrl,
    imageAlt: article.imageAlt,
    summary: article.summary,
    slug: article.slug,
    date: convertDateToLocaleString(article.createdAt),
    tags: article.contentRelation?.tags,
  }));
}
