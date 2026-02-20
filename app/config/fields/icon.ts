import type { Field } from '@puckeditor/core';
import { Props as IconProps } from '~/components/Icon';

export type IconKey = IconProps['name'] | '';

export const iconField: Field<IconKey | undefined> = {
  label: 'Icoon',
  type: 'select',
  options: [
    { label: 'Geen icoon', value: '' },
    { label: 'Pijl', value: 'heading-arrow' },
    { label: 'Hart', value: 'heart' },
    { label: 'Linker pijltje', value: 'left-caret' },
    { label: 'Rechter pijltje', value: 'right-caret' },
    { label: 'Linker pijltje gekleurd', value: 'left-caret-color-filled' },
    { label: 'Rechter pijltje gekleurd', value: 'right-caret-color-filled' },
    { label: 'Wijzer', value: 'pointer' },
    { label: 'Ster', value: 'star' },
    { label: 'Locatie', value: 'location' },
    { label: 'E-mail', value: 'mail' },
    { label: 'Telefoon', value: 'phone' },
    { label: 'Pijl naar links', value: 'arrow-left' },
    { label: 'Pijl naar rechts', value: 'arrow-right' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Wolk met uitgaande hoek', value: 'cloud-outward-corner' },
    { label: 'Gloeilamp', value: 'light-bulb' },
  ],
};
