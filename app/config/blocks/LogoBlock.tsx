import { ComponentConfig } from '@puckeditor/core';

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

type LogoKey = keyof typeof straightLogos;

export type LogoBlockProps = {
  logoType: 'rotated' | 'straight';
  logoKey?: LogoKey;
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
  },
  render({ logoType, logoKey }) {
    const logoSrc =
      logoType === 'rotated' ?
        rotatedLogos[logoKey as LogoKey]
      : straightLogos[logoKey as LogoKey];

    return (
      <div>
        {logoSrc ?
          <img src={`/logo/${logoSrc}`} alt="Logo" />
        : <p>Select a logo to display.</p>}
      </div>
    );
  },
};
