import { CandyShopCategory } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { CandyShopCategoryValidator } from '~/validations/models/candyShopCategory';

export type { CandyShopCategory };
export type SerializedCandyShopCategory = Omit<
  CandyShopCategory,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string;
};

export async function getCandyShopCategories(
  max?: number,
): Promise<CandyShopCategory[]> {
  return prisma.candyShopCategory.findMany({
    take: max,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getCandyShopCategory(
  id: string,
): Promise<CandyShopCategory> {
  return prisma.candyShopCategory.findUniqueOrThrow({ where: { id } });
}

export async function deleteCandyShopCategory(id: string): Promise<void> {
  await prisma.candyShopCategory.delete({ where: { id } });
}

export async function saveCandyShopCategory(
  category: CandyShopCategoryValidator,
): Promise<CandyShopCategory> {
  return prisma.candyShopCategory.create({ data: category });
}

export async function updateCandyShopCategory(
  id: string,
  category: CandyShopCategoryValidator,
): Promise<CandyShopCategory> {
  return prisma.candyShopCategory.update({ where: { id }, data: category });
}

export function convertCandyShopCategoriesToTableData(
  categories: CandyShopCategory[],
): ContentTableItem[] {
  return categories.map((category) => ({
    id: category.id,
    title: { value: category.title, isName: true },
  }));
}
