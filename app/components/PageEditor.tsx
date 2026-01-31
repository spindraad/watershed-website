import { ComponentProps, ReactNode, useContext, useEffect } from 'react';
import { Overrides, Puck, createUsePuck } from '@puckeditor/core';
import headingAnalyzer from '@puckeditor/plugin-heading-analyzer';

import '@puckeditor/plugin-heading-analyzer/dist/index.css';
import '@puckeditor/core/puck.css';

import {
  config,
  WatershedPageConfig,
  WatershedPageData,
} from '~/config/puck.config';
import { ShoelaceContext } from '~/components/shoelace';

type PuckProps = ComponentProps<typeof Puck<WatershedPageConfig>>;
type Props = {
  data?: WatershedPageData | object;
  onPublish: PuckProps['onPublish'];
  isSaving?: boolean;
  title: string;
};

type EditorHeaderProps = Pick<Props, 'onPublish' | 'isSaving' | 'title'>;

export default function PageEditor({
  data = {},
  onPublish,
  isSaving = false,
  title,
}: Props) {
  const overrides: Partial<Overrides> = {
    header: (props) => (
      <EditorHeader
        {...props}
        title={title}
        onPublish={onPublish}
        isSaving={isSaving}
      />
    ),
    iframe: ({ children, document }) => {
      return (
        <MockShoelaceProvider document={document}>
          {children}
        </MockShoelaceProvider>
      );
    },
  };

  return (
    <Puck
      overrides={overrides}
      config={config}
      data={data}
      plugins={[headingAnalyzer]}
    />
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

function EditorHeader({ onPublish, isSaving, title }: EditorHeaderProps) {
  const usePuck = createUsePuck<WatershedPageConfig>();
  const appState = usePuck((s) => s.appState);
  const { SlButton, SlIcon } = useContext(ShoelaceContext);

  const publish = () => {
    if (onPublish) {
      onPublish(appState.data);
    }
  };

  return (
    <header className="flex flex-row justify-between items-center mx-auto w-full h-20 px-4 border-b border-gray-200">
      <div className="flex flex-row gap-2 justify-center items-center">
        <SlButton href="/beheer/paginas" variant="neutral" size="small" outline>
          <SlIcon name="arrow-left" slot="prefix" />
          Terug
        </SlButton>
      </div>

      <div className="flex flex-row gap-2 justify-center items-center">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      <div className="flex flex-row gap-2 justify-center items-center">
        <SlButton
          variant="primary"
          disabled={isSaving}
          loading={isSaving}
          onClick={publish}
        >
          <SlIcon name="cloud-upload" slot="prefix" />
          Publiceren
        </SlButton>
      </div>
    </header>
  );
}
