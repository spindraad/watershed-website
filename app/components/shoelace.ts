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
} from '@shoelace-style/shoelace/dist/react';
import { useEffect, useState, useRef, createContext } from 'react';

const nullComponent = () => null;

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
        setBasePath(`${URL}/shoelace-assets/`);

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
          });
        });
      },
    );
  }, [URL]);

  return components;
}
