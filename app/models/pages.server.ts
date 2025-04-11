import { Page } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { PageValidator } from '~/validations/models/page';
import { SupportedLanguages } from '~/config/i18n';

export function getPages() {
  return prisma.page.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export function getPage(id: string) {
  return prisma.page.findFirstOrThrow({
    where: {
      id,
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

export function savePage(page: PageValidator) {
  return prisma.page.create({
    data: page,
  });
}

export function updatePage(id: string, page: PageValidator) {
  return prisma.page.update({
    where: {
      id,
    },
    data: page,
  });
}

export function convertPagesToTableData(
  pages: Page[],
  locale: SupportedLanguages,
): ContentTableItem[] {
  return pages.map((page) => ({
    id: page.id,
    title: { value: page.content[locale].root.props.title, isName: true },
    description: page.content[locale].root.props.summary,
    slug: page.slug,
    createdAt: page.createdAt,
  }));
}
