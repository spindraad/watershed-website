import { ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps } from 'react-router';
import { ShoelaceContext } from '~/components/shoelace';
import { User } from '~/models/user.server';

type Props = {
  user: User;
};

export default function AccountMenu({ user }: Props) {
  const { t } = useTranslation('AccountMenu');

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        {t('Greeting', { name: user.name })}
      </h2>

      <div>
        <h3 className="font-bold">{t('AccountMenuLinks.Title')}</h3>
        <Menu>
          <MenuItem to="/account" icon="person-circle">
            {t('AccountMenuLinks.Dashboard')}
          </MenuItem>
          <MenuItem to="/account/instellingen" icon="gear">
            {t('AccountMenuLinks.Settings')}
          </MenuItem>
        </Menu>
      </div>

      <div>
        <h3 className="font-bold">{t('AdminMenuLinks.Title')}</h3>
        <Menu>
          <MenuItem to="/account" icon="calendar2-event">
            {t('AdminMenuLinks.Events')}
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

function Menu({ children }: { children: ReactNode }) {
  return <ul className="ml-2 flex flex-col gap-1">{children}</ul>;
}

function MenuItem({
  to,
  children,
  icon,
}: {
  to: LinkProps['to'];
  children: ReactNode;
  icon: string;
}) {
  const { SlIcon } = useContext(ShoelaceContext);
  return (
    <li>
      <Link className="flex flex-row gap-1 items-center" to={to}>
        <SlIcon name={icon}></SlIcon>
        {children}
      </Link>
    </li>
  );
}
