import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';
import { useEffect } from 'react';

import { Controls } from './Controls';
import { Month } from './Month';
import { Container } from './styled';
import { WeekDays } from './Weekdays';

export const Calendar = () => {
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
      <Month />
    </Container>
  );
};
