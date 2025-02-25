import type { Config } from '@measured/puck';
import { Heading, Props as HeadingProps } from './blocks/Heading';
import {
  RichTextBlock,
  RichTextBlockProps,
} from '~/config/blocks/RichTextBlock';

type Props = {
  Heading: HeadingProps;
  RichTextBlock: RichTextBlockProps;
};

export const config: Config<Props> = {
  categories: {
    typography: {
      components: ['Heading'],
    },
  },
  components: {
    Heading,
    RichTextBlock,
  },
};

export default config;
