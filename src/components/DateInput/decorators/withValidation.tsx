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
      (value: string) => {
        const date = new Date(value);

        if (isNaN(date.valueOf())) {
          setErrorMessage(DateInputError.INVALID);
          throw new Error(DateInputError.INVALID);
        }

        if (value.length != 10 && value.length !== 0) {
          setErrorMessage(DateInputError.FORMAT);
          throw new Error(DateInputError.FORMAT);
        }

        if (minDate) {
          if (date < new Date(minDate)) {
            setErrorMessage(DateInputError.RANGE);
            throw new Error(DateInputError.RANGE);
          }
        }

        if (maxDate) {
          if (date > new Date(maxDate)) {
            setErrorMessage(DateInputError.RANGE);
            throw new Error(DateInputError.RANGE);
          }
        }
        removeError();
        if (onDateSelect) {
          onDateSelect(value);
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
