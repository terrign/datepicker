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
      const { minDate, maxDate } = useApp();

      const withValidationDateSelectHandler = useCallback(
        (dateString: string) => {
          const date = getUTCDatefromDateString(dateString);

          if (minDate) {
            if (date < getUTCDatefromDateString(minDate)) {
              throw new Error(DateInputError.RANGE);
            }
          }

          if (maxDate) {
            if (date > getUTCDatefromDateString(maxDate)) {
              throw new Error(DateInputError.RANGE);
            }
          }
          if (onDateSelect) {
            onDateSelect(dateString);
          }
        },
        [maxDate, minDate, onDateSelect],
      );

      return <Component {...rest} ref={ref} onDateSelect={withValidationDateSelectHandler} />;
    },
  );
  Wrapper.displayName = 'DateInput';
  return Wrapper;
};
