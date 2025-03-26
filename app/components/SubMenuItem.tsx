import { ReactNode, useContext } from 'react';
import { Link, LinkProps } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  to: LinkProps['to'];
  children: ReactNode;
  icon: string;
};

export default function SubMenuItem({ to, children, icon }: Props) {
  const { SlIcon } = useContext(ShoelaceContext);
  return (
    <li>
      <Link className="flex flex-row gap-2 items-center" to={to}>
        <SlIcon name={icon}></SlIcon>
        {children}
      </Link>
    </li>
  );
}
