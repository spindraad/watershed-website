import { ComponentConfig, Slot } from '@puckeditor/core';

export type BackgroundBlockProps = {
  color?: 'light-yellow' | 'bright-yellow' | 'pink' | 'dark-pink';
  content: Slot;
};

export const BackgroundBlock: ComponentConfig<BackgroundBlockProps> = {
  label: 'Achtergrond',
  fields: {
    color: {
      type: 'select',
      options: [
        { label: 'Lichtgeel', value: 'light-yellow' },
        { label: 'Fel geel', value: 'bright-yellow' },
        { label: 'Licht roze', value: 'pink' },
        { label: 'Donker roze', value: 'dark-pink' },
      ],
    },
    content: {
      type: 'slot',
    },
  },
  defaultProps: {
    color: 'light-yellow',
    content: [],
  },
  render({ color, content: Content }) {
    let backgroundColor;
    switch (color) {
      case 'light-yellow':
        backgroundColor = '#FFF9E5';
        break;
      case 'bright-yellow':
        backgroundColor = '#FFEB3B';
        break;
      case 'pink':
        backgroundColor = '#FFC0CB';
        break;
      case 'dark-pink':
        backgroundColor = '#FF6767';
        break;
      default:
        backgroundColor = '#FFFFFF';
    }

    return (
      <div
        className="relative"
        style={{ backgroundColor: backgroundColor, padding: '1rem' }}
      >
        <Content />
      </div>
    );
  },
};
