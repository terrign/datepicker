import { Button } from 'components/UI/Button';
import { CalendarIcon, ClearIcon } from 'components/UI/Icons';
import { ActionType } from 'context/App/types';
import { withValidation } from 'decorators/DateInput/withValidation';
import { useApp } from 'hooks/useApp';
import { useEventListener } from 'hooks/useEventListener';
import {
  DetailedHTMLProps,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { StyledDateInput } from './styled';

export interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onDateSelect?: (value: string | null) => void;
}

export const BaseDateInput = forwardRef<HTMLInputElement, DateInputProps>(function DateInput(
  { onDateSelect, style, className, onBlur, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement>(null);
  const { calendarVisible, dispatch, selectedDate, onError } = useApp();

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const handleClear = () => {
    const input = innerRef.current;
    if (input) {
      input.value = '';
      if (onDateSelect) {
        onDateSelect(null);
        dispatch({ type: ActionType.SET_DATE, payload: null });
      }
    }
  };

  const onDateSelectHandler = (event: Event) => {
    const dateString = (event.target as HTMLInputElement).value;
    try {
      if (onDateSelect) {
        onDateSelect(dateString);
      }

      dispatch({ type: ActionType.SET_DATE, payload: dateString });
    } catch (error) {
      if (error instanceof Error && onError) {
        onError(error);
      }
    }
  };

  useEventListener(innerRef, 'change', onDateSelectHandler);

  useEffect(() => {
    const input = innerRef.current;
    if (input && selectedDate && input.value !== selectedDate) {
      input.value = selectedDate;
    }
  }, [selectedDate]);

  const handleCalendar = () => {
    dispatch({ type: ActionType.HIDE_SHOW_CALENDAR, payload: !calendarVisible });
  };

  const blurHandler = (event: FocusEvent<HTMLInputElement, Element>) => {
    if (onBlur) {
      onBlur(event);
    }
    event.currentTarget.value = selectedDate ?? '';
  };

  return (
    <StyledDateInput style={style} className={className}>
      <Button $nohover type="button" onClick={handleCalendar} data-testid="calendarButton">
        <CalendarIcon />
      </Button>
      <input placeholder="Choose Date" ref={innerRef} {...rest} onBlur={blurHandler} />
      <Button $nohover type="button" onClick={handleClear} data-testid="clearButton">
        <ClearIcon />
      </Button>
    </StyledDateInput>
  );
});

export const DateInput = withValidation(BaseDateInput);
