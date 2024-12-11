import { useTranslation } from 'react-i18next';

export default function NewsOverviewRoute() {
  const { t } = useTranslation('NewsOverviewRoute');

  return (
    <div className="content space-y-4">
      <h1>{t('Title')}</h1>
    </div>
  );
}
