// import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
// import { ShoelaceContext } from '~/components/shoelace';
import { Link } from 'react-router';
import { format, isDate } from 'date-fns';
import { SupportedLanguages } from '~/config/i18n';

export type ContentTableItem = Record<
  string,
  string | Record<SupportedLanguages, string> | number | Date
>;

type Props = {
  items: ContentTableItem[];
};

export default function ContentTable({ items }: Props) {
  const {
    t,
    i18n: { language },
  } = useTranslation('ContentTable');
  // const {} = useContext(ShoelaceContext);

  const headers = Object.keys(items[0]);
  headers.push('actions');

  function parseItemValue(item: ContentTableItem, header: string) {
    const value = item[header];

    if (isDate(value)) {
      return format(value, 'dd-MM-yyyy');
    }

    if (typeof value === 'object') {
      return value[language];
    }

    return value;
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{t(`TableHeaders.${header}`)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {headers.map((header) => {
              if (header === 'actions') {
                return (
                  <td key={header}>
                    <Link to={`edit/${item.id}`}>Edit</Link>
                  </td>
                );
              }

              return <td key={header}>{parseItemValue(item, header)}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
