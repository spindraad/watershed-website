export type Props = {
  /**
   * The level of the heading.
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;

  /**
   * The text of the heading.
   */
  children: string | string[];
};

export default function Heading({ level, children }: Props) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  let textSize = 'text-base';
  switch (level) {
    case 1:
      textSize = 'text-4xl';
      break;
    case 2:
      textSize = 'text-3xl';
      break;
    case 3:
      textSize = 'text-2xl';
      break;
    case 4:
      textSize = 'text-xl';
      break;
    case 5:
      textSize = 'text-lg';
      break;
  }

  const classes = `font-bold text-secondary ${textSize}`;
  if (level === 1) {
    const additionalHeadingClasses = 'italic font-gt-haptik-rotalic';
    const dropCapLetter = children[0];
    const remainingText = children.slice(1);

    return (
      <h1 className={`${classes}`}>
        <span className={additionalHeadingClasses}>{dropCapLetter}</span>
        {remainingText}
      </h1>
    );
  }

  return <Tag className={classes}>{children}</Tag>;
}
