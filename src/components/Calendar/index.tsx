import { DayType } from 'components/Calendar/Day/types';
import { withDefaultDays } from 'components/Calendar/decorators/withDefaultDays';
import { withHolidays } from 'components/Calendar/decorators/withHolidays';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';
import { FC, useEffect } from 'react';

import { Controls } from './Controls';
import { DaysOfTheMonthData, Month } from './Month';
import { Container } from './styled';
import { WeekDays } from './Weekdays';

export interface CalendarConfig {
  /**
   * An array of dates in yyyy-mm-dd, which should be marked as holidays
   */
  holidays?: string[];
  /**
   * Whether to disable weekends
   */
  disableWeekends?: boolean;
  /**
   * Left click modal options
   * default: []
   */
  modalOptions?: {
    label: string;
    onClick: (date: string, dayType: DayType) => void;
  }[];
}

export type CalendarProps = DaysOfTheMonthData & CalendarConfig;

const BaseCalendar: FC<CalendarProps> = ({ days, disableWeekends }) => {
  const { calendarVisible, dispatch } = useApp();

  useEffect(() => {
    const body = document.body;
    const escapePressHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch({ type: ActionType.HIDE_SHOW_CALENDAR, payload: false });
      }
    };
    body.addEventListener('keydown', escapePressHandler);
    return () => body.removeEventListener('keypress', escapePressHandler);
  }, [dispatch]);

  return (
    <Container $hidden={!calendarVisible}>
      <Controls />
      <WeekDays />
      <Month days={days} disableWeekends={disableWeekends} />
    </Container>
  );
};

export const Calendar = withDefaultDays(withHolidays(BaseCalendar));
