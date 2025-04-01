import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { SupportedLanguages } from '~/config/i18n';
import { SlIcon } from '@shoelace-style/shoelace/dist/react';
import {
  convertDateToLocaleString,
  convertTimeToLocaleString,
} from '~/utils/date';

type Props = {
  /**
   * A summary of the event
   */
  summary?: PrismaJson.Localised;

  /**
   * The slug of the event page.
   */
  slug?: string;

  /**
   * The date and time of the event
   */
  date: Date;

  /**
   * The address of the event
   */
  address: string;
};

export default function EventSummary({ summary, slug, date, address }: Props) {
  const { t, i18n } = useTranslation('EventSummary');
  const { SlButton } = useContext(ShoelaceContext);

  const locale = i18n.language as SupportedLanguages;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl">{t('Title')}</h3>
      {summary ?
        <p>{summary[locale]}</p>
      : null}

      <ul className="flex flex-row flex-wrap gap-6">
        <li className="flex flex-row gap-2">
          <SlIcon name="calendar" /> {convertDateToLocaleString(date)}
        </li>
        <li className="flex flex-row gap-2">
          <SlIcon name="clock" /> {convertTimeToLocaleString(date)}
        </li>
        <li className="flex flex-row gap-2">
          <SlIcon name="marker" /> {address}
        </li>
      </ul>

      {slug ?
        <SlButton href={`/evenementen/${slug}`} size="small">
          {t('LinkButton')}
        </SlButton>
      : null}
    </div>
  );
}
