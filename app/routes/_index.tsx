import type { MetaFunction } from '@remix-run/node';
import { useContext, useState } from 'react';
import { ShoelaceContext } from '~/components/shoelace';

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'Literair platform | Stichting Watershed | A roof for writers | Eindhoven',
    },
    {
      name: 'description',
      content:
        'Literair platform Watershed van Stichting Watershed helpt schrijvers met literatuur. Wij zijn een podium voor schrijvers en doen aan talentontwikkeling voor schrijvers.',
    },
  ];
};

export default function Index() {
  const { SlAlert, SlIcon, SlButton } = useContext(ShoelaceContext);
  const [open, setOpen] = useState(false);

  return (
    <>
      <h1>Hello World!</h1>
      <SlButton onClick={() => setOpen(true)}>Toggle Alert</SlButton>

      <SlAlert
        duration={10000}
        countdown="rtl"
        closable
        open={open}
        onSlAfterHide={() => setOpen(false)}
      >
        <SlIcon slot="icon" name="info-circle"></SlIcon>
        This is a standard alert. You can customize its content and even the
        icon.
      </SlAlert>
    </>
  );
}
