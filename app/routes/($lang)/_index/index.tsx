import type { MetaFunction } from 'react-router';
import { useTranslation } from 'react-i18next';

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'Literair platform | Stichting Watershed | A roof for writers | Eindhoven',
    },
    {
      name: 'description',
      content:
        'Literair platform Watershed van Stichting Watershed helpt schrijvers met literatuur. Wij zijn een podium voor schrijvers en doen aan talentontwikkeling voor schrijvers.',
    },
  ];
};

export default function Index() {
  const { t } = useTranslation();

  return (
    <>
      <div className="content">
        <h1>{t('title')}</h1>
      </div>
    </>
  );
}
