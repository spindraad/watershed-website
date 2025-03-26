import { ComponentProps, useContext, useState } from 'react';
import { SlInput as SlInputComponent } from '@shoelace-style/shoelace';
import { ReactWebComponent } from '@lit/react';
import { format, isDate, parseISO } from 'date-fns';
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
  | 'value'
> &
  SlInputEventHandlers & {
    error?: string[];
    value?: string | Date;
  };

export default function DateInput({
  error,
  id = '',
  name = '',
  className = '',
  'aria-invalid': ariaInvalid = !!error,
  value,
  ...inputProps
}: Props) {
  const { SlInput, SlAlert } = useContext(ShoelaceContext);
  const [dateValue, setDateValue] = useState<Date | undefined>(() => {
    if (isDate(value)) {
      return value;
    }

    if (typeof value === 'string' && value) {
      return parseISO(value);
    }

    return undefined;
  });

  function handleDateChange(event: CustomEvent) {
    setDateValue(new Date((event.target as HTMLInputElement)?.value));
  }

  function formatDateForInput(date: Date | undefined) {
    if (!date) {
      return '';
    }

    return format(date, "yyyy-MM-dd'T'HH:mm");
  }

  return (
    <div className="flex flex-col gap-4">
      <SlInput
        {...inputProps}
        id={id}
        className={`${className} ${error ? 'part-[base]:border-red-300' : ''}`}
        aria-invalid={ariaInvalid}
        aria-describedby={error ? `${id}-error` : undefined}
        type="datetime-local"
        value={formatDateForInput(dateValue)}
        onSlChange={handleDateChange}
      />
      <input type="hidden" name={name} value={dateValue?.toISOString()} />
      <SlAlert id={`${id}-error`} open={!!error} variant="danger">
        {error?.join(', ')}
      </SlAlert>
    </div>
  );
}
