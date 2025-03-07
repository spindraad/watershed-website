import { ComponentProps } from 'react';
import { type Puck, Render } from '@measured/puck';
// import { ShoelaceContext } from '~/components/shoelace';
import { config } from '~/config/puck.config';

type Props = Pick<ComponentProps<typeof Puck>, 'data'>;

export default function PageRenderer({ data }: Props) {
  // const { t } = useTranslation('Renderer');
  // const {  } = useContext(ShoelaceContext);

  return <Render config={config} data={data} />;
}
