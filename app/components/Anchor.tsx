import { Link, LinkProps } from '@remix-run/react';

type Props = LinkProps;

export default function Anchor({ className, children, ...props }: Props) {
  const classes = `border-b-2 border-secondary ${className ?? ''}`;

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
}
