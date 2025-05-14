import { CSSProperties } from 'react';
import { ComponentConfig } from '@measured/puck';

const illustrations = {
  'Figuur met popbeker': 'figuur met popbeker kopie.png',
  Ganzeveer: 'ganzeveer kopie.png',
  'Hak met kauwgum': 'hak met kauwgum kopie.png',
  'Mond met potlood': 'mond met potlood.png',
  'Oor in hand': 'oor in hand.png',
  'Potlood door hart': 'potlood door hart.png',
  'Vogel met potlood en nest': 'vogel met potlood en nest.png',
} as const;

// Extract the keys as a union type
type IllustrationKey = keyof typeof illustrations;

const objectFitOptions = {
  cover:
    'Vult het frame volledig, mogelijk worden delen van de afbeelding afgesneden',
  contain:
    'Toont de hele afbeelding, mogelijk met lege ruimte aan de zijkanten',
  fill: 'Rekt de afbeelding uit om het frame volledig te vullen',
  'scale-down':
    'Toont de afbeelding op natuurlijke grootte, of kleiner indien nodig',
  none: 'Behoudt originele grootte, wordt mogelijk afgesneden',
} as const;

type ObjectFitOption = keyof typeof objectFitOptions;

export type IllustrationBlockProps = {
  illustration?: IllustrationKey;
  width?: string;
  height?: string;
  fit?: CSSProperties['objectFit'];
};

export const IllustrationBlock: ComponentConfig<IllustrationBlockProps> = {
  label: 'Illustraties',
  fields: {
    illustration: {
      type: 'select',
      options: Object.keys(illustrations).map((key) => ({
        label: key,
        value: key,
      })),
    },
    width: {
      label: 'Width',
      type: 'text',
    },
    height: {
      label: 'Height',
      type: 'text',
    },
    fit: {
      label: 'Fit',
      type: 'select',
      options: Object.keys(objectFitOptions).map((key) => ({
        label: objectFitOptions[key as ObjectFitOption],
        value: key,
      })),
    },
  },
  defaultProps: {
    illustration: 'Figuur met popbeker',
    width: '100%',
    height: 'auto',
  },
  render: ({ illustration, width, height, fit }) => {
    const imageSrc = illustrations[illustration as IllustrationKey];
    return (
      <img
        src={`/illustraties/${imageSrc}`}
        alt={illustration}
        style={{
          width: width,
          height: height,
          objectFit: fit,
        }}
      />
    );
  },
};
