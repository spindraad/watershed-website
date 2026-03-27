import {
  SlAlert,
  SlIcon,
  SlButton,
  SlButtonGroup,
  SlInput,
  SlCheckbox,
  SlTag,
  SlCard,
  SlDrawer,
  SlIconButton,
  SlDialog,
  SlDropdown,
  SlMenu,
  SlMenuItem,
  SlBadge,
  SlSpinner,
  SlCopyButton,
  SlTab,
  SlTabGroup,
  SlTabPanel,
  SlTooltip,
} from '@shoelace-style/shoelace/dist/react';
import { useEffect, useState, useRef, createContext, forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const nullComponent = forwardRef(() => null);

type Components = {
  SlAlert: typeof nullComponent | typeof SlAlert;
  SlIcon: typeof nullComponent | typeof SlIcon;
  SlButton: typeof nullComponent | typeof SlButton;
  SlButtonGroup: typeof nullComponent | typeof SlButtonGroup;
  SlInput: typeof nullComponent | typeof SlInput;
  SlCheckbox: typeof nullComponent | typeof SlCheckbox;
  SlTag: typeof nullComponent | typeof SlTag;
  SlCard: typeof nullComponent | typeof SlCard;
  SlDrawer: typeof nullComponent | typeof SlDrawer;
  SlIconButton: typeof nullComponent | typeof SlIconButton;
  SlDialog: typeof nullComponent | typeof SlDialog;
  SlDropdown: typeof nullComponent | typeof SlDropdown;
  SlMenu: typeof nullComponent | typeof SlMenu;
  SlMenuItem: typeof nullComponent | typeof SlMenuItem;
  SlBadge: typeof nullComponent | typeof SlBadge;
  SlSpinner: typeof nullComponent | typeof SlSpinner;
  SlCopyButton: typeof nullComponent | typeof SlCopyButton;
  SlTab: typeof nullComponent | typeof SlTab;
  SlTabGroup: typeof nullComponent | typeof SlTabGroup;
  SlTabPanel: typeof nullComponent | typeof SlTabPanel;
  SlTooltip: typeof nullComponent | typeof SlTooltip;
};

const nullComponents: Components = {
  SlAlert: nullComponent,
  SlIcon: nullComponent,
  SlButton: nullComponent,
  SlButtonGroup: nullComponent,
  SlInput: nullComponent,
  SlCheckbox: nullComponent,
  SlTag: nullComponent,
  SlCard: nullComponent,
  SlDrawer: nullComponent,
  SlIconButton: nullComponent,
  SlDialog: nullComponent,
  SlDropdown: nullComponent,
  SlMenu: nullComponent,
  SlMenuItem: nullComponent,
  SlBadge: nullComponent,
  SlSpinner: nullComponent,
  SlCopyButton: nullComponent,
  SlTab: nullComponent,
  SlTabGroup: nullComponent,
  SlTabPanel: nullComponent,
  SlTooltip: nullComponent,
};

export const ShoelaceContext = createContext<Components>(nullComponents);

export function useShoelace({ URL }: { URL: string }) {
  const loaded = useRef(false);

  const [components, setComponents] = useState<Components>(nullComponents);

  useEffect(() => {
    if (loaded.current) return;

    loaded.current = true;

    import('@shoelace-style/shoelace/dist/utilities/base-path.js').then(
      ({ setBasePath }) => {
        setBasePath(`/shoelace-assets/`);

        import('@shoelace-style/shoelace/dist/react').then((components) => {
          setComponents({
            SlAlert: components.SlAlert,
            SlIcon: components.SlIcon,
            SlButton: components.SlButton,
            SlButtonGroup: components.SlButtonGroup,
            SlInput: components.SlInput,
            SlCheckbox: components.SlCheckbox,
            SlTag: components.SlTag,
            SlCard: components.SlCard,
            SlDrawer: components.SlDrawer,
            SlIconButton: components.SlIconButton,
            SlDialog: components.SlDialog,
            SlDropdown: components.SlDropdown,
            SlMenu: components.SlMenu,
            SlMenuItem: components.SlMenuItem,
            SlBadge: components.SlBadge,
            SlSpinner: components.SlSpinner,
            SlCopyButton: components.SlCopyButton,
            SlTab: components.SlTab,
            SlTabGroup: components.SlTabGroup,
            SlTabPanel: components.SlTabPanel,
            SlTooltip: components.SlTooltip,
          });
        });
      },
    );
  }, [URL]);

  return components;
}
