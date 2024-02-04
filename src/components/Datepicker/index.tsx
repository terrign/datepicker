import { Calendar } from 'components/Calendar';
import { DateInput } from 'components/DateInput';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { AppProvider } from 'context/App/App.provider';
import { CustomThemeProvider } from 'context/Theme/Theme.provider';
import { forwardRef } from 'react';

import { DatepickerContainer } from './styled';
import { DatePickerProps } from './types';

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
  {
    theme = 'light',
    weekStart = 'Sunday',
    maxDate,
    minDate,
    customStyles,
    calendarConfig,
    defaultSelectedDate,
    onDateSelect,
    onError,
    ...rest
  }: DatePickerProps,
  ref,
) {
  return (
    <ErrorBoundary>
      <AppProvider
        weekStart={weekStart}
        defaultSelectedDate={defaultSelectedDate}
        minDate={minDate}
        maxDate={maxDate}
        onError={onError}
      >
        <CustomThemeProvider theme={theme} customStyles={customStyles}>
          <DatepickerContainer>
            <DateInput onDateSelect={onDateSelect} {...rest} ref={ref} />
            <Calendar {...calendarConfig} />
          </DatepickerContainer>
        </CustomThemeProvider>
      </AppProvider>
    </ErrorBoundary>
  );
});
