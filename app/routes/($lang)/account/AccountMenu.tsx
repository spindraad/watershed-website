import { useTranslation } from 'react-i18next';
import { User } from '~/models/user.server';
import SubMenu from '~/components/SubMenu';
import SubMenuItem from '~/components/SubMenuItem';

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

      <SubMenu title={t('AccountMenuLinks.Title')}>
        <SubMenuItem to="/account" icon="person-circle">
          {t('AccountMenuLinks.Dashboard')}
        </SubMenuItem>
        <SubMenuItem to="/account/instellingen" icon="gear">
          {t('AccountMenuLinks.Settings')}
        </SubMenuItem>
      </SubMenu>

      <SubMenu title={t('AdminMenuLinks.Title')} to="/beheer">
        <SubMenuItem to="/beheer/paginas" icon="file-earmark">
          {t('AdminMenuLinks.Pages')}
        </SubMenuItem>
        <SubMenuItem to="/beheer/evenementen" icon="calendar2-event">
          {t('AdminMenuLinks.Events')}
        </SubMenuItem>
        <SubMenuItem to="/beheer/projecten" icon="kanban">
          {t('AdminMenuLinks.Projects')}
        </SubMenuItem>
        <SubMenuItem to="/beheer/makers" icon="people">
          {t('AdminMenuLinks.Makers')}
        </SubMenuItem>
        <SubMenuItem to="/beheer/talentprogrammas" icon="mortarboard">
          {t('AdminMenuLinks.TalentPrograms')}
        </SubMenuItem>
        <SubMenuItem to="/beheer/snoepwinkel-items" icon="shop">
          {t('AdminMenuLinks.CandyShop')}
        </SubMenuItem>
        <SubMenuItem to="/beheer/rubrieken" icon="bookmark">
          {t('AdminMenuLinks.Rubrieken')}
        </SubMenuItem>
      </SubMenu>
    </div>
  );
}
