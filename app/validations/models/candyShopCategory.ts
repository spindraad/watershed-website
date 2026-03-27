import { z } from 'zod';
import { SuccessValidation, ErrorValidation, Data } from '~/types/Validations';
import { transformFormData } from '~/utils/content';

const localisedStringValidations = z.object({
  nl: z.string().min(1),
  en: z.string().min(1),
  pap: z.string().min(1),
});

export const candyShopCategoryValidator = z.object({
  title: localisedStringValidations,
  description: localisedStringValidations,
});

export type CandyShopCategoryValidator = z.infer<
  typeof candyShopCategoryValidator
>;
export type CandyShopCategoryErrors = z.inferFormattedError<
  typeof candyShopCategoryValidator
>;

export async function validateCandyShopCategory(
  request: Request,
): Promise<
  | SuccessValidation<CandyShopCategoryValidator>
  | ErrorValidation<CandyShopCategoryValidator>
> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformFormData(formData);

  const result = candyShopCategoryValidator.safeParse(transformedData);

  if (result.success) {
    return result as SuccessValidation<CandyShopCategoryValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<CandyShopCategoryValidator>,
  } as ErrorValidation<CandyShopCategoryValidator>;
}
