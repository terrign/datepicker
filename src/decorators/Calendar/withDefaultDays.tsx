import { createCalendarMonthView } from '@utils';
import { CalendarConfig, CalendarProps } from 'components/Calendar';
import { useApp } from 'hooks/useApp';
import { FC } from 'react';

export const withDefaultDays = (Component: FC<CalendarProps>) => {
  const Wrapper = (props: CalendarConfig) => {
    const { firstDayOfTheViewMonth, weekStart } = useApp();
    const days = createCalendarMonthView(firstDayOfTheViewMonth, weekStart);
    return <Component {...props} days={days} />;
  };
  Wrapper.displayName = Component.name;
  return Wrapper;
};
