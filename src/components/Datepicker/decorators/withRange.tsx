import { DatePicker } from 'components/Datepicker';
import { DatePickerInputProps } from 'components/Datepicker/types';
import { useRange } from 'context/Range/useRange';
import { forwardRef, ForwardRefExoticComponent } from 'react';

type DatePickerInputWithRangeProps = Omit<DatePickerInputProps, 'to' | 'from'>;

export interface WithRangePicker {
  (
    type: 'from' | 'to',
  ): (
    Component: ForwardRefExoticComponent<Omit<DatePickerInputProps, 'ref'> & React.RefAttributes<HTMLInputElement>>,
  ) => typeof DatePicker;
}

export const withRange: WithRangePicker = (type: 'from' | 'to') => (Component) => {
  const Wrapper = forwardRef<HTMLInputElement, DatePickerInputWithRangeProps>(function DatePicker(
    { onDateSelect, ...rest },
    ref,
  ) {
    const { selectionEnd, selectionStart, setSelectionEnd, setSelectionStart } = useRange();

    if (!setSelectionEnd || !setSelectionStart) {
      return <Component {...rest} ref={ref} onDateSelect={onDateSelect} />;
    }

    const onDateSelectWithRange = (selectedDate: string | null) => {
      if (type === 'from' && setSelectionStart) {
        if (selectionEnd && selectedDate && selectedDate >= selectionEnd) {
          throw new Error('Selection start >= selection end');
        } else {
          setSelectionStart(selectedDate);
          if (onDateSelect) {
            onDateSelect(selectedDate);
          }
        }
      }

      if (type === 'to') {
        if (selectionStart && selectedDate && selectedDate <= selectionStart) {
          throw new Error('Selection end <= selection start');
        } else {
          setSelectionEnd(selectedDate);
          if (onDateSelect) {
            onDateSelect(selectedDate);
          }
        }
      }
    };

    const defaultDate = type === 'from' ? selectionStart : selectionEnd;

    return <Component {...rest} ref={ref} onDateSelect={onDateSelectWithRange} defaultSelectedDate={defaultDate} />;
  });
  Wrapper.displayName = `DatePicker.${type}`;
  return Wrapper;
};
