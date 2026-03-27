import { CandyShopItem, Prisma } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { CandyShopItemValidator } from '~/validations/models/candyShopItem';

export type { CandyShopItem };
export type SerializedCandyShopItem = Omit<
  CandyShopItem,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string;
};

export async function getCandyShopItems(
  max?: number,
): Promise<CandyShopItem[]> {
  return prisma.candyShopItem.findMany({
    take: max,
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });
}

export async function getCandyShopItem(id: string): Promise<CandyShopItem> {
  return prisma.candyShopItem.findUniqueOrThrow({
    where: { id },
    include: { category: true },
  });
}

export async function deleteCandyShopItem(id: string): Promise<void> {
  await prisma.candyShopItem.delete({ where: { id } });
}

export async function saveCandyShopItem(
  item: CandyShopItemValidator,
): Promise<CandyShopItem> {
  const { content, image, ...data } = item;

  const createData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
  } as Prisma.CandyShopItemUncheckedCreateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    createData.content = content;
  }

  return prisma.candyShopItem.create({ data: createData });
}

export async function updateCandyShopItem(
  id: string,
  item: CandyShopItemValidator,
): Promise<CandyShopItem> {
  const { content, image, ...data } = item;

  const updateData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
  } as Prisma.CandyShopItemUncheckedUpdateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    updateData.content = content;
  }

  return prisma.candyShopItem.update({ where: { id }, data: updateData });
}

export function convertCandyShopItemsToTableData(
  items: CandyShopItem[],
): ContentTableItem[] {
  return items.map((item) => ({
    id: item.id,
    title: { value: item.title, isName: true },
  }));
}
