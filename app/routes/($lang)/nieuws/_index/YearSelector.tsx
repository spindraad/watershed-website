import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ShoelaceContext } from '~/components/shoelace';

type Props = {
  /**
   * The years that are selectable.
   */
  years: number[];

  /**
   * Handler for the selected year
   */
  selectedYearHandler: (year: number) => void;
};

export default function YearSelector({ years, selectedYearHandler }: Props) {
  const { SlButton, SlButtonGroup } = useContext(ShoelaceContext);
  const { t } = useTranslation('YearSelectorComponent');

  return (
    <>
      <h3>{t('Title')}</h3>
      <SlButtonGroup>
        {years.map((year, index) => (
          <SlButton key={index} onClick={() => selectedYearHandler(year)}>
            {year}
          </SlButton>
        ))}
      </SlButtonGroup>
    </>
  );
}
