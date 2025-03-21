import { z } from 'zod';
import { SuccessValidation, ErrorValidation, Data } from '~/types/Validations';
import { transformFormData } from '~/utils/content';

const localisedStringValidations = z.object({
  nl: z.string().min(1),
  en: z.string().min(1),
  pap: z.string().min(1),
});

export const eventValidator = z.object({
  title: localisedStringValidations,
  description: localisedStringValidations,
  eventDate: z.string().datetime(),
  address: z.string().min(1),
  link: z.string().min(1),
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
  transformedData.eventDate = `${transformedData.eventDate}:00.000Z`;

  const result = eventValidator.safeParse(transformedData);

  console.log(result);
  if (result.success) {
    return result as SuccessValidation<EventValidator>;
  }

  return {
    ...result,
    errors: result.error.format(),
    data: transformedData as Data<EventValidator>,
  } as ErrorValidation<EventValidator>;
}
