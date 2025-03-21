import { ComponentProps, useContext } from 'react';
import { SlInput as SlInputComponent } from '@shoelace-style/shoelace';
import { ReactWebComponent } from '@lit/react';
import { ShoelaceContext } from '~/components/shoelace';
import { SlInputEventHandlers } from '~/types/Input';

type Props = Omit<
  ComponentProps<ReactWebComponent<SlInputComponent>>,
  | 'onSlBlur'
  | 'onSlChange'
  | 'onSlClear'
  | 'onSlFocus'
  | 'onSlInput'
  | 'onSlInvalid'
> &
  SlInputEventHandlers & {
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
