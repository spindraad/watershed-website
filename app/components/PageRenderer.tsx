import { Render } from '@puckeditor/core';
import { config, WatershedPageData } from '~/config/puck.config';

type Props = {
  data: Partial<WatershedPageData>;
};

export default function PageRenderer({ data }: Props) {
  return (
    <div className="prose prose-lg max-w-full">
      <Render config={config} data={data} />
    </div>
  );
}
