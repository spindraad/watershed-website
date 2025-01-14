import type { Config } from '@measured/puck';
import { Heading, Props as HeadingProps } from './blocks/Heading';

type Props = {
  Heading: HeadingProps;
};

export const config: Config<Props> = {
  categories: {
    typography: {
      components: ['Heading'],
    },
  },
  components: {
    Heading,
  },
};

export default config;
