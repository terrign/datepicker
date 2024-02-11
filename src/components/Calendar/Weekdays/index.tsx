import { getWeekDays } from '@utils';
import { StyledWeek } from 'components/Calendar/Weekdays/styled';
import { useApp } from 'hooks/useApp';

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
