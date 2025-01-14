import { ComponentProps } from 'react';
// import { useTranslation } from 'react-i18next';
import { Puck } from '@measured/puck';
// import { ShoelaceContext } from '~/components/shoelace';

import '@measured/puck/puck.css';

import { config } from '~/config/puck.config';

type Props = Pick<ComponentProps<typeof Puck>, 'data' | 'onPublish'>;

export default function PuckEditor({ data, onPublish }: Props) {
  // const { t } = useTranslation('PuckEditor');
  // const {} = useContext(ShoelaceContext);

  return <Puck config={config} data={data} onPublish={onPublish}></Puck>;
}
