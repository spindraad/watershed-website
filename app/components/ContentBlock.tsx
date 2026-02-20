import Heading, { Props as HeadingProps } from '~/components/Heading';
import { ReactElement } from 'react';

export type Props = Pick<
  HeadingProps,
  'preIconName' | 'postIconName' | 'underline'
> & {
  title: string;
  body: string | ReactElement;
};

export default function ContentBlock({
  preIconName,
  postIconName,
  underline,
  title,
  body,
}: Props) {
  console.log(body);
  return (
    <div className="bg-surface p-6 flex flex-col gap-4">
      <Heading
        level={3}
        preIconName={preIconName}
        postIconName={postIconName}
        underline={underline}
      >
        {title}
      </Heading>

      {typeof body === 'string' ?
        <div dangerouslySetInnerHTML={{ __html: body }} />
      : <div>{body}</div>}
    </div>
  );
}
