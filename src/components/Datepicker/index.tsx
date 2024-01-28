import { Day } from 'components/Day';
import { DayType } from 'components/Day/types';
import { CustomThemeProvider } from 'context/Theme/Theme.provider';
import { PredefinedTheme, Theme, ThemeObject } from 'context/Theme/types';

interface DatePickerProps {
  type?: 'default' | 'range';
  theme?: Theme;
  customStyles?: Partial<ThemeObject>;
}

export const DatePicker = ({ type = 'default', theme = PredefinedTheme.LIGHT }: DatePickerProps) => {
  type;
  return (
    <CustomThemeProvider theme={theme}>
      <Day type={DayType.SELECTED} date={new Date()} />
    </CustomThemeProvider>
  );
};
