import { Page } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';

export function getPages() {
  return prisma.page.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export function getPageBySlug(slug: string) {
  return prisma.page.findFirstOrThrow({
    where: {
      slug,
    },
  });
}

export function convertPagesToTableData(pages: Page[]): ContentTableItem[] {
  return pages.map((page) => ({
    id: page.id,
    title: { value: page.title, isName: true },
    slug: page.slug,
    createdAt: page.createdAt,
  }));
}
