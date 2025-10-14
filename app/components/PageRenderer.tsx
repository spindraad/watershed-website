import { Render } from '@measured/puck';
import { config, WatershedPageData } from '~/config/puck.config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = {
  data: Partial<WatershedPageData>;
};

export default function PageRenderer({ data }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="prose prose-lg max-w-full">
        <Render config={config} data={data} />
      </div>
    </QueryClientProvider>
  );
}
