import { ActionType } from 'context/App/types';
import { withDayContextMenu } from 'decorators/Calendar/withDayContextMenu';
import { withDefaultDays } from 'decorators/Calendar/withDefaultDays';
import { withHolidays } from 'decorators/Calendar/withHolidays';
import { useApp } from 'hooks/useApp';
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
  contextMenuOptions?: {
    label: string;
    onClick: (date: string) => void;
  }[];
  onDateSelect?: (date: string) => void;
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
