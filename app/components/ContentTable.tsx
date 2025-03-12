// import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
// import { ShoelaceContext } from '~/components/shoelace';
import { Link } from 'react-router';
import { format, isDate } from 'date-fns';

export type ContentTableItem = Record<
  string,
  string | PrismaJson.Localised | number | Date
>;

type Props = {
  items: ContentTableItem[];
};

export default function ContentTable({ items }: Props) {
  const {
    i18n: { language },
  } = useTranslation('ContentTable');
  // const {} = useContext(ShoelaceContext);

  const headers = Object.keys(items[0]);
  headers.push('actions');

  function parseItemValue(item: ContentTableItem, header: string) {
    if (typeof item[header] === 'object') {
      return item[header][
        language as PrismaJson.Localised as 'nl' | 'en' | 'pap'
      ];
    }

    if (isDate(item[header])) {
      return format(item[header], 'dd-MM-yyyy');
    }

    return item[header];
  }

  return (
    <table>
      <thead>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
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
