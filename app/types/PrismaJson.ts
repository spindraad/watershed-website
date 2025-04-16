import { WatershedPageData } from '~/config/puck.config';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace PrismaJson {
    type Localised = {
      en: string;
      nl: string;
      pap: string;
    };

    type LocalisedContent = {
      en: WatershedPageData;
      nl: WatershedPageData;
      pap: WatershedPageData;
    };
  }
}

export {};
