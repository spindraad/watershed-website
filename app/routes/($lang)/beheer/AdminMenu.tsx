import { useTranslation } from 'react-i18next';
import SubMenu from '~/components/SubMenu';
import SubMenuItem from '~/components/SubMenuItem';
import { Link } from 'react-router';

export default function AdminMenu() {
  const { t } = useTranslation('AdminMenu');

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">{t('Title')}</h2>

      <SubMenu title={t('Pages.Title')}>
        <SubMenuItem icon="card-list" to="paginas">
          {t('Pages.List')}
        </SubMenuItem>
        <SubMenuItem icon="plus-square" to="paginas/nieuw">
          {t('Pages.Create')}
        </SubMenuItem>
      </SubMenu>

      <SubMenu title={t('Events.Title')}>
        <SubMenuItem icon="card-list" to="evenementen">
          {t('Events.List')}
        </SubMenuItem>
        <SubMenuItem icon="plus-square" to="evenementen/nieuw">
          {t('Events.Create')}
        </SubMenuItem>
      </SubMenu>

      <SubMenu title={t('Projects.Title')}>
        <SubMenuItem icon="card-list" to="projecten">
          {t('Projects.List')}
        </SubMenuItem>
        <SubMenuItem icon="plus-square" to="projecten/nieuw">
          {t('Projects.Create')}
        </SubMenuItem>
      </SubMenu>

      <Link to="/account">Mijn account</Link>
    </div>
  );
}
