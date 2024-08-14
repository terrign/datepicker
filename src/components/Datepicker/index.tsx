import { Calendar } from '@components/Calendar';
import { DateInput } from '@components/DateInput';
import { ErrorBoundary } from '@components/ErrorBoundary';
import { AppProvider } from '@context/App/App.provider';
import { CustomThemeProvider } from '@context/Theme/Theme.provider';
import { RangePicker, withRange } from '@decorators/Datepicker/withRange';
import { forwardRef } from 'react';

import { DatepickerContainer } from './styled';
import { DatePickerInputProps, DatePickerProps } from './types';

export const DatePicker = forwardRef<HTMLInputElement, DatePickerInputProps>(function DatePicker(
  {
    theme = 'light',
    weekStart = 'Sunday',
    maxDate = null,
    minDate = null,
    customStyles,
    calendarConfig,
    defaultSelectedDate = null,
    onDateSelect,
    ...rest
  }: DatePickerProps,
  ref,
) {
  return (
    <ErrorBoundary>
      <AppProvider
        weekStart={weekStart}
        defaultSelectedDate={defaultSelectedDate}
        disableWeekends={Boolean(calendarConfig?.disableWeekends)}
        minDate={minDate}
        maxDate={maxDate}
      >
        <CustomThemeProvider theme={theme} customStyles={customStyles}>
          <DatepickerContainer>
            <DateInput onDateSelect={onDateSelect} {...rest} ref={ref} />
            <Calendar {...calendarConfig} onDateSelect={onDateSelect} />
          </DatepickerContainer>
        </CustomThemeProvider>
      </AppProvider>
    </ErrorBoundary>
  );
});

export const DatePickerTo = withRange(RangePicker.TO)(DatePicker);

export const DatePickerFrom = withRange(RangePicker.FROM)(DatePicker);
