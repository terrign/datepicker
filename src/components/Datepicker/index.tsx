import { WeekStart } from '@types';
import { Controls } from 'components/Controls';
import { Month } from 'components/Month';
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
  locale?: string;
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
          <Month />
        </Container>
      </CustomThemeProvider>
    </AppProvider>
  );
};
