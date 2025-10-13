import { ReactNode } from 'react';
import HandDrawnBox from '~/components/HandDrawnBox';

type Props = {
  children?: ReactNode;
  classes?: string;
};

export default function PostItNote({ children, classes = '' }: Props) {
  return (
    <HandDrawnBox
      drawStyle="solid"
      padding="p-2"
      background="bg-surface-primary"
      classes={`${classes} w-max`}
    >
      <span>{children}</span>
    </HandDrawnBox>
  );
}
