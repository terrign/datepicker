import { getUTCDatefromDateString, toStringDate } from '@utils';
import { DayProps } from 'components/Calendar/Day';
import { DayType } from 'components/Calendar/Day/types';
import { useApp } from 'context/App';
import { FC } from 'react';

export interface UndefinedTypeDayProps extends Omit<DayProps, 'type'> {
  types: DayType[];
  disableWeekends?: boolean;
}

export const withDefinedDayType = (Component: FC<DayProps>) => {
  const Wrapper = ({ types, disableWeekends, date, ...rest }: UndefinedTypeDayProps) => {
    const { firstDayOfTheViewMonth, selectedDate, maxDate, minDate } = useApp();

    const dateObj = getUTCDatefromDateString(date);

    const dayWeekIndex = dateObj.getDay();
    const isDisabled = () => {
      if (disableWeekends && (dayWeekIndex === 0 || dayWeekIndex === 6)) {
        return true;
      }

      if (firstDayOfTheViewMonth.getMonth() !== dateObj.getMonth()) {
        return true;
      }

      let disabled: boolean = false;

      if (maxDate) {
        const maxDateObj = getUTCDatefromDateString(maxDate);
        disabled = dateObj > maxDateObj;
      }

      if (minDate && !disabled) {
        const minDateObj = getUTCDatefromDateString(minDate);
        disabled = dateObj < minDateObj;
      }

      return disabled;
    };

    const defineType = () => {
      if (isDisabled()) {
        return DayType.DISABLED;
      }
      if (selectedDate && toStringDate(selectedDate) === date) {
        return DayType.SELECTED;
      }
      if (types.includes(DayType.HOLIDAY)) {
        return DayType.HOLIDAY;
      }

      return DayType.DEFAULT;
    };
    return <Component {...rest} type={defineType()} date={date} />;
  };
  Wrapper.displayName = 'Day';
  return Wrapper;
};
