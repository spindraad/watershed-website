import { CSSProperties } from 'react';
import { ComponentConfig } from '@puckeditor/core';

const illustrations = {
  'Figuur met popbeker': 'figuur met popbeker kopie.png',
  Ganzeveer: 'ganzeveer kopie.png',
  'Hak met kauwgum': 'hak met kauwgum kopie.png',
  'Mond met potlood': 'mond met potlood.png',
  'Oor in hand': 'oor in hand.png',
  'Potlood door hart': 'potlood door hart.png',
  'Vogel met potlood en nest': 'vogel met potlood en nest.png',
  Schreeuw: 'schreeuw.png',
} as const;

// Extract the keys as a union type
type IllustrationKey = keyof typeof illustrations;

const objectFitOptions = {
  cover:
    'Vul het frame volledig, mogelijk worden delen van de afbeelding afgesneden',
  contain: 'Toon de hele afbeelding, mogelijk met lege ruimte aan de zijkanten',
  fill: 'Rek de afbeelding uit om het frame volledig te vullen',
  'scale-down':
    'Toon de afbeelding op natuurlijke grootte, of kleiner indien nodig',
  none: 'Behoud originele grootte, wordt mogelijk afgesneden',
} as const;

type ObjectFitOption = keyof typeof objectFitOptions;

export type IllustrationBlockProps = {
  illustration?: IllustrationKey;
  image: {
    size?: {
      width?: string;
      height?: string;
    };
    fit?: CSSProperties['objectFit'];
    position?: {
      left?: string;
      top?: string;
    };
  };
  wrapper?: {
    width?: string;
    height?: string;
  };
};

export const IllustrationBlock: ComponentConfig<IllustrationBlockProps> = {
  label: 'Illustraties',
  fields: {
    illustration: {
      label: 'Illustratie',
      type: 'select',
      options: Object.keys(illustrations).map((key) => ({
        label: key,
        value: key,
      })),
    },
    image: {
      label: 'Afbeelding',
      type: 'object',
      objectFields: {
        size: {
          type: 'object',
          label: 'Afbeeldingsgrootte (in % of px)',
          objectFields: {
            width: {
              label: 'Breedte',
              type: 'text',
            },
            height: {
              label: 'Hoogte',
              type: 'text',
            },
          },
        },
        fit: {
          label: 'Fit',
          type: 'radio',
          options: Object.keys(objectFitOptions).map((key) => ({
            label: objectFitOptions[key as ObjectFitOption],
            value: key,
          })),
        },
        position: {
          type: 'object',
          label: 'Positie',
          objectFields: {
            left: {
              label: 'Links',
              type: 'text',
            },
            top: {
              label: 'Boven',
              type: 'text',
            },
          },
        },
      },
    },
    wrapper: {
      type: 'object',
      label: 'Blok grootte (in % of px)',
      objectFields: {
        width: {
          label: 'Breedte',
          type: 'text',
        },
        height: {
          label: 'Hoogte',
          type: 'text',
        },
      },
    },
  },
  defaultProps: {
    illustration: 'Figuur met popbeker',
    image: {
      size: {
        width: '100%',
        height: 'auto',
      },
      fit: 'cover',
      position: {
        left: '50%',
        top: '50%',
      },
    },
    wrapper: {
      width: '100%',
      height: 'auto',
    },
  },
  render: ({ illustration, image, wrapper }) => {
    const imageSrc = illustrations[illustration as IllustrationKey];
    const width = image?.size?.width || '100%';
    const height = image?.size?.height || 'auto';
    const left = image?.position?.left || '50%';
    const top = image?.position?.top || '50%';
    const objectFit = image?.fit || 'cover';
    const objectPosition = `${left} ${top}`;
    const wrapperWidth = wrapper?.width || '100%';
    const wrapperHeight = wrapper?.height || 'auto';

    return (
      <div
        style={{
          width: wrapperWidth,
          height: wrapperHeight,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={`/illustraties/${imageSrc}`}
          alt={illustration}
          style={{
            width,
            height,
            objectFit,
            objectPosition,
          }}
        />
      </div>
    );
  },
};
