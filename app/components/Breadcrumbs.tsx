import { useHref } from 'react-router';
import Anchor from '~/components/Anchor';
import { titleCase } from '~/utils/text';

export default function Breadcrumbs() {
  const href = useHref('.');

  const parts = href
    .split('/')
    .toSpliced(0, 1, 'home')
    .map((part, index, arr) => {
      let title = titleCase(part);
      title = title.replace(/-/g, ' ');

      return {
        title,
        href: `/${arr.slice(1, index + 1).join('/')}`,
        isLast: index !== arr.length - 1,
      };
    });

  return (
    <nav className="flex space-x-2 text-sm">
      {parts.map((part, index) => (
        <>
          <Anchor anchorType="nav" end key={index} to={part.href}>
            {part.title}
          </Anchor>
          {part.isLast ?
            <span>/</span>
          : null}
        </>
      ))}
    </nav>
  );
}
