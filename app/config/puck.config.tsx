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

type Props = {
  HeadingBlock: HeadingBlockProps;
  RichTextBlock: RichTextBlockProps;
  ButtonBlock: ButtonBlockProps;
};

export const config: Config<Props> = {
  categories: {
    typography: {
      components: ['HeadingBlock'],
    },
  },
  components: {
    HeadingBlock,
    RichTextBlock,
    ButtonBlock,
  },
};

export default config;
