type Props = {
  name: 'heading-arrow' | 'left-caret' | 'right-caret';
};

export default function Icon({ name }: Props) {
  return (
    <span
      className="w-12 h-12 inline-block"
      style={{
        backgroundImage: `url(/iconen/${name}.svg)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  );
}
