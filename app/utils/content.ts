// Define interfaces for the original and transformed data structures
import { inferFormattedError, ZodTypeAny } from 'zod';

interface RawFormData {
  [key: string]: string | File;
}

interface NestedField {
  [key: string]: string | NestedField;
}

interface TransformedFormData {
  [key: string]: string | NestedField;
}

/**
 * Transforms a form data object with nested keys into a properly structured object
 * Supports both locale keys (title.nl, title.en) and nested object keys (image.url, image.alt)
 * @param formData
 */
export function transformFormData(formData: FormData): TransformedFormData {
  const result: TransformedFormData = {};
  const data: RawFormData = Object.fromEntries(formData);

  Object.keys(data).forEach((key) => {
    // Skip file fields
    if (data[key] instanceof File) {
      return;
    }

    if (key.includes('.')) {
      const parts = key.split('.');
      let current: TransformedFormData | NestedField = result;

      // Traverse/create the nested structure
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part] as NestedField;
      }

      // Set the final value
      const lastPart = parts[parts.length - 1];
      current[lastPart] = data[key] as string;
    } else {
      // For regular fields (not nested), just copy them directly
      result[key] = data[key] as string;
    }
  });

  return result;
}

export function countErrorsForLocalisedFields<D extends ZodTypeAny>(
  errors: inferFormattedError<D>,
): Record<string, number> {
  const result: Record<string, number> = {};
  const locales = ['en', 'nl', 'pap']; // Define known locales

  // Iterate over the error fields
  for (const field in errors) {
    if (field === '_errors') continue;

    // @ts-expect-error - We know that fieldErrors is an object
    const fieldErrors = errors[field];
    if (!fieldErrors || typeof fieldErrors !== 'object') continue;

    // Check for localized errors within each field
    for (const locale of locales) {
      if (fieldErrors[locale]?._errors?.length) {
        if (!result[locale]) {
          result[locale] = 0;
        }
        result[locale] += fieldErrors[locale]._errors.length;
      }
    }
  }

  return result;
}
