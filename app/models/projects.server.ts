import { Project, Prisma } from '@prisma/client';
import { prisma } from '~/.server/db';
import type { ContentTableItem } from '~/components/ContentTable';
import { ProjectValidator } from '~/validations/models/project';

export type { Project };

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany({
    include: { makers: true },
  });
}

export async function getProject(projectID: string): Promise<Project> {
  return prisma.project.findUniqueOrThrow({
    where: { id: projectID },
    include: { makers: true },
  });
}

export async function deleteProject(projectID: string): Promise<void> {
  await prisma.project.delete({ where: { id: projectID } });
}

export async function saveProject(project: ProjectValidator): Promise<Project> {
  const { image, content, makerIds, ...data } = project;
  const makers = makerIds ? makerIds.split(',').filter(Boolean) : [];

  const createData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
    makers: {
      connect: makers.map((id) => ({ id })),
    },
  } as Prisma.ProjectCreateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    createData.content = content;
  }

  return prisma.project.create({ data: createData });
}

export async function updateProject(
  projectID: string,
  project: ProjectValidator,
): Promise<Project> {
  const { image, content, makerIds, ...data } = project;
  const makers = makerIds ? makerIds.split(',').filter(Boolean) : [];

  const updateData = {
    ...data,
    imageUrl: image?.url,
    imageAlt: image?.alt,
    makers: {
      set: makers.map((id) => ({ id })),
    },
  } as Prisma.ProjectUpdateInput;

  if (content) {
    // @ts-expect-error - content is HTML strings, not Puck page data
    updateData.content = content;
  }

  return prisma.project.update({ where: { id: projectID }, data: updateData });
}

export function convertProjectsToTableData(
  projects: Project[],
): ContentTableItem[] {
  return projects.map((project) => ({
    id: project.id,
    project: { value: project.title, isName: true },
    description: project.description,
  }));
}
