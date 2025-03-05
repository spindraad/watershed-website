import { ComponentProps, ReactNode, useEffect } from 'react';
import { Overrides, Puck } from '@measured/puck';

import '@measured/puck/puck.css';

import { config } from '~/config/puck.config';

type Props = Pick<ComponentProps<typeof Puck>, 'data' | 'onPublish'>;

const overrides: Partial<Overrides> = {
  iframe: ({ children, document }) => {
    return (
      <MockShoelaceProvider document={document}>
        {children}
      </MockShoelaceProvider>
    );
  },
};

export default function PageEditor({ data, onPublish }: Props) {
  return (
    <Puck
      overrides={overrides}
      config={config}
      data={data}
      onPublish={onPublish}
    ></Puck>
  );
}

function MockShoelaceProvider({
  children,
  document,
}: {
  children: ReactNode;
  document: Document | undefined;
}) {
  useEffect(() => {
    if (!document) return;

    const script = document.createElement('script');
    script.type = 'module';
    script.src =
      'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.20.0/cdn/shoelace-autoloader.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [document]);

  return <>{children}</>;
}
