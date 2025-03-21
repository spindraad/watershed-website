// Define interfaces for the original and transformed data structures
import {
  inferFormattedError,
  ZodError,
  ZodFormattedError,
  ZodTypeAny,
} from 'zod';

interface RawFormData {
  [key: string]: string | File;
}

interface LocalizedField {
  [locale: string]: string;
}

interface TransformedFormData {
  [key: string]: string | LocalizedField; // For any additional fields
}

/**
 * Transforms a form data object with nested keys into a properly structured object
 * @param formData
 */
export function transformFormData(formData: FormData): TransformedFormData {
  const result: Partial<TransformedFormData> = {};
  const data: RawFormData = Object.fromEntries(formData);

  Object.keys(data).forEach((key) => {
    if (key.includes('.')) {
      const [fieldName, locale] = key.split('.');

      // Initialize the object for this field if it doesn't exist yet
      if (!result[fieldName]) {
        result[fieldName] = {} as LocalizedField;
      }

      // Check if the field is not a file
      if (data[key] instanceof File) {
        return;
      }

      // Add the localized value
      (result[fieldName] as LocalizedField)[locale] = data[key];
    } else if (!(data[key] instanceof File)) {
      // For regular fields (not files), just copy them directly
      result[key] = data[key];
    }
  });

  return result as TransformedFormData;
}

export function countErrorsForLocalisedFields<D extends ZodTypeAny>(
  errors: inferFormattedError<D>,
): Record<string, number> {
  const result: Record<string, number> = {};
  const locales = ['en', 'nl', 'pap']; // Define known locales

  // Iterate over the error fields
  for (const field in errors) {
    if (field === '_errors') continue;

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
