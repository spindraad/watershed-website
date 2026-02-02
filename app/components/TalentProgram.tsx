import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import Icon from '~/components/Icon';
import HandDrawnBox from '~/components/HandDrawnBox';

type Props = {
  programLogoUrl: string;
  programLogoAltText?: string;
  description: string;
  moreInfoUrl: string;
};

export default function TalentProgram({
  programLogoUrl,
  description,
  moreInfoUrl,
  programLogoAltText,
}: Props) {
  const { t } = useTranslation('TalentProgram');

  return (
    <div className="flex flex-col gap-6">
      <img
        className="mx-auto h-48 w-auto"
        src={`/afbeelding/${programLogoUrl}`}
        alt={programLogoAltText || 'Talent Program Logo'}
      />

      <div className="flex flex-col justify-between">
        <p className="max-w-md">{description}</p>
        <Link className="self-end" to={moreInfoUrl}>
          <HandDrawnBox
            drawStyle="solid"
            padding="px-4 py-2"
            classes="w-fit mt-4 px-2 py-1 flex flex-row gap-1 place-items-center bg-danger-400 cursor-pointer"
          >
            <Icon name="pointer" size="small" />
            {t('MoreInfoButton.Caption')}
          </HandDrawnBox>
        </Link>
      </div>
    </div>
  );
}
