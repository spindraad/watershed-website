import { SlAlert, SlIcon, SlButton } from '@shoelace-style/shoelace/dist/react';
import { useEffect, useState, useRef, createContext } from 'react';

const nullComponent = () => null;

type Components = {
  SlAlert: typeof nullComponent | typeof SlAlert;
  SlIcon: typeof nullComponent | typeof SlIcon;
  SlButton: typeof nullComponent | typeof SlButton;
};

const nullComponents: Components = {
  SlAlert: nullComponent,
  SlIcon: nullComponent,
  SlButton: nullComponent,
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
          });
        });
      },
    );
  }, [URL]);

  return components;
}
