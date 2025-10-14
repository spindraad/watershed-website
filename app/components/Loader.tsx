import { CSSProperties, useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  size?: 'small' | 'medium' | 'large';
};

export default function Loader({ size = 'large' }: Props) {
  const { SlSpinner } = useContext(ShoelaceContext);

  const sizeMap = {
    small: 'text-sm',
    medium: 'text-xl',
    large: 'text-4xl',
  };

  return (
    <div
      className={`flex justify-center items-center text-7xl ${sizeMap[size]}`}
    >
      <SlSpinner
        style={
          {
            '--track-width': '0.1em',
            '--track-color': 'var(--sl-color-primary-100)',
            '--indicator-color': 'var(--sl-color-primary-800)',
            '--speed': '2.5s',
          } as CSSProperties
        }
      />
    </div>
  );
}
