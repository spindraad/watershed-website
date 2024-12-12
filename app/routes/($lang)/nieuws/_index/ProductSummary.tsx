import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { SupportedLanguages } from '~/config/i18n';

type Props = {
  /**
   * The product cover/example image
   */
  imageUrl: string;

  /**
   * The product's image's alt text
   */
  imageAlt: string;

  /**
   * The product's creator
   */
  creator: string;

  /**
   * The product's language
   */
  language: string;

  /**
   * The summary of the product
   */
  summary: PrismaJson.Localised;

  /**
   * The slug to the products' detail page
   */
  slug: string;
};

export default function ProductSummary({
  imageUrl,
  imageAlt,
  creator,
  language,
  summary,
  slug,
}: Props) {
  const { t, i18n } = useTranslation('ProductSummary');
  const { SlButton } = useContext(ShoelaceContext);

  const locale = i18n.language as SupportedLanguages;

  const productMeta = `${creator}, ${language}`;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl">{t('Title')}</h3>
      <img
        className="w-full h-96 object-contain"
        src={imageUrl}
        alt={imageAlt}
      />

      <h4 className="text-xl">{productMeta}</h4>

      <p>{summary[locale]}</p>

      <SlButton href={`/product/${slug}`} size="small">
        {t('LinkButton')}
      </SlButton>
    </div>
  );
}
