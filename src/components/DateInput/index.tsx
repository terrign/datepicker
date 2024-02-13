import { Button } from '@components/UI/Button';
import { CalendarIcon, ClearIcon } from '@components/UI/Icons';
import { ActionType } from '@context/App/types';
import { withValidation } from '@decorators/DateInput/withValidation';
import { useApp } from '@hooks/useApp';
import { DateStringOrNull } from '@types';
import {
  ChangeEvent,
  DetailedHTMLProps,
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import { StyledDateInput } from './styled';

export interface BaseDateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onDateSelect: (value: DateStringOrNull) => void;
}

export const BaseDateInput = forwardRef<HTMLInputElement, BaseDateInputProps>(function DateInput(
  { onDateSelect, style, className, onBlur, onChange, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLInputElement>(null);

  const { calendarVisible, dispatch, selectedDate, validationError } = useApp();

  useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

  const handleClear = () => {
    const input = innerRef.current;

    if (input) {
      onDateSelect(null);

      input.value = '';
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }

    const dateString = (event.target as HTMLInputElement).value;

    onDateSelect(dateString);
  };

  useEffect(() => {
    const input = innerRef.current;

    const selectedDateChanged = input && selectedDate && input.value !== selectedDate;

    if (selectedDateChanged) {
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

    dispatch({ type: ActionType.SET_VALIDATION_ERROR, payload: null });

    event.currentTarget.value = selectedDate ?? '';
  };

  return (
    <StyledDateInput style={style} className={className} $errorMessage={validationError ?? ''}>
      <Button $nohover type="button" onClick={handleCalendar} data-testid="calendarButton">
        <CalendarIcon />
      </Button>
      <input placeholder="Choose Date" ref={innerRef} {...rest} onBlur={blurHandler} onChange={changeHandler} />
      <Button $nohover type="button" onClick={handleClear} data-testid="clearButton">
        <ClearIcon />
      </Button>
    </StyledDateInput>
  );
});

export const DateInput = withValidation(BaseDateInput);
