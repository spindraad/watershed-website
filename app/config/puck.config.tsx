import { Config, Data } from '@puckeditor/core';
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
import {
  UpcomingEventsBlock,
  UpcomingEventsBlockProps,
} from '~/config/blocks/UpcomingEventsBlock';
import {
  BackgroundBlock,
  BackgroundBlockProps,
} from '~/config/blocks/BackgroundBlock';
import {
  MakersOverviewBlock,
  MakersOverviewBlockProps,
} from '~/config/blocks/MakersOverviewBlock';
import { LogoBlock, LogoBlockProps } from '~/config/blocks/LogoBlock';
import { BorderBlock, BorderBlockProps } from '~/config/blocks/BorderBlock';
import { SpacingBlock, SpacingBlockProps } from '~/config/blocks/SpacingBlock';
import { colorField, ColorField } from '~/config/fields/color';

export type Props = {
  HeadingBlock: HeadingBlockProps;
  RichTextBlock: RichTextBlockProps;
  ButtonBlock: ButtonBlockProps;
  GridBlock: GribBlockProps;
  IllustrationBlock: IllustrationBlockProps;
  UpcomingEventsBlock: UpcomingEventsBlockProps;
  BackgroundBlock: BackgroundBlockProps;
  MakersOverviewBlock: MakersOverviewBlockProps;
  LogoBlock: LogoBlockProps;
  BorderBlock: BorderBlockProps;
  SpacingBlock: SpacingBlockProps;
};

export type RootProps = {
  title: string;
  titleIsHidden: boolean;
  summary: string;
  slug: string;
  backgroundColor: ColorField;
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
      components: ['GridBlock', 'SpacingBlock'],
    },
    ui: {
      title: 'UI',
      components: [
        'ButtonBlock',
        'IllustrationBlock',
        'UpcomingEventsBlock',
        'MakersOverviewBlock',
        'BackgroundBlock',
        'LogoBlock',
        'BorderBlock',
      ],
    },
  },
  components: {
    HeadingBlock,
    RichTextBlock,
    ButtonBlock,
    GridBlock,
    IllustrationBlock,
    UpcomingEventsBlock,
    MakersOverviewBlock,
    BackgroundBlock,
    LogoBlock,
    BorderBlock,
    SpacingBlock,
  },
  root: {
    fields: {
      title: {
        label: 'Pagina titel',
        type: 'text',
      },
      titleIsHidden: {
        label: 'Verberg titel op pagina',
        type: 'radio',
        options: [
          { label: 'Ja', value: true },
          { label: 'Nee', value: false },
        ],
      },
      summary: {
        label: 'Pagina omschrijving',
        type: 'textarea',
      },
      slug: {
        label: 'Slug',
        type: 'text',
      },
      backgroundColor: colorField,
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
    defaultProps: {
      title: 'Nieuwe pagina',
      titleIsHidden: false,
      summary: '',
      slug: '',
      backgroundColor: 'light-yellow',
      meta: {
        title: 'Nieuwe pagina',
        description: '',
      },
    },
    render({ children, title, titleIsHidden }) {
      return (
        <div className="flex flex-col gap-4 puck-root-component">
          {!titleIsHidden && title ?
            <Heading level={1}>{title}</Heading>
          : null}
          {children}
        </div>
      );
    },
  },
};

export default config;
