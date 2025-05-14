import type { Config, Data } from '@measured/puck';
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
import {
  IllustrationBlock,
  IllustrationBlockProps,
} from '~/config/blocks/IllustrationBlock';

type Props = {
  HeadingBlock: HeadingBlockProps;
  RichTextBlock: RichTextBlockProps;
  ButtonBlock: ButtonBlockProps;
  GridBlock: GribBlockProps;
  IllustrationBlock: IllustrationBlockProps;
};

type RootProps = {
  title: string;
  summary: string;
  slug: string;
  meta: {
    title: string;
    description: string;
  };
};

export type WatershedPageData = Data<Props, RootProps>;
export type WatershedPageConfig = Config<Props, RootProps>;

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
      components: ['ButtonBlock', 'IllustrationBlock'],
    },
  },
  components: {
    HeadingBlock,
    RichTextBlock,
    ButtonBlock,
    GridBlock,
    IllustrationBlock,
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
      slug: {
        label: 'Slug',
        type: 'text',
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
          {title ?
            <Heading level={1}>{title}</Heading>
          : null}
          {children}
        </div>
      );
    },
  },
};

export default config;
