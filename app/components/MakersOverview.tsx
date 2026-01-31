import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Heading from '~/components/Heading';
import Icon from '~/components/Icon';
import MakerProfileSummary from '~/components/MakerProfileSummary';
import type { SerializedMaker as Maker } from '~/models/makers.server';
import { SupportedLanguages } from '~/config/i18n';

export type MakerDetails = Pick<
  Maker,
  'id' | 'name' | 'profession' | 'summary' | 'slug' | 'imageUrl'
>;

type Props = {
  makers: MakerDetails[];
};

export default function MakersOverview({ makers }: Props) {
  const { t, i18n } = useTranslation('MakersOverview');
  const scrollContainerRef = useRef<HTMLUListElement>(null);
  const locale = i18n.language as SupportedLanguages;

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 200;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="@container relative">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center relative">
          <Icon name="heading-arrow" />
          <Heading level={2} textSizeClass="text-xl">
            {t('heading')}
          </Heading>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={t('scrollLeft')}
          >
            <Icon name="left-caret" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={t('scrollRight')}
          >
            <Icon name="right-caret" />
          </button>
        </div>
      </div>

      <ul
        ref={scrollContainerRef}
        className="flex flex-row gap-8 mt-8 overflow-x-auto scrollbar-hide pb-4"
      >
        {makers.map((maker) => (
          <li key={maker.id} className="w-48 flex-shrink-0">
            <MakerProfileSummary
              imageUrl={
                maker.imageUrl ?
                  `/afbeelding/${maker.imageUrl}`
                : '/illustraties/placeholder-profile.png'
              }
              name={maker.name}
              profession={maker.profession[locale]}
              summary={maker.summary}
              slug={`/makers/${maker.slug}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
