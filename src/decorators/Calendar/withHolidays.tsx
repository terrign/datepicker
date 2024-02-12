import { CalendarConfig, CalendarProps } from '@components/Calendar';
import { DayType } from '@components/Calendar/Day/types';
import { DaysOfTheMonthData } from '@components/Calendar/Month';
import { FC } from 'react';

export interface WithHolidaysProps extends DaysOfTheMonthData, Pick<CalendarConfig, 'holidays'> {}

export const withHolidays = (Component: FC<CalendarProps>) => {
  const Wrapper = ({ holidays, days, ...rest }: WithHolidaysProps) => {
    if (!holidays || holidays.length === 0) {
      return <Component days={days} {...rest} />;
    }
    const newDays = days.map((week) =>
      week.map((day) => {
        const { date, types } = day;
        if (holidays.includes(date)) {
          return {
            ...day,
            types: [...types, DayType.HOLIDAY],
          };
        }
        return day;
      }),
    );
    return <Component days={newDays} {...rest} />;
  };
  Wrapper.displayName = Component.name;
  return Wrapper;
};
