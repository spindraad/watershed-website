import { z } from 'zod';

export const eventValidator = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  eventDate: z.string().datetime(),
  address: z.string().min(1),
  link: z.string().min(1),
});

export type EventValidator = z.infer<typeof eventValidator>;
export type EventErrors = z.inferFlattenedErrors<
  typeof eventValidator
>['fieldErrors'];

export async function validateEvent(request: Request): Promise<EventValidator> {
  const clonedRequest = request.clone();
  const formData = Object.fromEntries(await clonedRequest.formData());
  formData.eventDate = `${formData.eventDate}:00.000Z`;

  return eventValidator.parse(formData);
}
