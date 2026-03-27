import { z } from 'zod';
import { Data, ErrorValidation, SuccessValidation } from '~/types/Validations';
import { transformFormData } from '~/utils/content';

const localisedStringValidations = z.object({
  nl: z.string().min(1),
  en: z.string().min(1),
  pap: z.string().min(1),
});

const localisedHtmlValidations = z.object({
  nl: z.string().optional(),
  en: z.string().optional(),
  pap: z.string().optional(),
});

const imageValidations = z.object({
  url: z.string().min(1),
  alt: z.string().optional(),
});

export const projectValidator = z.object({
  title: localisedStringValidations,
  description: localisedStringValidations,
  summary: localisedStringValidations,
  slug: z.string().min(1),
  image: imageValidations.optional(),
  content: localisedHtmlValidations.optional(),
  makerIds: z.string().optional(),
});

export type ProjectValidator = z.infer<typeof projectValidator>;
export type ProjectErrors = z.inferFormattedError<typeof projectValidator>;

export async function validateProject(
  request: Request,
): Promise<
  SuccessValidation<ProjectValidator> | ErrorValidation<ProjectValidator>
> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformFormData(formData);

  const result = projectValidator.safeParse(transformedData);

  if (result.success) {
    return result as SuccessValidation<ProjectValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<ProjectValidator>,
  } as ErrorValidation<ProjectValidator>;
}
