import { BaseDateInput } from '@components/DateInput';
import { SATURDAY_INDEX, SUNDAY_INDEX } from '@constants';
import { ActionType } from '@context/App/types';
import { useApp } from '@hooks/useApp';
import { DateStringOrNull } from '@types';
import { getUTCDatefromDateString, isNullDate, isValidDate, isValidDateStringFormat } from '@utils';
import { DetailedHTMLProps, forwardRef, ForwardRefExoticComponent, InputHTMLAttributes, useCallback } from 'react';

const enum DateInputError {
  WEEKEND_DISABLED = 'Weekends are disabled',
  RANGE = 'Date is out of available range',
  INVALID_FORMAT = 'Acceptable format: yyyy-mm-dd',
}

export interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onDateSelect?: (date: DateStringOrNull) => void;
}
export type BaseDateInputType = typeof BaseDateInput;

export type DateInputType = ForwardRefExoticComponent<
  Omit<DateInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>
>;

export const withValidation = (Component: BaseDateInputType) => {
  const Wrapper: DateInputType = forwardRef<HTMLInputElement, DateInputProps>(({ onDateSelect, ...rest }, ref) => {
    const { minDate, maxDate, disableWeekends, dispatch } = useApp();

    const withValidationDateSelectHandler = useCallback(
      (dateString: DateStringOrNull) => {
        const setError = (error: string | null) => {
          dispatch({ type: ActionType.SET_VALIDATION_ERROR, payload: error });
        };

        const setDate = (error: string | null) => {
          dispatch({ type: ActionType.SET_DATE, payload: error });
        };

        if (isNullDate(dateString) || dateString === '') {
          setError(null);
          setDate(null);
          if (onDateSelect) {
            onDateSelect(null);
          }
          return;
        }

        if (!isValidDate(dateString)) {
          setError(DateInputError.INVALID_FORMAT);
          return;
        }

        if (!isValidDateStringFormat(dateString)) {
          setError(DateInputError.INVALID_FORMAT);
          return;
        }

        const inputDateObject = getUTCDatefromDateString(dateString);

        if (minDate) {
          if (inputDateObject < getUTCDatefromDateString(minDate)) {
            setError(DateInputError.RANGE);
            return;
          }
        }

        if (maxDate) {
          if (inputDateObject > getUTCDatefromDateString(maxDate)) {
            setError(DateInputError.RANGE);
            return;
          }
        }

        const inputDateIsWeekend =
          inputDateObject.getDay() === SUNDAY_INDEX || inputDateObject.getDay() === SATURDAY_INDEX;

        if (disableWeekends && inputDateIsWeekend) {
          setError(DateInputError.WEEKEND_DISABLED);
          return;
        }

        setError(null);

        if (onDateSelect) {
          try {
            onDateSelect(dateString);
            setDate(dateString);
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
              return;
            }
          }
        }
      },
      [maxDate, minDate, disableWeekends, onDateSelect],
    );

    return <Component {...rest} ref={ref} onDateSelect={withValidationDateSelectHandler} />;
  });
  Wrapper.displayName = 'DateInput';
  return Wrapper;
};
