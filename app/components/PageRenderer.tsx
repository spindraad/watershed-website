import { Data, Render } from '@measured/puck';
import { config } from '~/config/puck.config';

type Props = {
  data: Partial<Data>;
};

export default function PageRenderer({ data }: Props) {
  return (
    <div className="prose prose-lg max-w-full">
      <Render config={config} data={data} />
    </div>
  );
}
