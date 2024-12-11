import { Link, LinkProps, NavLink, NavLinkProps } from '@remix-run/react';

interface AnchorBaseProps {
  anchorType?: 'link' | 'nav';
}

interface AnchorLinkProps extends AnchorBaseProps, LinkProps {}

interface AnchorNavProps extends AnchorBaseProps, NavLinkProps {}

type Props = AnchorLinkProps | AnchorNavProps;

export default function Anchor({
  anchorType = 'link',
  className,
  ...anchorProps
}: Props) {
  const classes = `link ${className ?? ''}`;

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
