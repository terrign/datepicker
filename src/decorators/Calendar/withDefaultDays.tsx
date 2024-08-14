import { CalendarConfig, CalendarProps } from '@components/Calendar';
import { useApp } from '@hooks/useApp';
import { DateStringOrNull } from '@types';
import { createCalendarMonthView } from '@utils';
import { FC } from 'react';

export const withDefaultDays = (Component: FC<CalendarProps>) => {
  const Wrapper = (props: CalendarConfig & { onDateSelect?: (dateString: DateStringOrNull) => void }) => {
    const { firstDayOfTheViewMonth, weekStart } = useApp();

    const days = createCalendarMonthView(firstDayOfTheViewMonth, weekStart);

    return <Component {...props} days={days} />;
  };

  Wrapper.displayName = Component.name;

  return Wrapper;
};
