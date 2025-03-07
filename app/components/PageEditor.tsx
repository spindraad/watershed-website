import {
  ComponentProps,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Overrides, Puck, usePuck } from '@measured/puck';

import '@measured/puck/puck.css';

import { config } from '~/config/puck.config';
import { ShoelaceContext } from '~/components/shoelace';

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
  const { SlDrawer } = useContext(ShoelaceContext);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
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
          open={open}
          placement="start"
          onSlAfterHide={() => setOpen(false)}
          label="Componenten"
        >
          <Puck.Components />
        </SlDrawer>

        <EditorHeader
          onPublish={onPublish}
          handleDrawerOpen={handleDrawerOpen}
        />

        <Puck.Preview />

        <EditorFooter />
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
}: {
  onPublish: Props['onPublish'];
  handleDrawerOpen: () => void;
}) {
  const { appState } = usePuck();
  const { SlButton, SlIconButton, SlIcon } = useContext(ShoelaceContext);

  const [isPublishing, setIsPublishing] = useState(false);

  const publish = () => {
    setIsPublishing(true);
    if (onPublish) {
      onPublish(appState.data);
    }
  };

  return (
    <header>
      <div className="flex flex-row justify-between items-center mx-auto h-24">
        <div className="flex flex-row gap-2 justify-center items-center">
          <SlIconButton
            name="layout-sidebar-inset"
            label="Toon zijbalk"
            onClick={handleDrawerOpen}
            className="text-xl"
          />
          <h1 className="text-xl font-bold">Editor</h1>
        </div>

        <SlButton
          variant="primary"
          disabled={isPublishing}
          loading={isPublishing}
          onClick={publish}
        >
          <SlIcon name="cloud-upload" slot="prefix" />
          Publiceren
        </SlButton>
      </div>
    </header>
  );
}

function EditorFooter() {
  const {
    appState: {
      ui: { itemSelector },
      data,
    },
  } = usePuck();
  const { SlDrawer } = useContext(ShoelaceContext);
  const [open, setOpen] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState('');

  const ignoreBlocks = useMemo(() => {
    return ['RichTextBlock'];
  }, []);

  useEffect(() => {
    if (itemSelector) {
      const { index: destinationIndex, zone: destinationZone } = itemSelector;

      if (destinationZone) {
        const item =
          destinationZone !== 'default-zone' ?
            data.zones?.[destinationZone]?.[destinationIndex]
          : data.content[destinationIndex];
        if (item) {
          setSelectedBlockType(item.type);
        }
      }
    }
  }, [itemSelector, data]);

  useEffect(() => {
    if (selectedBlockType) {
      if (!ignoreBlocks.includes(selectedBlockType)) {
        setOpen(true);
      }
    }
  }, [selectedBlockType, ignoreBlocks]);

  return (
    <SlDrawer
      open={open}
      placement="bottom"
      onSlAfterHide={() => setOpen(false)}
      label="Blok instellingen"
    >
      <Puck.Fields />
    </SlDrawer>
  );
}
