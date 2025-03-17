import { useContext, ComponentProps } from 'react';
import {
  SlBlurEvent,
  SlChangeEvent,
  SlClearEvent,
  SlFocusEvent,
  SlInput as SlInputComponent,
  SlInputEvent,
  SlInvalidEvent,
} from '@shoelace-style/shoelace';
import { ReactWebComponent } from '@lit/react';
import { ShoelaceContext } from '~/components/shoelace';

// Define custom event handler types
type SlInputEventHandlers = {
  onSlBlur?: (e: SlBlurEvent) => void;
  onSlChange?: (e: SlChangeEvent) => void;
  onSlClear?: (e: SlClearEvent) => void;
  onSlFocus?: (e: SlFocusEvent) => void;
  onSlInput?: (e: SlInputEvent) => void;
  onSlInvalid?: (e: SlInvalidEvent) => void;
};

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
