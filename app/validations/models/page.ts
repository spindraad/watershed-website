import { z } from 'zod';
import { Data, ErrorValidation, SuccessValidation } from '~/types/Validations';
import { transformFormData } from '~/utils/content';

const localisedStringValidations = z.object({
  nl: z.string().min(1),
  en: z.string().min(1),
  pap: z.string().min(1),
});

export const pageValidator = z.object({
  title: localisedStringValidations,
  description: localisedStringValidations,
  content: localisedStringValidations,
  slug: z.string().min(1),
  // meta: z.array(
  //   z.object({
  //     name: localisedStringValidations,
  //     description: localisedStringValidations,
  //   }),
  // ),
});

export type PageValidator = z.infer<typeof pageValidator>;
export type PageErrors = z.inferFormattedError<typeof pageValidator>;

export async function validatePage(
  request: Request,
): Promise<SuccessValidation<PageValidator> | ErrorValidation<PageValidator>> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformFormData(formData);

  const result = pageValidator.safeParse(transformedData);

  if (result.success) {
    return result as SuccessValidation<PageValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<PageValidator>,
  } as ErrorValidation<PageValidator>;
}
