import { getUTCDatefromDateString } from '@utils';
import { DateInputProps } from 'components/DateInput';
import { DateInputError } from 'components/DateInput/types';
import { useApp } from 'context/App';
import { forwardRef, ForwardRefExoticComponent, RefAttributes, useCallback } from 'react';

export type WithValidationProps = DateInputProps & RefAttributes<HTMLInputElement>;

export interface WithValidationType {
  (Component: ForwardRefExoticComponent<WithValidationProps>): ForwardRefExoticComponent<WithValidationProps>;
}

export const withValidation: WithValidationType = (Component) => {
  const Wrapper: ForwardRefExoticComponent<WithValidationProps> = forwardRef<HTMLInputElement, WithValidationProps>(
    ({ onDateSelect, ...rest }, ref) => {
      const { minDate, maxDate, disableWeekends } = useApp();

      const withValidationDateSelectHandler = useCallback(
        (dateString: string | null) => {
          if (!dateString) {
            if (onDateSelect) {
              onDateSelect(dateString);
            }
            return;
          }
          const date = getUTCDatefromDateString(dateString);

          if (minDate) {
            if (date && date < getUTCDatefromDateString(minDate)) {
              throw new Error(DateInputError.RANGE);
            }
          }

          if (maxDate) {
            if (date > getUTCDatefromDateString(maxDate)) {
              throw new Error(DateInputError.RANGE);
            }
          }

          if (disableWeekends && date && (date.getDay() === 0 || date.getDay() === 6)) {
            throw new Error(DateInputError.WEEKEND_DISABLED);
          }

          if (onDateSelect) {
            onDateSelect(dateString);
          }
        },
        [maxDate, minDate, disableWeekends, onDateSelect],
      );

      return <Component {...rest} ref={ref} onDateSelect={withValidationDateSelectHandler} />;
    },
  );
  Wrapper.displayName = 'DateInput';
  return Wrapper;
};
