import { useContext, ComponentProps } from 'react';
import { SlInput as SlInputComponent } from '@shoelace-style/shoelace';
import { ReactWebComponent } from '@lit/react';
import { ShoelaceContext } from '~/components/shoelace';

type Props = ComponentProps<ReactWebComponent<SlInputComponent>> & {
  error?: string[];
};

export default function Input({
  error,
  id = '',
  className = '',
  'aria-invalid': ariaInvalid = !!error,
  ...inputProps
}: Props) {
  const { SlInput, SlAlert } = useContext(ShoelaceContext);

  return (
    <div className="flex flex-col gap-4">
      <SlInput
        {...inputProps}
        id={id}
        className={`${className} ${error ? 'part-[base]:border-red-300' : ''}`}
        aria-invalid={ariaInvalid}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <SlAlert id={`${id}-error`} open={!!error} variant="danger">
        {error?.join(', ')}
      </SlAlert>
    </div>
  );
}
