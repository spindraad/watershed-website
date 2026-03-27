import { Rubriek, Prisma } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { RubriekValidator } from '~/validations/models/rubriek';

export type { Rubriek };
export type SerializedRubriek = Omit<Rubriek, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export async function getRubrieken(max?: number): Promise<Rubriek[]> {
  return prisma.rubriek.findMany({
    take: max,
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });
}

export async function getRubriek(id: string): Promise<Rubriek> {
  return prisma.rubriek.findUniqueOrThrow({
    where: { id },
    include: { category: true },
  });
}

export async function deleteRubriek(id: string): Promise<void> {
  await prisma.rubriek.delete({ where: { id } });
}

export async function saveRubriek(rubriek: RubriekValidator): Promise<Rubriek> {
  const { content, image, ...data } = rubriek;

  const createData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
  } as Prisma.RubriekUncheckedCreateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    createData.content = content;
  }

  return prisma.rubriek.create({ data: createData });
}

export async function updateRubriek(
  id: string,
  rubriek: RubriekValidator,
): Promise<Rubriek> {
  const { content, image, ...data } = rubriek;

  const updateData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
  } as Prisma.RubriekUncheckedUpdateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    updateData.content = content;
  }

  return prisma.rubriek.update({ where: { id }, data: updateData });
}

export function convertRubriekenToTableData(
  rubrieken: Rubriek[],
): ContentTableItem[] {
  return rubrieken.map((rubriek) => ({
    id: rubriek.id,
    title: { value: rubriek.title, isName: true },
  }));
}
