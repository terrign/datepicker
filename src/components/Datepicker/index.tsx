import { WeekStart } from '@types';
import { Controls } from 'components/Controls';
import { Day } from 'components/Day';
import { DayType } from 'components/Day/types';
import { WeekDays } from 'components/Weekdays';
import { AppProvider } from 'context/App/App.provider';
import { CustomThemeProvider } from 'context/Theme/Theme.provider';
import { PredefinedTheme, ThemeObject } from 'context/Theme/types';

import { Container } from './styled';

interface DatePickerProps {
  type?: 'default' | 'range';
  weekStart?: WeekStart;
  theme?: PredefinedTheme;
  customStyles?: Partial<ThemeObject>;
  maxDate?: Date;
  minDate?: Date;
  defaultSelectionStart?: Date;
  defaultSelectionEnd?: Date;
}

export const DatePicker = ({
  type = 'default',
  theme = PredefinedTheme.DARK,
  weekStart = WeekStart.SUNDAY,
  customStyles,
}: DatePickerProps) => {
  type;
  return (
    <AppProvider weekStart={weekStart}>
      <CustomThemeProvider theme={theme} customStyles={customStyles}>
        <Container>
          <Controls />
          <WeekDays />
          <Day type={DayType.DEFAULT} date={new Date()} />
        </Container>
      </CustomThemeProvider>
    </AppProvider>
  );
};
