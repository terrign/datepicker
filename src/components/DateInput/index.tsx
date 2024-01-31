import { withValidation } from 'components/DateInput/withValidation';
import { Button } from 'components/UI/Button';
import { CalendarIcon, ClearIcon } from 'components/UI/Icons';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useImperativeHandle, useRef } from 'react';

import { StyledDateInput } from './styled';

export interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  clearHandler?: () => void;
  calendarIconHandler?: () => void;
  errorMessage?: string;
  removeError?: () => void;
}

export const BaseDateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  { clearHandler, calendarIconHandler, errorMessage, removeError, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const handleClear = () => {
    const input = innerRef.current;
    if (input) {
      input.value = '';
      if (removeError) {
        removeError();
      }
    }
    if (clearHandler) {
      clearHandler();
    }
  };

  const handleCalendar = () => {
    if (calendarIconHandler) {
      calendarIconHandler();
    }
  };

  return (
    <StyledDateInput $errorMessage={errorMessage}>
      <Button $nohover type="button" onClick={handleCalendar}>
        <CalendarIcon />
      </Button>
      <input placeholder="Choose Date" ref={innerRef} onChange={removeError} {...rest} />
      <Button $nohover type="button" onClick={handleClear}>
        <ClearIcon />
      </Button>
    </StyledDateInput>
  );
});

export const DateInput = withValidation(BaseDateInput);
