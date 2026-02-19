import { useState, ReactNode, useCallback, KeyboardEvent } from 'react';
import Heading from '~/components/Heading';
import Icon, { Props as IconProps } from '~/components/Icon';

export type TabItem = {
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
  tabs: TabItem[];
  defaultActiveTab?: string;
};

function TabSlant({ isActive }: { isActive: boolean }) {
  return (
    <svg
      className={`
        tab-component__slant
        ${isActive ? 'tab-component__slant--active' : ''}
      `}
      viewBox="0 0 125 21"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M1.8501 13C32.4063 5.73699 96.023 7.95624 124.012 9.97375"
        stroke="currentColor"
        strokeWidth="16"
      />
    </svg>
  );
}

type TabNavigationButtonProps = {
  iconName: IconProps['name'];
  onClick: () => void;
};

function TabNavigationButton({ iconName, onClick }: TabNavigationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="focus:outline-none focus:ring-2 focus:ring-primary-500"
    >
      <Icon name={iconName} size="normal" />
    </button>
  );
}

export default function TabComponent({ tabs, defaultActiveTab }: Props) {
  const [activeTab, setActiveTab] = useState(
    defaultActiveTab || tabs[0]?.tab.slug || '',
  );

  const activeIndex = tabs.findIndex((t) => t.tab.slug === activeTab);
  const activeContent = tabs.find((t) => t.tab.slug === activeTab)?.content;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      let newIndex = activeIndex;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        newIndex = (activeIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        newIndex = tabs.length - 1;
      }

      if (newIndex !== activeIndex) {
        setActiveTab(tabs[newIndex].tab.slug);
        // Focus the new tab button
        const tabButtons = e.currentTarget.parentElement?.querySelectorAll(
          '[role="tab"]',
        ) as NodeListOf<HTMLButtonElement>;
        tabButtons?.[newIndex]?.focus();
      }
    },
    [activeIndex, tabs],
  );

  const activateTabByIndex = (index: number) => {
    setActiveTab(tabs[index].tab.slug);
    // Focus the new tab button
    const tabButtons = document.querySelectorAll(
      '[role="tab"]',
    ) as NodeListOf<HTMLButtonElement>;
    tabButtons?.[index]?.focus();
  };

  const navigateToPreviousTab = () => {
    const currentIndex = tabs.findIndex(({ tab }) => tab.slug === activeTab);

    activateTabByIndex(currentIndex - 1);
  };

  const navigateToNextTab = () => {
    const currentIndex = tabs.findIndex(({ tab }) => tab.slug === activeTab);

    activateTabByIndex(currentIndex + 1);
  };

  return (
    <div className="tab-component">
      {/* Tab bar */}
      <div className="tab-component__nav" role="tablist">
        {tabs.map((item, index) => {
          const isActive = activeTab === item.tab.slug;
          return (
            <button
              key={item.tab.slug}
              id={`tab-${item.tab.slug}`}
              className={`tab-component__tab ${isActive ? 'tab-component__tab--active' : ''}`}
              onClick={() => setActiveTab(item.tab.slug)}
              onKeyDown={handleKeyDown}
              aria-selected={isActive}
              aria-controls={`tabpanel-${item.tab.slug}`}
              role="tab"
              tabIndex={isActive ? 0 : -1}
            >
              <span className="tab-component__tab-label">
                <TabSlant isActive={isActive} />
                <span className="tab-component__tab-text">
                  {item.tab.title}
                </span>
              </span>
              {/* Tab separator - not on the last tab */}
              {index < tabs.length - 1 && (
                <span
                  className="tab-component__tab-separator"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div
        className="tab-component__body"
        role="tabpanel"
        id={`tabpanel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeContent && (
          <>
            <div className="tab-component__title">
              <TabNavigationButton
                iconName="arrow-left"
                onClick={navigateToPreviousTab}
              />

              <Heading level={4} colorClass="text-black">
                {activeContent.title}
              </Heading>

              <TabNavigationButton
                iconName="arrow-right"
                onClick={navigateToNextTab}
              />
            </div>

            <div className="tab-component__content prose">
              {typeof activeContent.body === 'string' ?
                <div dangerouslySetInnerHTML={{ __html: activeContent.body }} />
              : activeContent.body}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
