import { StyledWeek } from 'components/Calendar/Weekdays/styled';
import { useApp } from 'context/App';

import { getWeekDays } from './constants';

export const WeekDays = () => {
  const { weekStart } = useApp();
  const days = getWeekDays(weekStart);

  return (
    <StyledWeek>
      {days.map((day) => (
        <div key={day}>{day}</div>
      ))}
    </StyledWeek>
  );
};
