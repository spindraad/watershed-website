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

type Props = {
  HeadingBlock: HeadingBlockProps;
  RichTextBlock: RichTextBlockProps;
  ButtonBlock: ButtonBlockProps;
  GridBlock: GribBlockProps;
};

export const config: Config<Props> = {
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
};

export default config;
