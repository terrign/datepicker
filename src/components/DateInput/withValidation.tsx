import { DateInputProps } from 'components/DateInput';
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

export interface WithValidationHOCProps extends Omit<DateInputProps, 'removeError'> {
  maxDate?: string;
  minDate?: string;
  onDateInput: (value: string) => void;
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
  >(({ maxDate, minDate, onDateInput, ...rest }, ref) => {
    const [errorMessage, setErrorMessage] = useState('');

    const removeError = () => {
      setErrorMessage('');
    };
    const innerRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    useEffect(() => {
      const input = innerRef.current;
      if (input) {
        const listener = (event: Event) => {
          const value = (event.target as HTMLInputElement).value;
          const date = new Date(value);

          if (isNaN(date.valueOf())) {
            setErrorMessage('Invalid date');
            return;
          }

          if (value.length != 10 && value.length !== 0) {
            setErrorMessage('Required date format is YYYY-MM-DD');
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
          onDateInput(value);
        };
        input.addEventListener('change', listener);
        return () => input.removeEventListener('change', listener);
      }
    }, [innerRef, onDateInput, minDate, maxDate]);

    return <Component {...rest} ref={innerRef} errorMessage={errorMessage} removeError={removeError} />;
  });
  Wrapper.displayName = 'DateInput';
  return Wrapper;
};
