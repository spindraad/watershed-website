export type Props = {
  name:
    | 'heading-arrow'
    | 'heart'
    | 'left-caret'
    | 'right-caret'
    | 'left-caret-color-filled'
    | 'right-caret-color-filled'
    | 'pointer'
    | 'star'
    | 'location'
    | 'mail'
    | 'phone'
    | 'arrow-left'
    | 'arrow-right'
    | 'instagram'
    | 'cloud-outward-corner'
    | 'light-bulb';
  size?: 'small' | 'normal' | string;
  classes?: string;
};

export default function Icon({ name, size = 'normal', classes = '' }: Props) {
  let sizeClasses;

  switch (size) {
    case 'small':
      sizeClasses = 'w-6 h-6';
      break;
    case 'normal':
      sizeClasses = 'w-12 h-12';
      break;
    default:
      sizeClasses = size;
  }
  console.log(
    `Rendering icon: ${name} with size: ${size} (${sizeClasses}) and classes: ${classes}`,
  );

  return (
    <span
      className={`${sizeClasses} inline-block ${classes}`}
      style={{
        backgroundImage: `url(/iconen/${name}.svg)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  );
}
