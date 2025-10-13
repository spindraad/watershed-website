import { ReactNode } from 'react';

type DrawStyles = 'dotted' | 'solid';

type DrawProperties = {
  [key in DrawStyles]: {
    borderImage: string;
    imageSlice: string;
    imageWidth?: string;
    imageRepeat?: string;
    width?: string;
  };
};

const drawStyles: DrawProperties = {
  dotted: {
    borderImage: 'url("/illustraties/dotted-box.svg")',
    imageSlice: '10%',
    imageWidth: '10px',
    imageRepeat: 'round',
  },
  solid: {
    borderImage: 'url("/illustraties/drawn-box.svg")',
    imageSlice: '10%',
    imageWidth: '10px',
    imageRepeat: 'round',
  },
};

type Props = {
  drawStyle: DrawStyles;
  children: ReactNode;
  padding?: string;
  background?: string;
  classes?: string;
};

export default function HandDrawnBox({
  drawStyle,
  children,
  padding = 'p-4',
  background = 'transparent',
  classes = '',
}: Props) {
  const style = drawStyles[drawStyle];

  return (
    <div
      className={`${padding} ${background} ${classes} border border-black border-solid bg-clip-padding`}
      style={{
        borderImageSource: style.borderImage,
        borderImageSlice: style.imageSlice,
        borderImageWidth: style.imageWidth || '1',
        borderWidth: style.width || 'medium',
        borderImageRepeat: style.imageRepeat || 'round',
      }}
    >
      {children}
    </div>
  );
}
