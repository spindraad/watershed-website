import type { ComponentConfig } from '@puckeditor/core';
import {
  illustrationField,
  IllustrationKey,
  illustrations,
} from '~/config/fields/illustration';
import { colorField, ColorField, getColorHex } from '~/config/fields/color';
import Heading from '~/components/Heading';

export type PageHeaderBlockProps = {
  title: string;
  backgroundColor: ColorField;
  illustration: IllustrationKey;
  illustrationAltText: string;
  illustrationSize?: 'm' | 'l' | 'xl';
};

export const PageHeaderBlock: ComponentConfig<PageHeaderBlockProps> = {
  label: 'Pagina Header',
  fields: {
    title: {
      label: 'Paginatitel',
      type: 'text',
    },
    backgroundColor: colorField,
    illustration: illustrationField,
    illustrationAltText: {
      label: 'Alt-tekst voor illustratie',
      type: 'text',
    },
    illustrationSize: {
      type: 'select',
      label: 'Grootte van de illustratie',
      options: [
        { label: 'Medium', value: 'm' },
        { label: 'Groot', value: 'l' },
        { label: 'Extra groot', value: 'xl' },
      ],
    },
  },
  defaultProps: {
    title: 'Welkom',
    backgroundColor: 'light-yellow',
    illustration: 'Potlood Ploeg-E (zwart-wit)',
    illustrationAltText: 'Illustratie bij paginatitel',
    illustrationSize: 'm',
  },
  render({
    title,
    backgroundColor,
    illustration,
    illustrationAltText,
    illustrationSize = 'm',
  }) {
    const imageSrc = illustrations[illustration as IllustrationKey];

    const sizeClasses = {
      m: 'sm:max-w-96',
      l: 'sm:max-w-4xl',
      xl: 'sm:max-w-full',
    };

    return (
      <header
        className="full py-12 flex flex-row sm:flex-col items-center justify-center"
        style={{ backgroundColor: getColorHex(backgroundColor) }}
      >
        <div className="skew-x-12 rotate-12">
          <Heading
            level={1}
            colorClass="text-black"
            textSizeClass="text-2xl sm:text-3xl"
          >
            {title}
          </Heading>
        </div>

        <img
          className={`max-w-64 ${sizeClasses[illustrationSize]} sm:mt-6`}
          src={`/illustraties/${imageSrc}`}
          alt={illustrationAltText}
        />
      </header>
    );
  },
};
