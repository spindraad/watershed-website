import { supportedLanguages, SupportedLanguages } from '~/config/i18n';

export type ContentURLParams = 'evenementen' | 'projecten';

export type LocalisedValue = Record<SupportedLanguages, string>;

export function isLocalisedValue(value: unknown): value is LocalisedValue {
  if (typeof value !== 'object' || value === null) return false;

  // Get the keys from the value object
  const keys = Object.keys(value);

  // Check if all keys are valid supported languages
  return keys.every((key) =>
    supportedLanguages.includes(key as SupportedLanguages),
  );
}
