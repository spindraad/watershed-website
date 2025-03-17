import { z } from 'zod';
import {
  ErrorData,
  ErrorValidation,
  SuccessValidation,
} from '~/types/Validations';

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
): Promise<
  SuccessValidation<ProjectValidator> | ErrorValidation<ProjectValidator>
> {
  const clonedRequest = request.clone();
  const formData = Object.fromEntries(await clonedRequest.formData());

  const result = projectValidator.safeParse(formData);

  if (result.success) {
    return result as SuccessValidation<ProjectValidator>;
  }

  return {
    ...result,
    data: formData as ErrorData<ProjectValidator>,
  } as ErrorValidation<ProjectValidator>;
}
