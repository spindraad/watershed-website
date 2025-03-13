import { Project } from '@prisma/client';
import { prisma } from '~/.server/db';
import type { ContentTableItem } from '~/components/ContentTable';

export type { Project };

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany();
}

export async function deleteProject(projectID: string): Promise<void> {
  await prisma.project.delete({ where: { id: projectID } });
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
