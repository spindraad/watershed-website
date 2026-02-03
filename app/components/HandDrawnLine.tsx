export type DrawStyles =
  | 'dotted-1'
  | 'dotted-2'
  | 'solid-regular-1'
  | 'solid-regular-2'
  | 'solid-regular-3'
  | 'solid-thick-1'
  | 'solid-thick-2'
  | 'solid-thick-3'
  | 'solid-thin-1'
  | 'solid-thin-2'
  | 'twirly-small'
  | 'twirly-large'
  | 'wonky'
  | 'zigzag-thin'
  | 'zigzag-thick';

type DrawProperties = {
  [key in DrawStyles]: {
    borderImage: string;
    imageSlice: string;
    imageWidth: string;
    repeat?: string;
  };
};

const drawStyles: DrawProperties = {
  'dotted-1': {
    borderImage: 'url("/illustraties/dotted-line-1.svg")',
    imageSlice: '15',
    imageWidth: '20',
  },
  'dotted-2': {
    borderImage: 'url("/illustraties/dotted-line-2.svg")',
    imageSlice: '15',
    imageWidth: '20',
  },
  'solid-regular-1': {
    borderImage: 'url("/illustraties/solid-line-regular-1.svg")',
    imageSlice: '10',
    imageWidth: '20px',
  },
  'solid-regular-2': {
    borderImage: 'url("/illustraties/solid-line-regular-2.svg")',
    imageSlice: '10',
    imageWidth: '20px',
  },
  'solid-regular-3': {
    borderImage: 'url("/illustraties/solid-line-regular-3.svg")',
    imageSlice: '10',
    imageWidth: '20px',
  },
  'solid-thick-1': {
    borderImage: 'url("/illustraties/solid-line-thick-1.svg")',
    imageSlice: '10',
    imageWidth: '20px',
  },
  'solid-thick-2': {
    borderImage: 'url("/illustraties/solid-line-thick-2.svg")',
    imageSlice: '10',
    imageWidth: '20px',
  },
  'solid-thick-3': {
    borderImage: 'url("/illustraties/solid-line-thick-3.svg")',
    imageSlice: '10',
    imageWidth: '20px',
  },
  'solid-thin-1': {
    borderImage: 'url("/illustraties/solid-line-thin-1.svg")',
    imageSlice: '10',
    imageWidth: '20',
  },
  'solid-thin-2': {
    borderImage: 'url("/illustraties/solid-line-thin-2.svg")',
    imageSlice: '10',
    imageWidth: '20',
  },
  'twirly-small': {
    borderImage: 'url("/illustraties/twirly-line-small.svg")',
    imageSlice: '25',
    imageWidth: '30',
    repeat: 'round',
  },
  'twirly-large': {
    borderImage: 'url("/illustraties/twirly-line-large.svg")',
    imageSlice: '55',
    imageWidth: '20',
    repeat: 'repeat',
  },
  wonky: {
    borderImage: 'url("/illustraties/wonky-line.svg")',
    imageSlice: '30',
    imageWidth: '20',
  },
  'zigzag-thin': {
    borderImage: 'url("/illustraties/zigzag-line-thin.svg")',
    imageSlice: '20',
    imageWidth: '30',
  },
  'zigzag-thick': {
    borderImage: 'url("/illustraties/zigzag-line-thick.svg")',
    imageSlice: '20',
    imageWidth: '30',
  },
};

export type Props = {
  drawStyle: DrawStyles;
};

export default function HandDrawnLine({ drawStyle }: Props) {
  return (
    <div
      className="w-full h-4 border-t"
      style={{
        borderImageSource: drawStyles[drawStyle].borderImage,
        borderImageSlice: drawStyles[drawStyle].imageSlice,
        borderImageWidth: drawStyles[drawStyle].imageWidth,
        borderImageRepeat: drawStyles[drawStyle].repeat || 'stretch',
      }}
    />
  );
}
