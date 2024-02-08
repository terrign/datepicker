import { DatePicker } from 'components/Datepicker';
import { DatePickerInputProps } from 'components/Datepicker/types';
import { useRange } from 'hooks/useRange';
import { forwardRef, ForwardRefExoticComponent } from 'react';

export const enum RangePicker {
  FROM,
  TO,
}

export interface WithRangePicker {
  (
    type: RangePicker,
  ): (
    Component: ForwardRefExoticComponent<DatePickerInputProps & React.RefAttributes<HTMLInputElement>>,
  ) => typeof DatePicker;
}

export const withRange: WithRangePicker = (type: RangePicker) => (Component) => {
  const Wrapper = forwardRef<HTMLInputElement, DatePickerInputProps>(function DatePicker(
    { onDateSelect, ...rest },
    ref,
  ) {
    const { selectionEnd, selectionStart, setSelectionEnd, setSelectionStart } = useRange();

    if (!setSelectionEnd || !setSelectionStart) {
      return <Component {...rest} ref={ref} onDateSelect={onDateSelect} />;
    }

    const onDateSelectWithRange = (selectedDate: string | null) => {
      if (type === RangePicker.FROM && setSelectionStart) {
        if (selectionEnd && selectedDate && selectedDate >= selectionEnd) {
          throw new Error('Selection start >= selection end');
        } else {
          setSelectionStart(selectedDate);
          if (onDateSelect) {
            onDateSelect(selectedDate);
          }
        }
      }

      if (type === RangePicker.TO) {
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

    const defaultDate = type === RangePicker.FROM ? selectionStart : selectionEnd;

    return <Component {...rest} ref={ref} onDateSelect={onDateSelectWithRange} defaultSelectedDate={defaultDate} />;
  });
  Wrapper.displayName = `DatePicker.${type}`;
  return Wrapper;
};
