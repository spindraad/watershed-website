import { ComponentConfig } from '@puckeditor/core';

const borderImages = {
  'ZigZag Verticaal': {
    src: 'zigzag-line-vertical.svg',
  },
} as const;

type BorderImageKey = keyof typeof borderImages;

const repeatOptions = [
  { label: 'Aanpassen (round)', value: 'round' },
  { label: 'Herhalen', value: 'repeat' },
  { label: 'Met ruimte', value: 'space' },
  { label: 'Niet herhalen', value: 'no-repeat' },
];

const alignmentMap = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

const justifyMap = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
};

export type BorderBlockProps = {
  image?: BorderImageKey;
  size?: string;
  thickness?: string;
  repeat?: 'repeat' | 'round' | 'space' | 'no-repeat';
  align?: 'left' | 'center' | 'right';
  justify?: 'top' | 'center' | 'bottom';
};

export const BorderBlock: ComponentConfig<BorderBlockProps> = {
  label: 'Verticale Lijn',
  fields: {
    image: {
      label: 'Patroon',
      type: 'select',
      options: Object.keys(borderImages).map((key) => ({
        label: key,
        value: key,
      })),
    },
    size: {
      label: 'Lengte',
      type: 'text',
    },
    thickness: {
      label: 'Dikte (px)',
      type: 'text',
    },
    repeat: {
      label: 'Herhaling',
      type: 'select',
      options: repeatOptions,
    },
    align: {
      label: 'Horizontale uitlijning',
      type: 'radio',
      options: [
        { label: 'Links', value: 'left' },
        { label: 'Midden', value: 'center' },
        { label: 'Rechts', value: 'right' },
      ],
    },
    justify: {
      label: 'Verticale uitlijning',
      type: 'radio',
      options: [
        { label: 'Boven', value: 'top' },
        { label: 'Midden', value: 'center' },
        { label: 'Onder', value: 'bottom' },
      ],
    },
  },
  defaultProps: {
    image: 'ZigZag Verticaal',
    size: '100%',
    thickness: '16',
    repeat: 'round',
    align: 'center',
    justify: 'center',
  },
  render: ({
    image = 'ZigZag Verticaal',
    size = '100%',
    thickness = '16',
    repeat = 'round',
    align = 'center',
    justify = 'center',
  }) => {
    if (!image || !borderImages[image]) {
      return <></>;
    }

    const imageConfig = borderImages[image as BorderImageKey];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignmentMap[align],
          justifyContent: justifyMap[justify],
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            width: `${thickness}px`,
            height: size,
            backgroundImage: `url(/illustraties/${imageConfig.src})`,
            backgroundRepeat: repeat,
            backgroundSize: `100% auto`,
          }}
        />
      </div>
    );
  },
};
