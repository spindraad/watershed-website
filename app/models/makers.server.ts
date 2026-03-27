import { Maker, Prisma } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { MakerValidator } from '~/validations/models/maker';

export type { Maker };
export type SerializedMaker = Omit<Maker, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export async function getMakers(max?: number): Promise<Maker[]> {
  return prisma.maker.findMany({
    take: max,
    orderBy: { name: 'asc' },
  });
}

export async function getMaker(slug: string): Promise<Maker> {
  return prisma.maker.findUniqueOrThrow({ where: { slug } });
}

export async function getMakerById(id: string): Promise<Maker> {
  return prisma.maker.findUniqueOrThrow({ where: { id } });
}

export async function deleteMaker(id: string): Promise<void> {
  await prisma.maker.delete({ where: { id } });
}

export async function saveMaker(maker: MakerValidator): Promise<Maker> {
  const { talentProgramIds, content, image, ...data } = maker;
  const programIds =
    talentProgramIds ? talentProgramIds.split(',').filter(Boolean) : [];

  const createData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
    talentPrograms: {
      connect: programIds.map((id) => ({ id })),
    },
  } as Prisma.MakerCreateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    createData.content = content;
  }

  return prisma.maker.create({ data: createData });
}

export async function updateMaker(
  id: string,
  maker: MakerValidator,
): Promise<Maker> {
  const { talentProgramIds, content, image, ...data } = maker;
  const programIds =
    talentProgramIds ? talentProgramIds.split(',').filter(Boolean) : [];

  const updateData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
    talentPrograms: {
      set: programIds.map((pid) => ({ id: pid })),
    },
  } as Prisma.MakerUpdateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    updateData.content = content;
  }

  return prisma.maker.update({ where: { id }, data: updateData });
}

export function convertMakersToTableData(makers: Maker[]): ContentTableItem[] {
  return makers.map((maker) => ({
    id: maker.id,
    title: { value: maker.name, isName: true },
    slug: maker.slug,
  }));
}
