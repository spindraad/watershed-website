import { Project } from '@prisma/client';
import { prisma } from '~/.server/db';
import type { ContentTableItem } from '~/components/ContentTable';

export type { Project };

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany();
}

export function convertProjectsToTableData(
  projects: Project[],
): ContentTableItem[] {
  return projects.map((project) => ({
    id: project.id,
    project: project.description,
    description: project.description,
  }));
}
