import { ComponentConfig } from '@puckeditor/core';
import TalentProgram, { Props } from '~/components/TalentProgram';

export type TalentProgramBlockProps = Props;

export const TalentProgramBlock: ComponentConfig<TalentProgramBlockProps> = {
  label: 'Talent Programma',
  fields: {
    programLogoUrl: { type: 'text', label: 'Programma Logo URL' },
    programLogoAltText: { type: 'text', label: 'Alt-tekst voor het logo' },
    description: { type: 'textarea', label: 'Beschrijving' },
    moreInfoUrl: { type: 'text', label: 'Meer Informatie URL' },
  },
  render(props) {
    return <TalentProgram {...props} />;
  },
};
