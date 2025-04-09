import { useTranslation } from 'react-i18next';
import ArtistProfileSummary, {
  Props as ArtistProfileSummaryProps,
} from './ArtistProfileSummary';

type Props = {
  /**
   * The artists to show.
   */
  artists: ArtistProfileSummaryProps[];
};

export default function ArtistsSummary({ artists }: Props) {
  const { t } = useTranslation('ArtistsSummary');

  return (
    <div className="space-y-4">
      <h3>{t('Title', { count: artists.length })}</h3>
      {artists.map(({ imageUrl, name, profession, summary, slug }, index) => (
        <ArtistProfileSummary
          key={index}
          imageUrl={imageUrl}
          name={name}
          profession={profession}
          summary={summary}
          slug={slug}
        />
      ))}
    </div>
  );
}
