import {
  ComponentProps,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Overrides, Puck, usePuck } from '@measured/puck';

import '@measured/puck/puck.css';

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

type EditorHeaderProps = Pick<Props, 'onPublish' | 'isSaving' | 'title'> & {
  handleDrawerOpen: (orientation: 'left' | 'right') => void;
};

const overrides: Partial<Overrides> = {
  iframe: ({ children, document }) => {
    return (
      <MockShoelaceProvider document={document}>
        {children}
      </MockShoelaceProvider>
    );
  },
};

export default function PageEditor({
  data = {},
  onPublish,
  isSaving = false,
  title,
}: Props) {
  const { SlDrawer } = useContext(ShoelaceContext);

  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const handleDrawerOpen = (orientation: 'left' | 'right') => {
    if (orientation === 'left') {
      setLeftDrawerOpen(true);
    }

    if (orientation === 'right') {
      setRightDrawerOpen(true);
    }
  };

  return (
    <Puck
      overrides={overrides}
      config={config}
      data={data}
      onPublish={onPublish}
    >
      <div className="w-full h-full flex flex-col gap-4 px-4">
        <SlDrawer
          open={leftDrawerOpen}
          placement="start"
          onSlAfterHide={() => setLeftDrawerOpen(false)}
          label="Componenten"
        >
          <Puck.Components />
        </SlDrawer>

        <EditorHeader
          onPublish={onPublish}
          handleDrawerOpen={handleDrawerOpen}
          isSaving={isSaving}
          title={title}
        />

        <SlDrawer
          open={rightDrawerOpen}
          placement="end"
          onSlAfterHide={() => setRightDrawerOpen(false)}
          label="Velden"
        >
          <Puck.Fields />
        </SlDrawer>

        <Puck.Preview />
      </div>
    </Puck>
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

function EditorHeader({
  onPublish,
  handleDrawerOpen,
  isSaving,
  title,
}: EditorHeaderProps) {
  const { appState } = usePuck<WatershedPageConfig>();
  const { SlButton, SlIconButton, SlIcon } = useContext(ShoelaceContext);

  const publish = () => {
    if (onPublish) {
      onPublish(appState.data);
    }
  };

  return (
    <header className="flex flex-col gap-2 w-full h-24 justify-center">
      <div className="w-auto">
        <SlButton href="/beheer/paginas" variant="neutral" size="small" outline>
          <SlIcon name="arrow-left" slot="prefix" />
          Terug
        </SlButton>
      </div>

      <div className="flex flex-row justify-between items-center mx-auto w-full">
        <div className="flex flex-row gap-2 justify-center items-center">
          <SlIconButton
            name="layout-sidebar-inset"
            label="Toon componenten"
            onClick={() => handleDrawerOpen('left')}
            className="text-xl"
          />
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

          <SlIconButton
            name="layout-sidebar-inset-reverse"
            label="Veld"
            onClick={() => handleDrawerOpen('right')}
            className="text-xl"
          />
        </div>
      </div>
    </header>
  );
}
