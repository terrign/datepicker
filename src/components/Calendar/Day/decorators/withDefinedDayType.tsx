import { getDateParts, getUTCDatefromDateString } from '@utils';
import { DayProps } from 'components/Calendar/Day';
import { DayType } from 'components/Calendar/Day/types';
import { useApp } from 'context/App';
import { useRange } from 'context/Range/useRange';
import { FC } from 'react';

export interface UndefinedTypeDayProps extends Omit<DayProps, 'type'> {
  types: DayType[];
  disableWeekends?: boolean;
}

export const withDefinedDayType = (Component: FC<DayProps>) => {
  const Wrapper = ({ types, disableWeekends, date, ...rest }: UndefinedTypeDayProps) => {
    const { firstDayOfTheViewMonth, selectedDate, maxDate, minDate } = useApp();
    const { selectionStart, selectionEnd } = useRange();

    const dateObj = getUTCDatefromDateString(date);

    const dayWeekIndex = dateObj.getDay();
    const isDisabled = () => {
      if (disableWeekends && (dayWeekIndex === 0 || dayWeekIndex === 6)) {
        return true;
      }

      if (getDateParts(firstDayOfTheViewMonth).month !== getDateParts(date).month) {
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

      if (selectionStart === date) {
        return DayType.SELECTION_START;
      }
      if (selectionEnd === date) {
        return DayType.SELECTION_END;
      }

      if (selectedDate && selectedDate === date) {
        return DayType.SELECTED;
      }

      if (selectionStart && selectionEnd) {
        const start = getUTCDatefromDateString(selectionStart);
        const end = getUTCDatefromDateString(selectionEnd);
        if (dateObj > start && dateObj < end) {
          return DayType.SELECTION_IN_RANGE;
        }
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
