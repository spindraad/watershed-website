import type { Config } from '@measured/puck';
import {
  HeadingBlock,
  Props as HeadingBlockProps,
} from 'app/config/blocks/HeadingBlock';
import {
  RichTextBlock,
  RichTextBlockProps,
} from '~/config/blocks/RichTextBlock';
import { ButtonBlock, ButtonBlockProps } from '~/config/blocks/ButtonBlock';
import { GridBlock, GribBlockProps } from '~/config/blocks/GridBlock';
import Heading from '~/components/Heading';

type Props = {
  HeadingBlock: HeadingBlockProps;
  RichTextBlock: RichTextBlockProps;
  ButtonBlock: ButtonBlockProps;
  GridBlock: GribBlockProps;
};

type RootProps = {
  title: string;
  summary: string;
  meta: {
    title: string;
    description: string;
  };
};

export const config: Config<Props, RootProps> = {
  categories: {
    typography: {
      title: 'Typography',
      components: ['HeadingBlock', 'RichTextBlock'],
    },
    layout: {
      title: 'Layout',
      components: ['GridBlock'],
    },
    ui: {
      title: 'UI',
      components: ['ButtonBlock'],
    },
  },
  components: {
    HeadingBlock,
    RichTextBlock,
    ButtonBlock,
    GridBlock,
  },
  root: {
    fields: {
      title: {
        label: 'Pagina titel',
        type: 'text',
      },
      summary: {
        label: 'Pagina omschrijving',
        type: 'textarea',
      },
      meta: {
        type: 'object',
        label: 'SEO',
        objectFields: {
          title: {
            label: 'Titel',
            type: 'text',
          },
          description: {
            label: 'Beschrijving',
            type: 'textarea',
          },
        },
      },
    },
    render({ children, title }) {
      return (
        <div className="flex flex-col gap-4">
          <Heading level={1}>{title}</Heading>
          {children}
        </div>
      );
    },
  },
};

export default config;
