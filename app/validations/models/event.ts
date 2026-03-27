import { z } from 'zod';
import { SuccessValidation, ErrorValidation, Data } from '~/types/Validations';
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

export const eventValidator = z.object({
  title: localisedStringValidations,
  description: localisedStringValidations,
  image: imageValidations,
  organiser: z.string().optional(),
  eventDate: z.string().datetime(),
  address: z.string().min(1),
  link: z.string().min(1),
  content: localisedHtmlValidations.optional(),
  makerIds: z.string().optional(),
});

export type EventValidator = z.infer<typeof eventValidator>;
export type EventErrors = z.inferFormattedError<typeof eventValidator>;

export async function validateEvent(
  request: Request,
): Promise<
  SuccessValidation<EventValidator> | ErrorValidation<EventValidator>
> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformFormData(formData);

  const result = eventValidator.safeParse(transformedData);

  if (result.success) {
    return result as SuccessValidation<EventValidator>;
  }

  return {
    success: false,
    errors: result.error.format(),
    data: transformedData as Data<EventValidator>,
  } as ErrorValidation<EventValidator>;
}
