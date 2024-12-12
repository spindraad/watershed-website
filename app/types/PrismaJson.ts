import { SupportedLanguages } from '~/config/i18n';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type Localised = Record<SupportedLanguages, string>;
  }
}

export {};
