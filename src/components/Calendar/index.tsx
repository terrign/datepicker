import { withDayContextMenu } from 'components/Calendar/decorators/withDayContextMenu';
import { withDefaultDays } from 'components/Calendar/decorators/withDefaultDays';
import { withHolidays } from 'components/Calendar/decorators/withHolidays';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';
import { FC, useEffect, useRef } from 'react';

import { Controls } from './Controls';
import { DaysOfTheMonthData, Month } from './Month';
import { Container } from './styled';
import { WeekDays } from './Weekdays';

export interface CalendarConfig {
  /**
   * An array of dates in yyyy-mm-dd format, which should be marked as holidays
   */
  holidays?: string[];
  /**
   * Whether to disable weekends
   */
  disableWeekends?: boolean;
  /**
   * Day left click modal options
   * default: []
   */
  onDateSelect?: (date: string) => void;
  modalOptions?: {
    label: string;
    onClick: (date: string) => void;
  }[];
}

export type CalendarProps = DaysOfTheMonthData & CalendarConfig;

const BaseCalendar: FC<CalendarProps> = ({ days, disableWeekends, onDateSelect }) => {
  const { calendarVisible, dispatch } = useApp();
  const calendarContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    dispatch({ type: ActionType.SET_CALENDAR_REF, payload: calendarContainerRef });
  }, [calendarContainerRef, dispatch]);

  return (
    <Container $hidden={!calendarVisible} ref={calendarContainerRef}>
      <Controls />
      <WeekDays />
      <Month days={days} disableWeekends={disableWeekends} onDateSelect={onDateSelect} />
    </Container>
  );
};

export const Calendar = withDefaultDays(withDayContextMenu(withHolidays(BaseCalendar)));
