import { WeekStart } from '@types';
import { Calendar } from 'components/Calendar';
import { DateInput } from 'components/DateInput';
import { DatepickerContainer } from 'components/Datepicker/styled';
import { AppProvider } from 'context/App/App.provider';
import { CustomThemeProvider } from 'context/Theme/Theme.provider';
import { PredefinedTheme, ThemeObject } from 'context/Theme/types';

export interface DatePickerProps {
  type?: 'default' | 'range';
  weekStart?: WeekStart;
  theme?: PredefinedTheme;
  customStyles?: Partial<ThemeObject>;
  maxDate?: string;
  minDate?: string;
  defaultSelectionStart?: Date;
  defaultSelectionEnd?: Date;
  locale?: string;
}

export const DatePicker = ({
  type = 'default',
  theme = PredefinedTheme.DARK,
  weekStart = 'Sunday',
  maxDate,
  minDate,
  customStyles,
}: DatePickerProps) => {
  type;

  return (
    <AppProvider weekStart={weekStart}>
      <CustomThemeProvider theme={theme} customStyles={customStyles}>
        <DatepickerContainer>
          <DateInput
            maxDate={maxDate}
            minDate={minDate}
            id={'dasdsd'}
            onDateSelect={(e) => e}
            // onChange={(e) => console.log('change', e.target.value)}
          />
          <Calendar />
        </DatepickerContainer>
      </CustomThemeProvider>
    </AppProvider>
  );
};
