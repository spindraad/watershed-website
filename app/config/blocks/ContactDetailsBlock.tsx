import { ComponentConfig } from '@puckeditor/core';
import ContactDetails from '~/components/ContactDetails';

export type ContactDetailsBlockProps = object;

export const ContactDetailsBlock: ComponentConfig<ContactDetailsBlockProps> = {
  label: 'Contact gegevens',
  render() {
    return <ContactDetails />;
  },
};
