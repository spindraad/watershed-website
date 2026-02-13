import { ReactNode, useContext, useRef } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import Heading from '~/components/Heading';
import Icon from '~/components/Icon';

type TabContent = {
  tab: {
    title: string;
    slug: string;
  };
  content: {
    title: string;
    body: ReactNode;
  };
};

type Props = {
  content: TabContent[];
};

export default function ContentTabs({ content }: Props) {
  const { SlTabGroup, SlTab, SlTabPanel } = useContext(ShoelaceContext);
  const tabGroupRef = useRef<typeof SlTabGroup>(null);
  let currentTabSlug = content[0]?.tab.slug || '';
  const tabs = content.map(({ tab }) => tab);

  const setCurrentTab = (slug: string) => {
    currentTabSlug = slug;
  };

  const navigateToPreviousTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.slug === currentTabSlug);
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1].slug);
      tabGroupRef.current?.show(tabs[currentIndex - 1].slug);
    }
  };

  const navigateToNextTab = () => {
    const currentIndex = tabs.findIndex((tab) => tab.slug === currentTabSlug);
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1].slug);
      tabGroupRef.current?.show(tabs[currentIndex + 1].slug);
    }
  };

  return (
    <SlTabGroup
      ref={tabGroupRef}
      onSlTabShow={({ detail }) => setCurrentTab(detail.name)}
    >
      {content.map(({ tab }) => (
        <SlTab key={tab.slug} slot="nav" panel={tab.slug}>
          {tab.title}
        </SlTab>
      ))}
      {content.map(({ tab, content }) => (
        <SlTabPanel key={tab.slug} name={tab.slug}>
          <div className="flex w-full items-center gap-4 mb-4 px-2">
            <TabNavigationButton
              icon={<Icon name="arrow-left" size="small" />}
              onClick={navigateToPreviousTab}
            />

            <div className="flex-1 flex justify-center">
              <Heading level={4}>{content.title}</Heading>
            </div>

            <TabNavigationButton
              icon={<Icon name="arrow-right" size="small" />}
              onClick={navigateToNextTab}
            />
          </div>

          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content.body as string }}
          />
        </SlTabPanel>
      ))}
    </SlTabGroup>
  );
}

type TabNavigationButtonProps = {
  icon: ReactNode;
  onClick: () => void;
};

function TabNavigationButton({ icon, onClick }: TabNavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      {icon}
    </button>
  );
}
