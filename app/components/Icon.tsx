type Props = {
  name:
    | 'heading-arrow'
    | 'heart'
    | 'left-caret'
    | 'right-caret'
    | 'left-caret-color-filled'
    | 'right-caret-color-filled'
    | 'pointer';
  size?: 'small' | 'normal';
};

export default function Icon({ name, size }: Props) {
  const sizeClasses = size === 'small' ? 'w-6 h-6' : 'w-12 h-12';

  return (
    <span
      className={`${sizeClasses} inline-block`}
      style={{
        backgroundImage: `url(/iconen/${name}.svg)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  );
}
