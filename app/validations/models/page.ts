import { z } from 'zod';
import { Data, ErrorValidation, SuccessValidation } from '~/types/Validations';

const BlockSchema = z
  .object({
    type: z.string(),
    props: z.record(z.any()),
  })
  .optional();

const DataSchema = z.object({
  content: z.array(BlockSchema),
  root: z.object({
    props: z.record(z.any()).optional(),
  }),
  zones: z.record(z.any()).optional(),
});

export const pageValidator = z.object({
  content: z
    .object({
      en: DataSchema,
      nl: DataSchema,
      pap: DataSchema,
    })
    .transform((val) => {
      return {
        en: {
          root: {
            props: {
              ...val.en.root.props,
              slug:
                val.en.root.props?.slug ?
                  formatSlug(val.en.root.props.slug)
                : undefined,
            },
          },
          content: val.en.content,
        },
        nl: {
          root: {
            props: {
              ...val.nl.root.props,
              slug:
                val.nl.root.props?.slug ?
                  formatSlug(val.nl.root.props.slug)
                : undefined,
            },
          },
          content: val.nl.content,
        },
        pap: {
          root: {
            props: {
              ...val.pap.root.props,
              slug:
                val.pap.root.props?.slug ?
                  formatSlug(val.pap.root.props.slug)
                : undefined,
            },
          },
          content: val.pap.content,
        },
      };
    }),
  slug: z
    .string()
    .min(1)
    .transform((val) => {
      return formatSlug(val);
    }),
});

export type PageValidator = z.infer<typeof pageValidator>;
export type PageErrors = z.inferFormattedError<typeof pageValidator>;

export async function validatePage(
  request: Request,
): Promise<SuccessValidation<PageValidator> | ErrorValidation<PageValidator>> {
  const clonedRequest = request.clone();
  const formData = await clonedRequest.formData();
  const transformedData = transformPageFormData(formData);

  const result = pageValidator.safeParse(transformedData);

  if (result.success) {
    return {
      ...result,
      data: {
        ...result.data,
        content: {
          en: result.data.content.en,
          nl: result.data.content.nl,
          pap: result.data.content.pap,
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

function formatSlug(slug: string): string {
  return slug.startsWith('/') ? slug.substring(1) : slug;
}

function transformPageFormData(formData: FormData): PageValidator {
  const data = Object.fromEntries(formData);

  const slug = data.slug as string;
  const enContent = data['content.en'] as string;
  const nlContent = data['content.nl'] as string;
  const papContent = data['content.pap'] as string;

  return {
    content: {
      en: JSON.parse(enContent),
      nl: JSON.parse(nlContent),
      pap: JSON.parse(papContent),
    },
    slug,
  } as PageValidator;
}
