import type { Config } from '@measured/puck';
import {
  HeadingBlock,
  Props as HeadingBlockProps,
} from 'app/config/blocks/HeadingBlock';
import {
  RichTextBlock,
  RichTextBlockProps,
} from '~/config/blocks/RichTextBlock';

type Props = {
  HeadingBlock: HeadingBlockProps;
  RichTextBlock: RichTextBlockProps;
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
  },
};

export default config;
