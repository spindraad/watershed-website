import type { MetaFunction } from '@remix-run/node';
import { useContext, useState } from 'react';
import { ShoelaceContext } from '~/components/shoelace';
import { Form } from '@remix-run/react';
import { useTranslation } from 'react-i18next';

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
  const { SlAlert, SlIcon, SlButton, SlInput } = useContext(ShoelaceContext);
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <div className="content">
        <h1>{t('title')}</h1>
        <SlButton onClick={() => setOpen(true)}>Toggle Alert</SlButton>
        <Form>
          <SlButton type="submit" name="lng" value="nl">
            Nederlands
          </SlButton>
          <SlButton type="submit" name="lng" value="en">
            English
          </SlButton>
          <SlButton type="submit" name="lng" value="pap">
            Papiamentu
          </SlButton>
        </Form>
      </div>
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
