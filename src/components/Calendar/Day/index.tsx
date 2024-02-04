import { withDefinedDayType } from 'components/Calendar/Day/decorators/withDefinedDayType';
import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';
import { MouseEventHandler } from 'react';

import { StyledDay } from './Day.styled';
import { DayType } from './types';

export interface DayProps {
  type: DayType;
  date: string;
  onDateSelect?: (date: string) => void;
  dayContextMenuHandler?: (date: string, x: number, y: number) => void;
}

export const BaseDay = ({ date, type, onDateSelect, dayContextMenuHandler }: DayProps) => {
  const [, , day] = date.split('-').map((datePart) => Number(datePart));
  const { dispatch, onError } = useApp();

  const clickHandler = () => {
    try {
      if (onDateSelect && type !== DayType.DISABLED) {
        onDateSelect(date);
        dispatch({ type: ActionType.SET_DATE, payload: date });
      }
    } catch (error) {
      if (error instanceof Error && onError) {
        onError(error);
      }
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
