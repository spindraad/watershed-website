import { z } from 'zod';

export const projectValidator = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  summary: z.string().min(1),
  slug: z.string().min(1),
});

export type ProjectValidator = z.infer<typeof projectValidator>;
export type ProjectErrors = z.inferFlattenedErrors<
  typeof projectValidator
>['fieldErrors'];

export async function validateProject(
  request: Request,
): Promise<ProjectValidator> {
  const clonedRequest = request.clone();
  const formData = Object.fromEntries(await clonedRequest.formData());

  return projectValidator.parse(formData);
}
