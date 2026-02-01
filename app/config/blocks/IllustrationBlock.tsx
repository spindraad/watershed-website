import { CSSProperties } from 'react';
import { ComponentConfig } from '@puckeditor/core';
import { Link } from 'react-router';

const illustrations = {
  'Figuur met popbeker': 'figuur met popbeker kopie.png',
  Ganzeveer: 'ganzeveer kopie.png',
  'Hak met kauwgum': 'hak met kauwgum kopie.png',
  'Mond met potlood': 'mond met potlood.png',
  'Oor in hand': 'oor in hand.png',
  'Potlood door hart': 'potlood door hart.png',
  'Vogel met potlood en nest': 'vogel met potlood en nest.png',
  'Schreeuw (geanimeerd)': 'mouth-screaming-optimized.gif',
  Kip: 'kip.png',
  'Radio Stille Willie': 'radio-stille-willie.svg',
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
    rotation?: '0' | '90' | '180' | '270';
    flipHorizontal?: boolean;
    flipVertical?: boolean;
  };
  wrapper?: {
    width?: string;
    height?: string;
    alignment?: 'left' | 'center' | 'right';
    justify?: 'top' | 'center' | 'bottom';
  };
  link?: string;
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
        rotation: {
          label: 'Rotatie',
          type: 'radio',
          options: [
            { label: '0°', value: '0' },
            { label: '90°', value: '90' },
            { label: '180°', value: '180' },
            { label: '270°', value: '270' },
          ],
        },
        flipHorizontal: {
          label: 'Horizontaal spiegelen',
          type: 'radio',
          options: [
            { label: 'Nee', value: false },
            { label: 'Ja', value: true },
          ],
        },
        flipVertical: {
          label: 'Verticaal spiegelen',
          type: 'radio',
          options: [
            { label: 'Nee', value: false },
            { label: 'Ja', value: true },
          ],
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
        alignment: {
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
    },
    link: {
      label: 'Link (optioneel)',
      type: 'text',
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
      rotation: '0',
      flipHorizontal: false,
      flipVertical: false,
    },
    wrapper: {
      width: '100%',
      height: 'auto',
      alignment: 'center',
      justify: 'center',
    },
  },
  render: ({ illustration, image, wrapper, link }) => {
    const imageSrc = illustrations[illustration as IllustrationKey];
    const width = image?.size?.width || '100%';
    const height = image?.size?.height || 'auto';
    const left = image?.position?.left || '50%';
    const top = image?.position?.top || '50%';
    const objectFit = image?.fit || 'cover';
    const objectPosition = `${left} ${top}`;
    const rotation = image?.rotation || '0';
    const flipHorizontal = image?.flipHorizontal || false;
    const flipVertical = image?.flipVertical || false;
    const wrapperWidth = wrapper?.width || '100%';
    const wrapperHeight = wrapper?.height || 'auto';
    const alignment = wrapper?.alignment || 'center';
    const justify = wrapper?.justify || 'center';

    // Build transform string
    const transforms: string[] = [];
    if (rotation !== '0') {
      transforms.push(`rotate(${rotation}deg)`);
    }
    if (flipHorizontal) {
      transforms.push('scaleX(-1)');
    }
    if (flipVertical) {
      transforms.push('scaleY(-1)');
    }
    const transform = transforms.length > 0 ? transforms.join(' ') : undefined;

    const imageElement = (
      <img
        src={`/illustraties/${imageSrc}`}
        alt={illustration}
        style={{
          width,
          height,
          objectFit,
          objectPosition,
          transform,
        }}
      />
    );

    const content = link ? <Link to={link}>{imageElement}</Link> : imageElement;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignmentMap[alignment],
          justifyContent: justifyMap[justify],
          width: wrapperWidth,
          height: wrapperHeight,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {content}
      </div>
    );
  },
};
