import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import Icon from '~/components/Icon';
import HandDrawnBox from '~/components/HandDrawnBox';

export type Props = {
  programLogoUrl: string;
  programLogoAltText?: string;
  description: string;
  moreInfoUrl: string;
};

export default function TalentProgram({
  programLogoUrl,
  description,
  moreInfoUrl,
  programLogoAltText = 'Stichting Watershed talent programma',
}: Props) {
  const { t } = useTranslation('TalentProgram');

  return (
    <div className="@container">
      <div className="flex flex-col gap-6 @md:flex-row @md:gap-12 items-center">
        <div className="flex flex-col gap-4 items-start">
          {programLogoUrl ?
            <img
              className="mx-auto h-48 w-full object-contain"
              src={`/afbeelding/${programLogoUrl}`}
              alt={programLogoAltText}
            />
          : null}

          <div
            className="
              h-1
              w-24
              border-b-2
            "
            style={{
              borderImage: 'url(/illustraties/solid-line-regular-3.svg)',
              borderImageSlice: 10,
              borderImageWidth: '20px',
            }}
          />
        </div>

        <div className="flex flex-col">
          <p className="max-w-md">{description}</p>

          <Link className="self-end mt-auto" to={moreInfoUrl}>
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
    </div>
  );
}
