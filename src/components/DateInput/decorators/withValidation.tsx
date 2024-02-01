import { DateInputProps } from 'components/DateInput';
import { ChangeEventHandler, forwardRef, ForwardRefExoticComponent, RefAttributes, useCallback, useState } from 'react';

export interface WithValidationHOCProps extends Omit<DateInputProps, 'removeError'> {
  maxDate?: string;
  minDate?: string;
}

export interface WithValidationType {
  (
    Component: ForwardRefExoticComponent<DateInputProps & RefAttributes<HTMLInputElement>>,
  ): ForwardRefExoticComponent<WithValidationHOCProps & RefAttributes<HTMLInputElement>>;
}

export const withValidation: WithValidationType = (Component) => {
  const Wrapper: ForwardRefExoticComponent<WithValidationHOCProps & RefAttributes<HTMLInputElement>> = forwardRef<
    HTMLInputElement,
    WithValidationHOCProps
  >(({ maxDate, minDate, onDateSelect, onChange, clearHandler, ...rest }, ref) => {
    const [errorMessage, setErrorMessage] = useState('');

    const removeError = () => {
      setErrorMessage('');
    };
    const withValidationDateSelectHandler = useCallback(
      (value: string) => {
        const date = new Date(value);

        if (isNaN(date.valueOf())) {
          setErrorMessage('Invalid date');
          return;
        }

        if (value.length != 10 && value.length !== 0) {
          setErrorMessage('Format: yyyy-mm-dd or mm/dd/yyyy');
          return;
        }

        if (minDate) {
          if (date < new Date(minDate)) {
            setErrorMessage('Date is out of available range');
            return;
          }
        }

        if (maxDate) {
          if (date > new Date(maxDate)) {
            setErrorMessage('Date is out of available range');
            return;
          }
        }

        removeError();

        onDateSelect(value);
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
