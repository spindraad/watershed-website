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

export const makerValidator = z.object({
  name: z.string().min(1),
  profession: localisedStringValidations,
  summary: localisedStringValidations,
  slug: z.string().min(1),
  image: imageValidations.optional(),
  content: localisedOptionalValidations.optional(),
  talentProgramIds: z.string().optional(), // Comma-separated IDs
});

export type MakerValidator = z.infer<typeof makerValidator>;
export type MakerErrors = z.inferFormattedError<typeof makerValidator>;

export async function validateMaker(
  request: Request,
): Promise<
  SuccessValidation<MakerValidator> | ErrorValidation<MakerValidator>
> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformFormData(formData);

  const result = makerValidator.safeParse(transformedData);

  if (result.success) {
    return result as SuccessValidation<MakerValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<MakerValidator>,
  } as ErrorValidation<MakerValidator>;
}
