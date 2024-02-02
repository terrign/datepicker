import { toStringDate } from '@utils';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';

import { StyledDay } from './Day.styled';
import { DayType } from './types';

export interface DayProps {
  types: DayType[];
  date: string;
  disableWeekends?: boolean;
  dayClickHandler?: (date: string, type: DayType) => void;
  dayContextMenuHandler?: (date: string, type: DayType) => void;
}

export const Day = ({ date, types, disableWeekends, dayClickHandler, dayContextMenuHandler }: DayProps) => {
  const { firstDayOfTheViewMonth, selectedDate, maxDate, minDate, dispatch } = useApp();
  const dateObj = new Date(date);
  dateObj.setHours(0);

  const day = dateObj.getDate();

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
      const maxDateObj = new Date(maxDate);
      disabled = dateObj > maxDateObj;
    }

    if (minDate && !disabled) {
      const minDateObj = new Date(minDate);
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

  const clickHandler = () => {
    if (dayClickHandler) {
      dayClickHandler(date, types[0]);
    }
    if (!isDisabled()) {
      dispatch({ type: ActionType.SET_DATE, payload: new Date(date) });
    }
  };

  const contextMenuHandler = () => {
    if (dayContextMenuHandler) {
      dayContextMenuHandler(date, types[0]);
    }
  };

  return (
    <StyledDay $type={defineType()} onClick={clickHandler} onContextMenu={contextMenuHandler}>
      {day}
    </StyledDay>
  );
};
