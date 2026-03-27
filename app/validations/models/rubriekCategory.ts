import { z } from 'zod';
import { SuccessValidation, ErrorValidation, Data } from '~/types/Validations';
import { transformFormData } from '~/utils/content';

const localisedStringValidations = z.object({
  nl: z.string().min(1),
  en: z.string().min(1),
  pap: z.string().min(1),
});

export const rubriekCategoryValidator = z.object({
  title: localisedStringValidations,
  description: localisedStringValidations,
});

export type RubriekCategoryValidator = z.infer<typeof rubriekCategoryValidator>;
export type RubriekCategoryErrors = z.inferFormattedError<
  typeof rubriekCategoryValidator
>;

export async function validateRubriekCategory(
  request: Request,
): Promise<
  | SuccessValidation<RubriekCategoryValidator>
  | ErrorValidation<RubriekCategoryValidator>
> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformFormData(formData);

  const result = rubriekCategoryValidator.safeParse(transformedData);

  if (result.success) {
    return result as SuccessValidation<RubriekCategoryValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<RubriekCategoryValidator>,
  } as ErrorValidation<RubriekCategoryValidator>;
}
