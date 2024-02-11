import { SATURDAY_INDEX, SUNDAY_INDEX } from '@constants';
import { DateStringOrNull } from '@types';
import { getUTCDatefromDateString, isNullDate, isValidDate, isValidDateStringFormat } from '@utils';
import { BaseDateInput } from 'components/DateInput';
import { ActionType } from 'context/App/types';
import { useApp } from 'hooks/useApp';
import {
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  useCallback,
} from 'react';

const enum DateInputError {
  WEEKEND_DISABLED = 'Weekends are disabled',
  RANGE = 'Date is out of available range',
  INVALID_DATE = 'Invalid date',
  INVALID_FORMAT = 'Acceptable format: yyyy-mm-dd',
}

interface DateInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  onDateSelect?: (date: DateStringOrNull) => void;
}
type BaseDateInputType = typeof BaseDateInput;

type DateInputType = ForwardRefExoticComponent<Omit<DateInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>;

export const withValidation = (Component: BaseDateInputType) => {
  const Wrapper: DateInputType = forwardRef<HTMLInputElement, DateInputProps>(
    ({ onDateSelect, onChange, ...rest }, ref) => {
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
            setError(DateInputError.INVALID_DATE);
            return;
          }

          if (!isValidDateStringFormat(dateString)) {
            setError(DateInputError.INVALID_FORMAT);
            return;
          }

          const dateObject = getUTCDatefromDateString(dateString);

          if (minDate) {
            if (dateObject && dateObject < getUTCDatefromDateString(minDate)) {
              setError(DateInputError.RANGE);
              return;
            }
          }

          if (maxDate) {
            if (dateObject > getUTCDatefromDateString(maxDate)) {
              setError(DateInputError.RANGE);
              return;
            }
          }

          if (disableWeekends && (dateObject.getDay() === SUNDAY_INDEX || dateObject.getDay() === SATURDAY_INDEX)) {
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
        [maxDate, minDate, disableWeekends, onDateSelect, dispatch],
      );

      const withValidationOnChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: ActionType.SET_VALIDATION_ERROR, payload: null });
          if (onChange) {
            onChange(event);
          }
        },
        [onChange, dispatch],
      );

      return (
        <Component
          {...rest}
          ref={ref}
          onDateSelect={withValidationDateSelectHandler}
          onChange={withValidationOnChange}
        />
      );
    },
  );
  Wrapper.displayName = 'DateInput';
  return Wrapper;
};
