import { withValidation } from 'components/DateInput/withValidation';
import { Button } from 'components/UI/Button';
import { CalendarIcon, ClearIcon } from 'components/UI/Icons';
import { forwardRef, useImperativeHandle, useRef } from 'react';

import { StyledDateInput } from './styled';

export interface DateInputProps {
  clearHandler?: () => void;
  calendarIconHandler?: () => void;
  errorMessage?: string;
  removeError?: () => void;
}

export const BaseDateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  { clearHandler, calendarIconHandler, errorMessage, removeError },
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
      <input placeholder="Choose Date" ref={innerRef} onChange={removeError} />
      <Button $nohover type="button" onClick={handleClear}>
        <ClearIcon />
      </Button>
    </StyledDateInput>
  );
});

export const DateInput = withValidation(BaseDateInput);
