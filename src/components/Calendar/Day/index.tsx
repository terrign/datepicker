import { withDefinedDayType } from 'components/Calendar/Day/decorators/withDefinedDayType';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';
import { MouseEventHandler } from 'react';

import { StyledDay } from './Day.styled';
import { DayType } from './types';

export interface DayProps {
  type: DayType;
  date: string;
  dayClickHandler?: (date: string, type: DayType) => void;
  dayContextMenuHandler?: (date: string, x: number, y: number) => void;
}

export const BaseDay = ({ date, type, dayClickHandler, dayContextMenuHandler }: DayProps) => {
  const { dispatch } = useApp();

  const [, , day] = date.split('-').map((datePart) => Number(datePart));

  const clickHandler = () => {
    if (dayClickHandler) {
      dayClickHandler(date, type);
    }
    if (type !== DayType.DISABLED) {
      dispatch({ type: ActionType.SET_DATE, payload: new Date(date) });
    }
  };

  const contextMenuHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (dayContextMenuHandler && type !== DayType.DISABLED) {
      event.preventDefault();
      const { pageX, pageY } = event;
      dayContextMenuHandler(date, pageX, pageY);
    }
  };

  return (
    <StyledDay $type={type} onClick={clickHandler} onContextMenu={contextMenuHandler}>
      {day}
    </StyledDay>
  );
};

export const Day = withDefinedDayType(BaseDay);
