import { TalentProgram, Prisma } from '@prisma/client';
import { prisma } from '~/.server/db';
import { type ContentTableItem } from '~/components/ContentTable';
import { TalentProgramValidator } from '~/validations/models/talentProgram';

export type { TalentProgram };
export type SerializedTalentProgram = Omit<
  TalentProgram,
  'createdAt' | 'updatedAt'
> & {
  createdAt: string;
  updatedAt: string;
};

export async function getTalentPrograms(
  max?: number,
): Promise<TalentProgram[]> {
  return prisma.talentProgram.findMany({
    take: max,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getTalentProgram(id: string): Promise<TalentProgram> {
  return prisma.talentProgram.findUniqueOrThrow({ where: { id } });
}

export async function deleteTalentProgram(id: string): Promise<void> {
  await prisma.talentProgram.delete({ where: { id } });
}

export async function saveTalentProgram(
  program: TalentProgramValidator,
): Promise<TalentProgram> {
  const { makerIds, content, image, ...data } = program;
  const makers = makerIds ? makerIds.split(',').filter(Boolean) : [];

  const createData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
    makers: {
      connect: makers.map((id) => ({ id })),
    },
  } as Prisma.TalentProgramCreateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    createData.content = content;
  }

  return prisma.talentProgram.create({ data: createData });
}

export async function updateTalentProgram(
  id: string,
  program: TalentProgramValidator,
): Promise<TalentProgram> {
  const { makerIds, content, image, ...data } = program;
  const makers = makerIds ? makerIds.split(',').filter(Boolean) : [];

  const updateData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
    makers: {
      set: makers.map((makerId) => ({ id: makerId })),
    },
  } as Prisma.TalentProgramUpdateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    updateData.content = content;
  }

  return prisma.talentProgram.update({ where: { id }, data: updateData });
}

export function convertTalentProgramsToTableData(
  programs: TalentProgram[],
): ContentTableItem[] {
  return programs.map((program) => ({
    id: program.id,
    title: { value: program.title, isName: true },
    duration: program.duration || '-',
  }));
}
