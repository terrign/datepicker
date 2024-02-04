import { getUTCDatefromDateString, toStringDate } from '@utils';
import { withValidation } from 'components/DateInput/decorators/withValidation';
import { Button } from 'components/UI/Button';
import { CalendarIcon, ClearIcon } from 'components/UI/Icons';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useEffect, useImperativeHandle, useRef } from 'react';

import { StyledDateInput } from './styled';

export interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onDateSelect?: (value: string) => void;
  clearHandler?: () => void;
}

export const BaseDateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  { onDateSelect, clearHandler, style, className, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement>(null);
  const { calendarVisible, dispatch, selectedDate, onError } = useApp();

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const handleClear = () => {
    const input = innerRef.current;
    if (input) {
      input.value = '';
      if (clearHandler) {
        clearHandler();
        dispatch({ type: ActionType.SET_DATE, payload: null });
      }
    }
  };

  useEffect(() => {
    const input = innerRef.current;
    if (input) {
      const onDateSelectHandler = (event: Event) => {
        const dateString = (event.target as HTMLInputElement).value;
        try {
          if (onDateSelect) {
            onDateSelect(dateString);
          }
          const newDateObj = getUTCDatefromDateString(dateString);
          dispatch({ type: ActionType.SET_DATE, payload: newDateObj });
        } catch (error) {
          if (error instanceof Error && onError) {
            onError(error);
          }
        }
      };
      input.addEventListener('change', onDateSelectHandler);
      return () => input.removeEventListener('change', onDateSelectHandler);
    }
  }, [innerRef, onDateSelect, dispatch, onError]);

  useEffect(() => {
    const input = innerRef.current;
    if (input && selectedDate && input.value !== toStringDate(selectedDate)) {
      input.value = toStringDate(selectedDate);
    }
  }, [selectedDate]);

  const handleCalendar = () => {
    dispatch({ type: ActionType.HIDE_SHOW_CALENDAR, payload: !calendarVisible });
  };

  return (
    <StyledDateInput style={style} className={className}>
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
