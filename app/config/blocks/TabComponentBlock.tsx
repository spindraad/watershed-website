import { ComponentConfig } from '@puckeditor/core';
import TabComponent, {
  Props as TabComponentProps,
  TabItem,
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

  return tabs.filter((tab: TabItem) => {
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
