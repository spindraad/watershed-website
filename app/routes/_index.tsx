import type { MetaFunction } from '@remix-run/node';

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
  return <h1>Hello World!</h1>;
}
