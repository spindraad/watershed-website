import { ComponentConfig } from '@puckeditor/core';

const borderImages = {
  'ZigZag Horizontaal': {
    src: 'zigzag-line-thin.svg',
    orientation: 'horizontal',
  },
  'ZigZag Verticaal': {
    src: 'zigzag-line-vertical.svg',
    orientation: 'vertical',
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
  label: 'Rand / Lijn',
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
    image: 'ZigZag Horizontaal',
    size: '100%',
    thickness: '16',
    repeat: 'round',
    align: 'center',
    justify: 'center',
  },
  render: ({
    image = 'ZigZag Horizontaal',
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
    const isHorizontal =
      imageConfig?.orientation ?
        imageConfig.orientation === 'horizontal'
      : true;

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
            width: isHorizontal ? size : `${thickness}px`,
            height: isHorizontal ? `${thickness}px` : size,
            backgroundImage: `url(/illustraties/${imageConfig.src})`,
            backgroundRepeat: repeat,
            backgroundSize: isHorizontal ? `auto 100%` : `100% auto`,
          }}
        />
      </div>
    );
  },
};
