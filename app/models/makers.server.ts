import { Maker } from '@prisma/client';
import { prisma } from '~/.server/db';

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
