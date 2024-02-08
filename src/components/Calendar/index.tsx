import { ActionType } from 'context/App/types';
import { withDayContextMenu } from 'decorators/Calendar/withDayContextMenu';
import { withDefaultDays } from 'decorators/Calendar/withDefaultDays';
import { withHolidays } from 'decorators/Calendar/withHolidays';
import { useApp } from 'hooks/useApp';
import { useEventListener } from 'hooks/useEventListener';
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
   * Day left click CalendarModal options
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

  const escapePressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      dispatch({ type: ActionType.HIDE_SHOW_CALENDAR, payload: false });
    }
  };
  useEventListener(document.body, 'keydown', escapePressHandler);

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
