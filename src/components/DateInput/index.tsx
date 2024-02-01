import { withValidation } from 'components/DateInput/decorators/withValidation';
import { Button } from 'components/UI/Button';
import { CalendarIcon, ClearIcon } from 'components/UI/Icons';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

import { StyledDateInput } from './styled';

export interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errorMessage?: string;
  onDateSelect: (value: string) => void;
  clearHandler?: () => void;
}

export const BaseDateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  { errorMessage, onDateSelect, clearHandler, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement>(null);
  const { calendarVisible, dispatch } = useApp();

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const handleClear = () => {
    const input = innerRef.current;
    if (input) {
      input.value = '';
      if (clearHandler) {
        clearHandler();
      }
    }
  };

  useEffect(() => {
    const input = innerRef.current;
    if (input) {
      const listener = (event: Event) => {
        const value = (event.target as HTMLInputElement).value;
        onDateSelect(value);
        dispatch({ type: ActionType.SET_DATE, payload: new Date(value) });
      };
      input.addEventListener('change', listener);
      return () => input.removeEventListener('change', listener);
    }
  }, [innerRef, onDateSelect, dispatch]);

  const handleCalendar = () => {
    dispatch({ type: ActionType.HIDE_SHOW_CALENDAR, payload: !calendarVisible });
  };

  return (
    <StyledDateInput $errorMessage={errorMessage} $hideBottomBorder={calendarVisible}>
      <Button $nohover type="button" onClick={handleCalendar}>
        <CalendarIcon />
      </Button>
      <input placeholder="Choose Date" ref={innerRef} {...rest} />
      <Button $nohover type="button" onClick={handleClear}>
        <ClearIcon />
      </Button>
    </StyledDateInput>
  );
});

export const DateInput = withValidation(BaseDateInput);
