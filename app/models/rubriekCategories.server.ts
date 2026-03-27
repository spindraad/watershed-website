import { RubriekCategory } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { RubriekCategoryValidator } from '~/validations/models/rubriekCategory';

export type { RubriekCategory };
export type SerializedRubriekCategory = Omit<
  RubriekCategory,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string;
};

export async function getRubriekCategories(
  max?: number,
): Promise<RubriekCategory[]> {
  return prisma.rubriekCategory.findMany({
    take: max,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getRubriekCategory(id: string): Promise<RubriekCategory> {
  return prisma.rubriekCategory.findUniqueOrThrow({ where: { id } });
}

export async function deleteRubriekCategory(id: string): Promise<void> {
  await prisma.rubriekCategory.delete({ where: { id } });
}

export async function saveRubriekCategory(
  category: RubriekCategoryValidator,
): Promise<RubriekCategory> {
  return prisma.rubriekCategory.create({ data: category });
}

export async function updateRubriekCategory(
  id: string,
  category: RubriekCategoryValidator,
): Promise<RubriekCategory> {
  return prisma.rubriekCategory.update({ where: { id }, data: category });
}

export function convertRubriekCategoriesToTableData(
  categories: RubriekCategory[],
): ContentTableItem[] {
  return categories.map((category) => ({
    id: category.id,
    title: { value: category.title, isName: true },
  }));
}
