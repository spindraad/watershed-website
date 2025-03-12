// import { useContext } from 'react';
// import { useTranslation } from 'react-i18next';
// import { ShoelaceContext } from '~/components/shoelace';
import { Link } from 'react-router';
import { format, isDate } from 'date-fns';

export type ContentTableItem = Record<string, string | number | Date>;

type Props = {
  items: ContentTableItem[];
};

export default function ContentTable({ items }: Props) {
  // const { t } = useTranslation('ContentTable');
  // const {} = useContext(ShoelaceContext);

  const headers = Object.keys(items[0]);
  headers.push('actions');

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

              const value = item[header];
              return (
                <td key={header}>
                  {isDate(value) ? format(value, 'dd-MM-yyyy') : value}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
