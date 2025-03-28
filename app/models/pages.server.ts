import { prisma } from '~/.server/db';

export function getPageBySlug(slug: string) {
  return prisma.page.findFirstOrThrow({
    where: {
      slug,
    },
  });
}
