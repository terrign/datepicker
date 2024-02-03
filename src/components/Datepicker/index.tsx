import { WeekStart } from '@types';
import { Calendar, CalendarConfig } from 'components/Calendar';
import { DateInput } from 'components/DateInput';
import { DatepickerContainer } from 'components/Datepicker/styled';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { AppProvider } from 'context/App/App.provider';
import { CustomThemeProvider } from 'context/Theme/Theme.provider';
import { PredefinedTheme, ThemeObject } from 'context/Theme/types';

export interface DatePickerProps {
  type?: 'default' | 'range';
  /**
   * First day of the week
   */
  weekStart?: WeekStart;
  /**
   * Predefined color scheme
   */
  theme?: PredefinedTheme;
  /**
   * Callback to run on date selection, selected date in yyyy-mm-dd is provided as first argument
   */
  onDateSelect?: (date: string) => void;
  /**
   * Callback to run on date input error;
   */
  onError: (error: Error) => void;
  /**
   * Default selected date in yyyy-mm-dd format
   */
  defaultSelectedDate?: string;
  /**
   * Custom colors provided as ThemeObject
   */
  customStyles?: Partial<ThemeObject>;
  /**
   * Maximum date available for selection in yyyy-mm-dd format
   */
  maxDate?: string;
  /**
   * Minimum date available for selection in yyyy-mm-dd format
   */
  minDate?: string;
  defaultSelectionStart?: Date;
  defaultSelectionEnd?: Date;
  calendarConfig?: CalendarConfig;
  locale?: string;
}

export const DatePicker = ({
  type = 'default',
  theme = 'light',
  weekStart = 'Sunday',
  maxDate,
  minDate,
  customStyles,
  calendarConfig,
  defaultSelectedDate,
  onDateSelect,
  onError,
}: DatePickerProps) => {
  type;

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
            <DateInput onDateSelect={onDateSelect} />
            <Calendar {...calendarConfig} />
          </DatepickerContainer>
        </CustomThemeProvider>
      </AppProvider>
    </ErrorBoundary>
  );
};
