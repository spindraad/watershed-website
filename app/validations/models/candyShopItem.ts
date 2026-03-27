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

export const candyShopItemValidator = z.object({
  title: localisedStringValidations,
  description: localisedStringValidations,
  image: imageValidations.optional(),
  content: localisedOptionalValidations.optional(),
  categoryId: z.string().min(1),
});

export type CandyShopItemValidator = z.infer<typeof candyShopItemValidator>;
export type CandyShopItemErrors = z.inferFormattedError<
  typeof candyShopItemValidator
>;

export async function validateCandyShopItem(
  request: Request,
): Promise<
  | SuccessValidation<CandyShopItemValidator>
  | ErrorValidation<CandyShopItemValidator>
> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformFormData(formData);

  const result = candyShopItemValidator.safeParse(transformedData);

  if (result.success) {
    return result as SuccessValidation<CandyShopItemValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<CandyShopItemValidator>,
  } as ErrorValidation<CandyShopItemValidator>;
}
