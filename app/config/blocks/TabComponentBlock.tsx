import { ComponentConfig } from '@puckeditor/core';
import TabComponent, {
  Props as TabComponentProps,
} from '~/components/TabComponent';

export type TabComponentBlockProps = TabComponentProps;

export const TabComponentBlock: ComponentConfig<TabComponentBlockProps> = {
  label: 'Tabbladen',
  fields: {
    tabs: {
      type: 'array',
      arrayFields: {
        tab: {
          type: 'object',
          label: 'Tab',
          objectFields: {
            title: {
              type: 'text',
              label: 'Titel',
            },
            slug: {
              type: 'text',
              label: 'Slug',
            },
          },
        },
        content: {
          type: 'object',
          label: 'Inhoud',
          objectFields: {
            title: {
              type: 'text',
              label: 'Titel',
            },
            body: {
              type: 'richtext',
              label: 'Tekst',
            },
          },
        },
      },
      getItemSummary: (item) => item?.tab?.title ?? 'Tabblad',
    },
    defaultActiveTab: {
      type: 'text',
      label: 'Standaard actief tabblad (slug)',
    },
  },
  render({ tabs, defaultActiveTab }) {
    const validTabs = retrieveValidTabs(tabs);
    return (
      <TabComponent tabs={validTabs} defaultActiveTab={defaultActiveTab} />
    );
  },
};

function retrieveValidTabs(tabs: unknown): TabComponentProps['tabs'] {
  if (!Array.isArray(tabs)) {
    return [];
  }

  // We perform a runtime check to ensure that each tab item has the expected structure.
  // Since we don't have type information at runtime, 'any' is used to access properties without TypeScript errors.
  /* eslint-disable @typescript-eslint/no-explicit-any */
  return tabs.filter((tab: any) => {
    return (
      tab.tab &&
      typeof tab.tab.title === 'string' &&
      typeof tab.tab.slug === 'string' &&
      tab.content &&
      typeof tab.content.title === 'string' &&
      (typeof tab.content.body === 'string' ||
        typeof tab.content.body === 'object')
    );
  });
}
