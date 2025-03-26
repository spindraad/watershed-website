import { Project } from '@prisma/client';
import { prisma } from '~/.server/db';
import type { ContentTableItem } from '~/components/ContentTable';
import { ProjectValidator } from '~/validations/models/project';

export type { Project };

export async function getProjects(): Promise<Project[]> {
  return prisma.project.findMany();
}

export async function getProject(projectID: string): Promise<Project> {
  return prisma.project.findUniqueOrThrow({ where: { id: projectID } });
}

export async function deleteProject(projectID: string): Promise<void> {
  await prisma.project.delete({ where: { id: projectID } });
}

export async function saveProject(project: ProjectValidator): Promise<Project> {
  return prisma.project.create({ data: project });
}

export async function updateProject(
  projectID: string,
  project: ProjectValidator,
): Promise<Project> {
  return prisma.project.update({ where: { id: projectID }, data: project });
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
