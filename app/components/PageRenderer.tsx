import { Data, Render } from '@puckeditor/core';
import { config } from '~/config/puck.config';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Partial<Data<any, any>>;
};

export default function PageRenderer({ data }: Props) {
  return (
    <div className="prose prose-lg max-w-full">
      <Render config={config} data={data} />
    </div>
  );
}
