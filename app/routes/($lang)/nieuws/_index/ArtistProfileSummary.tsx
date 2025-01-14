import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { SupportedLanguages } from '~/config/i18n';

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

export default function ArtistProfileSummary({
  imageUrl,
  name,
  profession,
  summary,
  slug,
}: Props) {
  const { t, i18n } = useTranslation('ArtistProfileSummary');
  const { SlButton } = useContext(ShoelaceContext);

  const locale = i18n.language as SupportedLanguages;

  return (
    <div className="flex flex-row gap-6">
      <div className="w-64">
        <img
          className="aspect-square w-full h-full object-contain"
          src={imageUrl}
          alt={name}
        />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl">{name}</h3>
        <p className="font-bold">{profession}</p>

        <p>{summary[locale]}</p>

        <SlButton
          className="mt-auto w-24"
          href={`/talent/${slug}`}
          size="small"
        >
          {t('LinkButton')}
        </SlButton>
      </div>
    </div>
  );
}
