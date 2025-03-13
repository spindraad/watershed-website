import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router';

type Props = {
  children: ReactNode;
  title: string;
  to?: LinkProps['to'];
};

export default function SubMenu({ children, title, to }: Props) {
  return (
    <div>
      <h3 className="text-lg font-bold">
        <LinkWrapper to={to}>{title}</LinkWrapper>
      </h3>

      <ul className="ml-2 flex flex-col gap-1">{children}</ul>
    </div>
  );
}

function LinkWrapper({ children, to }: Pick<Props, 'children' | 'to'>) {
  return to ? <Link to={to}>{children}</Link> : <> {children} </>;
}
