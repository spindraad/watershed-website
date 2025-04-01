import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router';

interface AnchorBaseProps {
  anchorType?: 'link' | 'nav';
  noUnderline?: boolean;
}

interface AnchorLinkProps extends AnchorBaseProps, LinkProps {}

interface AnchorNavProps extends AnchorBaseProps, NavLinkProps {}

type Props = AnchorLinkProps | AnchorNavProps;

export default function Anchor({
  anchorType = 'link',
  noUnderline = false,
  className,
  ...anchorProps
}: Props) {
  const classes = `link ${className ?? ''} ${noUnderline ? 'no-underline' : ''}`;

  if (anchorType === 'link') {
    const { children, ...props } = anchorProps as AnchorLinkProps;
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const { children, ...props } = anchorProps as AnchorNavProps;
  return (
    <NavLink className={classes} {...props}>
      {children}
    </NavLink>
  );
}
