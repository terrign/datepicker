import { DateString } from '@types';
import { ActionType } from 'context/App/types';
import { withDayContextMenu } from 'decorators/Calendar/withDayContextMenu';
import { withDefaultDays } from 'decorators/Calendar/withDefaultDays';
import { withHolidays } from 'decorators/Calendar/withHolidays';
import { withToDos } from 'decorators/Calendar/withTodos';
import { useApp } from 'hooks/useApp';
import { useEventListener } from 'hooks/useEventListener';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';

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

  enableTodos?: boolean;
  onDateSelect?: (date: DateString) => void;
}

export type CalendarProps = DaysOfTheMonthData & CalendarConfig & PropsWithChildren;

const BaseCalendar: FC<CalendarProps> = ({ days, disableWeekends, onDateSelect, children }) => {
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
      {children}
    </Container>
  );
};

export const Calendar = withDefaultDays(withToDos(withDayContextMenu(withHolidays(BaseCalendar))));
