import Icon, { Props as IconProps } from '~/components/Icon';
import HandDrawnLine, { DrawStyles } from '~/components/HandDrawnLine';

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

  /**
   * Custom color class for the heading
   */
  colorClass?: string;

  /**
   * Optional icon names to display before and after the heading text. These should correspond to the names defined in the Icon component.
   */
  preIconName?: IconProps['name'] | '';

  /**
   * Optional icon names to display before and after the heading text. These should correspond to the names defined in the Icon component.
   */
  postIconName?: Omit<IconProps['name'], 'cloud-outward-corner'> | '';

  /**
   * Optional hand-drawn underline style to apply to the heading. This should correspond to the styles defined in the HandDrawnLine component.
   */
  underline?: DrawStyles;
};

export default function Heading({
  level,
  children,
  bold = true,
  textSizeClass = '',
  colorClass = 'text-primary-700',
  preIconName,
  postIconName,
  underline,
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

  const classes = `m-0 ${bold ? 'font-bold' : ''} ${textSize} ${colorClass}`;

  return (
    <div>
      <div className="flex items-center gap-2 relative">
        {preIconName ?
          preIconName === 'cloud-outward-corner' ?
            <>
              <Icon
                name={preIconName}
                size="w-24 h-16"
                classes="absolute top-1/2 -translate-y-[70%] rotate-90"
              />
              <span className="w-12" />
            </>
          : <Icon name={preIconName} size="small" />
        : null}
        <Tag className={classes}>
          {wrapUppercaseLetters(children, colorClass)}
        </Tag>
        {postIconName ?
          <Icon name={postIconName as IconProps['name']} />
        : null}
      </div>

      {underline ?
        <HandDrawnLine drawStyle={underline} classes="mt-1" />
      : null}
    </div>
  );
}

function wrapUppercaseLetters(text: string | string[], colorClass: string) {
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
            className={`italic ${colorClass} font-gt-haptik-rotalic`}
          >
            {part}
          </span>
        );
      }
      return part;
    });
}
