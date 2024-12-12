import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import { SupportedLanguages } from '~/config/i18n';

type Props = {
  /**
   * The project summary
   */
  summary: PrismaJson.Localised;

  /**
   * The slug of the project
   */
  slug: string;
};

export default function ProjectSummary({ summary, slug }: Props) {
  const { t, i18n } = useTranslation('ProjectSummary');
  const { SlButton } = useContext(ShoelaceContext);

  const locale = i18n.language as SupportedLanguages;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl">{t('Title')}</h3>
      <p>{summary[locale]}</p>
      <SlButton href={`/projecten/${slug}`} size="small">
        Meer
      </SlButton>
    </div>
  );
}
