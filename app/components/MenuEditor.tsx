import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { NavigationMenuItem } from '~/components/NavigationMenu';
import Heading from '~/components/Heading';

type Props = {
  items: NavigationMenuItem[];
};

export default function MenuEditor({ items }: Props) {
  const { t } = useTranslation('MenuEditor');
  const { SlButton, SlIcon } = useContext(ShoelaceContext);

  return (
    <div className="flex flex-col gap-4">
      <Heading level={3}>{t('Title')}</Heading>
      <p>{t('Description')}</p>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-row gap-4 items-center border border-neutral-100 bg-white px-4 py-2 rounded-md"
          >
            <SlIcon name="grip-vertical" />
            <div className="flex flex-col gap-0">
              {item.title.nl}
              <span className="text-xs">{item.slug}</span>
            </div>
          </li>
        ))}
      </ul>

      <SlButton className="w-32 self-end" variant="primary" size="large">
        {t('SaveButtonCaption')}
      </SlButton>
    </div>
  );
}
