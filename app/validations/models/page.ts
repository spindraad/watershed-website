import { z } from 'zod';
import { Data, ErrorValidation, SuccessValidation } from '~/types/Validations';
import { transformFormData } from '~/utils/content';

const dataSchema = z.any();

export const pageValidator = z.object({
  content: z.object({
    en: dataSchema,
    nl: dataSchema,
    pap: dataSchema,
  }),
  slug: z.string().min(1),
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
    return {
      ...result,
      data: {
        ...result.data,
        content: {
          en: JSON.parse(result.data.content.en),
          nl: JSON.parse(result.data.content.nl),
          pap: JSON.parse(result.data.content.pap),
        },
      },
    } as SuccessValidation<PageValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<PageValidator>,
  } as ErrorValidation<PageValidator>;
}
