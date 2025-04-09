import { Data } from '@measured/puck';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type Localised = {
      en: string;
      nl: string;
      pap: string;
    };

    type LocalisedContent = {
      en: Data;
      nl: Data;
      pap: Data;
    };

    type LocalisedPageMeta = {
      title: Localised;
      description: Localised;
    };
  }
}

export {};
