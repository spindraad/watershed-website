import { Link, LinkProps } from '@remix-run/react';

type Props = LinkProps;

export default function Anchor({ className, children, ...props }: Props) {
  const classes = `link ${className ?? ''}`;

  return (
    <Link className={classes} {...props}>
      {children}
    </Link>
  );
}
