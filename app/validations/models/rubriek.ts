import { z } from 'zod';
import { SuccessValidation, ErrorValidation, Data } from '~/types/Validations';
import { transformFormData } from '~/utils/content';

const localisedStringValidations = z.object({
  nl: z.string().min(1),
  en: z.string().min(1),
  pap: z.string().min(1),
});

const localisedOptionalValidations = z.object({
  nl: z.string().optional(),
  en: z.string().optional(),
  pap: z.string().optional(),
});

const imageValidations = z.object({
  url: z.string().optional(),
  alt: z.string().optional(),
});

export const rubriekValidator = z.object({
  title: localisedStringValidations,
  description: localisedStringValidations,
  image: imageValidations.optional(),
  content: localisedOptionalValidations.optional(),
  categoryId: z.string().min(1),
});

export type RubriekValidator = z.infer<typeof rubriekValidator>;
export type RubriekErrors = z.inferFormattedError<typeof rubriekValidator>;

export async function validateRubriek(
  request: Request,
): Promise<
  SuccessValidation<RubriekValidator> | ErrorValidation<RubriekValidator>
> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformFormData(formData);

  const result = rubriekValidator.safeParse(transformedData);

  if (result.success) {
    return result as SuccessValidation<RubriekValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<RubriekValidator>,
  } as ErrorValidation<RubriekValidator>;
}
