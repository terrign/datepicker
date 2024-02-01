import { WeekStart } from '@types';
import { Calendar, CalendarConfig } from 'components/Calendar';
import { DateInput } from 'components/DateInput';
import { DatepickerContainer } from 'components/Datepicker/styled';
import { AppProvider } from 'context/App/App.provider';
import { CustomThemeProvider } from 'context/Theme/Theme.provider';
import { PredefinedTheme, ThemeObject } from 'context/Theme/types';

export interface DatePickerProps {
  type?: 'default' | 'range';
  weekStart?: WeekStart;
  theme?: PredefinedTheme;
  onDateSelect?: (date: string) => void;
  defaultSelectedDate?: string;
  customStyles?: Partial<ThemeObject>;
  maxDate?: string;
  minDate?: string;
  defaultSelectionStart?: Date;
  defaultSelectionEnd?: Date;
  calendarConfig?: CalendarConfig;
  locale?: string;
}

export const DatePicker = ({
  type = 'default',
  theme = PredefinedTheme.DARK,
  weekStart = 'Sunday',
  maxDate,
  minDate,
  customStyles,
  calendarConfig,
  defaultSelectedDate,
  onDateSelect,
}: DatePickerProps) => {
  type;

  return (
    <AppProvider weekStart={weekStart} defaultSelectedDate={defaultSelectedDate} minDate={minDate} maxDate={maxDate}>
      <CustomThemeProvider theme={theme} customStyles={customStyles}>
        <DatepickerContainer>
          <DateInput onDateSelect={onDateSelect} />
          <Calendar {...calendarConfig} />
        </DatepickerContainer>
      </CustomThemeProvider>
    </AppProvider>
  );
};
