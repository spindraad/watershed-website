import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { SupportedLanguages } from '~/config/i18n';
import HandDrawnBox from '~/components/HandDrawnBox';
import MarkedUpText from '~/components/MarkedUpText';

export type Props = {
  /**
   * The profile picture URl of the artist
   */
  imageUrl: string;

  /**
   * The artists' name
   */
  name: string;

  /**
   * The profession
   */
  profession: string;

  /**
   * Short artist summary
   */
  summary: PrismaJson.Localised;

  /**
   * Slug to the artists' profile
   */
  slug: string;
};

export default function MakerProfileSummary({
  imageUrl,
  name,
  profession,
  summary,
  slug,
}: Props) {
  const { i18n } = useTranslation('MakerProfileSummary');

  const locale = i18n.language as SupportedLanguages;

  return (
    <Link to={slug} className="flex flex-col gap-6">
      <HandDrawnBox drawStyle="solid" classes="bg-white">
        <img
          className="aspect-square w-full h-full object-contain"
          src={imageUrl}
          alt={name}
        />
      </HandDrawnBox>
      <div className="flex flex-col gap-0">
        <MarkedUpText>{name}</MarkedUpText>

        <p>{profession}</p>
        <p>{summary[locale]}</p>
      </div>
    </Link>
  );
}
