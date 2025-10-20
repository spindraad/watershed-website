import { ComponentConfig, DropZone } from '@measured/puck';

export type BackgroundBlockProps = {
  color?: 'light-yellow' | 'bright-yellow' | 'pink';
};

export const BackgroundBlock: ComponentConfig<BackgroundBlockProps> = {
  label: 'Achtergrond',
  fields: {
    color: {
      type: 'select',
      options: [
        { label: 'Lichtgeel', value: 'light-yellow' },
        { label: 'Fel geel', value: 'bright-yellow' },
        { label: 'Roze', value: 'pink' },
      ],
    },
  },
  defaultProps: {
    color: 'light-yellow',
  },
  render(props) {
    let backgroundColor;
    switch (props.color) {
      case 'light-yellow':
        backgroundColor = '#FFF9E5';
        break;
      case 'bright-yellow':
        backgroundColor = '#FFEB3B';
        break;
      case 'pink':
        backgroundColor = '#FFC0CB';
        break;
      default:
        backgroundColor = '#FFFFFF';
    }

    return (
      <div style={{ backgroundColor: backgroundColor, padding: '1rem' }}>
        <DropZone zone="background" />
      </div>
    );
  },
};
