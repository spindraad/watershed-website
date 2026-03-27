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
        <SubMenuItem icon="list" to="menu">
          {t('Pages.Menu')}
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

      <SubMenu title={t('Makers.Title')}>
        <SubMenuItem icon="card-list" to="makers">
          {t('Makers.List')}
        </SubMenuItem>
        <SubMenuItem icon="plus-square" to="makers/nieuw">
          {t('Makers.Create')}
        </SubMenuItem>
      </SubMenu>

      <SubMenu title={t('TalentPrograms.Title')}>
        <SubMenuItem icon="card-list" to="talentprogrammas">
          {t('TalentPrograms.List')}
        </SubMenuItem>
        <SubMenuItem icon="plus-square" to="talentprogrammas/nieuw">
          {t('TalentPrograms.Create')}
        </SubMenuItem>
      </SubMenu>

      <SubMenu title={t('CandyShop.Title')}>
        <SubMenuItem icon="card-list" to="snoepwinkel-categorieen">
          {t('CandyShop.Categories')}
        </SubMenuItem>
        <SubMenuItem icon="card-list" to="snoepwinkel-items">
          {t('CandyShop.Items')}
        </SubMenuItem>
      </SubMenu>

      <SubMenu title={t('Rubrieken.Title')}>
        <SubMenuItem icon="card-list" to="rubriek-categorieen">
          {t('Rubrieken.Categories')}
        </SubMenuItem>
        <SubMenuItem icon="card-list" to="rubrieken">
          {t('Rubrieken.Items')}
        </SubMenuItem>
      </SubMenu>

      <SubMenu title={t('Media.Title')}>
        <SubMenuItem icon="images" to="media">
          {t('Media.List')}
        </SubMenuItem>
        <SubMenuItem icon="cloud-upload" to="media/uploaden">
          {t('Media.Create')}
        </SubMenuItem>
      </SubMenu>

      <Link to="/account">Mijn account</Link>
    </div>
  );
}
