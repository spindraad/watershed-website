type Props = {
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

  const classes = `font-bold text-secondary ${
    level === 1 ? 'text-4xl'
    : level === 2 ? 'text-3xl'
    : level === 3 ? 'text-2xl'
    : level === 4 ? 'text-xl'
    : level === 5 ? 'text-lg'
    : 'text-base'
  }`;

  return <Tag className={classes}>{children}</Tag>;
}
