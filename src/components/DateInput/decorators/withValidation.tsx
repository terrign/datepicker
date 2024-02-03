import { getUTCDatefromDateString, validateDateString } from '@utils';
import { DateInputProps } from 'components/DateInput';
import { DateInputError } from 'components/DateInput/types';
import { useApp } from 'context/App';
import { ChangeEventHandler, forwardRef, ForwardRefExoticComponent, RefAttributes, useCallback, useState } from 'react';

export interface WithValidationHOCProps extends Omit<DateInputProps, 'removeError'> {}

export interface WithValidationType {
  (
    Component: ForwardRefExoticComponent<DateInputProps & RefAttributes<HTMLInputElement>>,
  ): ForwardRefExoticComponent<WithValidationHOCProps & RefAttributes<HTMLInputElement>>;
}

export const withValidation: WithValidationType = (Component) => {
  const Wrapper: ForwardRefExoticComponent<WithValidationHOCProps & RefAttributes<HTMLInputElement>> = forwardRef<
    HTMLInputElement,
    WithValidationHOCProps
  >(({ onDateSelect, onChange, clearHandler, ...rest }, ref) => {
    const [errorMessage, setErrorMessage] = useState('');
    const { minDate, maxDate } = useApp();

    const removeError = () => {
      setErrorMessage('');
    };
    const withValidationDateSelectHandler = useCallback(
      (dateString: string) => {
        const date = getUTCDatefromDateString(dateString);

        try {
          validateDateString(dateString);
        } catch (e) {
          if (e instanceof Error) {
            setErrorMessage(DateInputError.FORMAT);
          }
          throw e;
        }

        if (minDate) {
          if (date < getUTCDatefromDateString(minDate)) {
            setErrorMessage(DateInputError.RANGE);
            throw new Error(DateInputError.RANGE);
          }
        }

        if (maxDate) {
          if (date > getUTCDatefromDateString(maxDate)) {
            setErrorMessage(DateInputError.RANGE);
            throw new Error(DateInputError.RANGE);
          }
        }
        removeError();
        if (onDateSelect) {
          onDateSelect(dateString);
        }
      },
      [maxDate, minDate, onDateSelect],
    );

    const withValidationChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
      removeError();
      if (onChange) {
        onChange(event);
      }
    };

    const withValidationClearHandler = () => {
      removeError();
      if (clearHandler) {
        clearHandler();
      }
    };

    return (
      <Component
        {...rest}
        ref={ref}
        onChange={withValidationChangeHandler}
        errorMessage={errorMessage}
        clearHandler={withValidationClearHandler}
        onDateSelect={withValidationDateSelectHandler}
      />
    );
  });
  Wrapper.displayName = 'DateInput';
  return Wrapper;
};
