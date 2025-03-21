import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ShoelaceContext } from '~/components/shoelace';
import { Link } from 'react-router';
import { format, isDate } from 'date-fns';
import Anchor from '~/components/Anchor';
import { isLocalisedValue, LocalisedValue } from '~/types/Content';

type ItemValue = string | LocalisedValue | number | Date;

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
  triggerDelete: (itemID: string, itemName: string) => void;
};

// Write a type predicate to check if a value is of a ParametrizedItemValue type.
function isParametrizedItemValue(
  value: unknown,
): value is ParametrizedItemValue {
  if (typeof value !== 'object' || value === null) return false;
  return 'value' in value;
}

export default function ContentTable({ items, triggerDelete }: Props) {
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

    if (isLocalisedValue(value)) {
      return value[language];
    }

    return value;
  }

  function getItemName(item: ContentTableItem) {
    let name: LocalisedValue = {};
    Object.keys(item).forEach((key) => {
      if (isParametrizedItemValue(item[key]) && item[key].isName) {
        name = item[key].value as LocalisedValue;
      }
    });

    return name[language];
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
                  <td
                    className="p-2 flex flex-row gap-2 items-center"
                    key={`${item.id}_${header}`}
                  >
                    <Link to={`bewerken/${item.id}`}>
                      <SlIconButton name="pencil-square" />
                    </Link>

                    <SlIconButton
                      name="trash3"
                      onClick={() => triggerDelete(item.id, getItemName(item))}
                    />
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
