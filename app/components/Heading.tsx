export type Props = {
  /**
   * The level of the heading.
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The text of the heading.
   */
  children: string | string[];

  /**
   * Overwritable text size classes.
   */
  textSizeClass?: string;

  /**
   * Whether the font should be bold
   */
  bold?: boolean;
};

export default function Heading({
  level,
  children,
  bold = true,
  textSizeClass = '',
}: Props) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  let textSize;

  if (textSizeClass) {
    textSize = textSizeClass;
  } else {
    textSize = 'text-base';
    switch (level) {
      case 1:
        textSize = 'text-4xl sm:text-5xl';
        break;
      case 2:
        textSize = 'text-3xl sm:text-4xl';
        break;
      case 3:
        textSize = 'text-2xl sm:text-3xl';
        break;
      case 4:
        textSize = 'text-xl sm:text-2xl';
        break;
      case 5:
        textSize = 'text-lg sm:text-xl';
        break;
    }
  }

  const classes = `${bold ? 'font-bold' : ''} ${textSize} text-primary-700`;

  return <Tag className={classes}>{wrapUppercaseLetters(children)}</Tag>;
}

function wrapUppercaseLetters(text: string | string[]) {
  if (Array.isArray(text)) {
    text = text.join(' ');
  }

  return text
    .split(/([A-Z])/)
    .filter(Boolean)
    .map((part, index) => {
      if (part.match(/^[A-Z]+$/)) {
        return (
          <span
            key={index}
            className="italic text-primary-700 font-gt-haptik-rotalic"
          >
            {part}
          </span>
        );
      }
      return part;
    });
}
