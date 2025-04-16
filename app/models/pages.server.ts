// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// TODO: Fix the pageValidator type so that we can check the save and update functions
import { Page } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { PageValidator } from '~/validations/models/page';
import { SupportedLanguages } from '~/config/i18n';
import { WatershedPageData } from '~/config/puck.config';

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

export async function deletePage(id: string) {
  await prisma.page.delete({
    where: {
      id,
    },
  });
}

export function convertPagesToTableData(
  pages: Page[],
  locale: SupportedLanguages,
): ContentTableItem[] {
  return pages.map((page) => ({
    id: page.id,
    title: {
      value: {
        en: (page.content.en as WatershedPageData).root.props?.title ?? '',
        nl: (page.content.nl as WatershedPageData).root.props?.title ?? '',
        pap: (page.content.pap as WatershedPageData).root.props?.title ?? '',
      },
      isName: true,
    },
    description:
      (page.content[locale] as WatershedPageData).root.props?.summary ?? '',
    slug: page.slug,
    createdAt: page.createdAt,
  }));
}
