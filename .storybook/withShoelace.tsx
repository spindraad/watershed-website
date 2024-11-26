import { makeDecorator } from '@storybook/preview-api';
import { ShoelaceContext, useShoelace } from '~/components/shoelace';

function MockShoelaceProvider({ children }: { children: React.ReactNode }) {
  const shoelace = useShoelace({ URL: '' });

  return (
    <ShoelaceContext.Provider value={shoelace}>
      {children}
    </ShoelaceContext.Provider>
  );
}

export const withShoelace = makeDecorator({
  name: 'withShoelace',
  parameterName: 'shoelace',
  wrapper: (getStory, context) => {
    return (
      <MockShoelaceProvider>
        <>{getStory(context)}</>
      </MockShoelaceProvider>
    );
  },
});
