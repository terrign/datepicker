import { useApp } from 'context/App';
import { ActionType } from 'context/App/types';
import { withDefinedDayType } from 'decorators/Day/withDefinedDayType';
import { MouseEventHandler } from 'react';

import { StyledDay } from './styled';
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
      const { offsetLeft, offsetTop, offsetHeight, offsetWidth } = event.currentTarget as HTMLElement;

      dayContextMenuHandler(date, offsetLeft + offsetWidth, offsetTop + offsetHeight);
    }
  };

  return (
    <StyledDay $type={type} onClick={clickHandler} onContextMenu={contextMenuHandler}>
      {day}
    </StyledDay>
  );
};

export const Day = withDefinedDayType(BaseDay);
