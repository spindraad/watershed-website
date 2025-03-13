import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { Link } from 'react-router';
import { format, isDate } from 'date-fns';
import { SupportedLanguages, supportedLanguages } from '~/config/i18n';
import Anchor from '~/components/Anchor';

type ItemValue = string | Record<SupportedLanguages, string> | number | Date;

type ParametrizedItemValue = {
  // The value of the item.
  value: ItemValue;

  // Is the value the name of the piece of content?
  isName: boolean;
};

export type ContentTableItem = {
  id: string;
  [key: string]: ItemValue | ParametrizedItemValue;
};

type Props = {
  items: ContentTableItem[];
};

function isSupportedLanguages(
  value: unknown,
): value is Record<SupportedLanguages, string> {
  if (typeof value !== 'object' || value === null) return false;

  // Get the keys from the value object
  const keys = Object.keys(value);

  // Check if all keys are valid supported languages
  return keys.every((key) =>
    supportedLanguages.includes(key as SupportedLanguages),
  );
}

// Write a type predicate to check if a value is of a ParametrizedItemValue type.
function isParametrizedItemValue(
  value: unknown,
): value is ParametrizedItemValue {
  if (typeof value !== 'object' || value === null) return false;
  return 'value' in value;
}

export default function ContentTable({ items }: Props) {
  const {
    t,
    i18n: { language },
  } = useTranslation('ContentTable');
  const { SlIconButton } = useContext(ShoelaceContext);

  const headers = Object.keys(items[0]).filter((header) => header !== 'id');
  headers.push('actions');

  function parseItemValue(item: ContentTableItem, header: string) {
    let value: ItemValue;

    if (isParametrizedItemValue(item[header])) {
      value = item[header].value;
    } else {
      value = item[header];
    }

    if (isDate(value)) {
      return format(value, 'dd-MM-yyyy');
    }

    if (isSupportedLanguages(value)) {
      return value[language];
    }

    return value;
  }

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="border border-gray-400 bg-gray-300">
          {headers.map((header) => (
            <th className="p-2" key={header}>
              {t(`TableHeaders.${header}`)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr
            className="border border-gray-400 bg-transparent hover:bg-gray-100 transition-colors"
            key={`${item.id}_${index}`}
          >
            {headers.map((header) => {
              if (header === 'actions') {
                return (
                  <td className="p-2" key={`${item.id}_${header}`}>
                    <Link to={`bewerken/${item.id}`}>
                      <SlIconButton name="pencil-square" />
                    </Link>
                  </td>
                );
              }

              if (
                isParametrizedItemValue(item[header]) &&
                item[header].isName
              ) {
                return (
                  <td className="p-2" key={`${item.id}_${header}`}>
                    <Anchor to={`bewerken/${item.id}`}>
                      {parseItemValue(item, header)}
                    </Anchor>
                  </td>
                );
              }

              return (
                <td className="p-2" key={`${item.id}_${header}`}>
                  {parseItemValue(item, header)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
