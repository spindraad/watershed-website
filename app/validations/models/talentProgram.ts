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

export const talentProgramValidator = z.object({
  title: localisedStringValidations,
  duration: z.string().optional(),
  description: localisedStringValidations,
  image: imageValidations.optional(),
  content: localisedOptionalValidations.optional(),
  makerIds: z.string().optional(), // Comma-separated IDs
});

export type TalentProgramValidator = z.infer<typeof talentProgramValidator>;
export type TalentProgramErrors = z.inferFormattedError<
  typeof talentProgramValidator
>;

export async function validateTalentProgram(
  request: Request,
): Promise<
  | SuccessValidation<TalentProgramValidator>
  | ErrorValidation<TalentProgramValidator>
> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformFormData(formData);

  const result = talentProgramValidator.safeParse(transformedData);

  if (result.success) {
    return result as SuccessValidation<TalentProgramValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<TalentProgramValidator>,
  } as ErrorValidation<TalentProgramValidator>;
}
