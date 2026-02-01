import { ComponentConfig } from '@puckeditor/core';
import { CSSProperties } from 'react';

const rotatedLogos = {
  colored: 'logo met hak rotalic paars.png',
  blackWhite: 'logo met hak rotalic ZW.png',
  bwPurple: 'logo met hak rotalic ZW roze kauwgum.png',
  coloredBlackText: 'logo met hak rotalic zwart.png',
};

const straightLogos = {
  colored: 'logo met hak w rotalic paars.png',
  blackWhite: 'logo met hak w rotalic ZW.png',
  bwPurple: 'logo met hak w rotalic ZW roze kauwgum.png',
  coloredBlackText: 'logo met hak w rotalic zwart.png',
};

const logoOptions = {
  Gekleurd: 'colored',
  'Zwart-Wit': 'blackWhite',
  'Zwart-Wit met paarse accenten': 'bwPurple',
  'Gekleurd met zwarte tekst': 'coloredBlackText',
} as const;

const objectFitOptions = {
  cover:
    'Vul het frame volledig, mogelijk worden delen van de afbeelding afgesneden',
  contain: 'Toon de hele afbeelding, mogelijk met lege ruimte aan de zijkanten',
  fill: 'Rek de afbeelding uit om het frame volledig te vullen',
  'scale-down':
    'Toon de afbeelding op natuurlijke grootte, of kleiner indien nodig',
  none: 'Behoud originele grootte, wordt mogelijk afgesneden',
} as const;

const alignmentOptions = {
  left: 'Links',
  center: 'Midden',
  right: 'Rechts',
} as const;

const justifyOptions = {
  top: 'Boven',
  center: 'Midden',
  bottom: 'Onder',
} as const;

type ObjectFitOption = keyof typeof objectFitOptions;
type AlignmentOption = keyof typeof alignmentOptions;
type JustifyOption = keyof typeof justifyOptions;

type LogoKey = keyof typeof straightLogos;

export type LogoBlockProps = {
  logoType: 'rotated' | 'straight';
  logoKey?: LogoKey;
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
    alignment?: AlignmentOption;
    justify?: JustifyOption;
  };
  wrapper?: {
    width?: string;
    height?: string;
  };
};

export const LogoBlock: ComponentConfig<LogoBlockProps> = {
  label: 'Logo',
  fields: {
    logoType: {
      label: 'Logo Type',
      type: 'select',
      options: [
        { label: 'Rotated', value: 'rotated' },
        { label: 'Straight', value: 'straight' },
      ],
    },
    logoKey: {
      label: 'Logo',
      type: 'select',
      options: Object.keys(logoOptions).map((key) => ({
        label: key,
        value: logoOptions[key as keyof typeof logoOptions],
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
        alignment: {
          label: 'Horizontale uitlijning',
          type: 'radio',
          options: Object.keys(alignmentOptions).map((key) => ({
            label: alignmentOptions[key as AlignmentOption],
            value: key,
          })),
        },
        justify: {
          label: 'Verticale uitlijning',
          type: 'radio',
          options: Object.keys(justifyOptions).map((key) => ({
            label: justifyOptions[key as JustifyOption],
            value: key,
          })),
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
    logoType: 'rotated',
    logoKey: 'colored',
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
      alignment: 'center',
      justify: 'center',
    },
    wrapper: {
      width: '100%',
      height: 'auto',
    },
  },
  render({ logoType, logoKey, image, wrapper }) {
    const logoSrc =
      logoType === 'rotated' ?
        rotatedLogos[logoKey as LogoKey]
      : straightLogos[logoKey as LogoKey];
    const width = image?.size?.width || '100%';
    const height = image?.size?.height || 'auto';
    const left = image?.position?.left || '50%';
    const top = image?.position?.top || '50%';
    const objectFit = image?.fit || 'cover';
    const objectPosition = `${left} ${top}`;
    const wrapperWidth = wrapper?.width || '100%';
    const wrapperHeight = wrapper?.height || 'auto';
    const alignment = image?.alignment || 'center';
    const justify = image?.justify || 'center';

    const alignmentMap: Record<AlignmentOption, string> = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };

    const justifyMap: Record<JustifyOption, string> = {
      top: 'flex-start',
      center: 'center',
      bottom: 'flex-end',
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: justifyMap[justify],
          alignItems: alignmentMap[alignment],
          width: wrapperWidth,
          height: wrapperHeight,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={`/logo/${logoSrc}`}
          alt="Logo van Stichting Watershed"
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
