import { WeekStart } from '@types';
import { Dispatch } from 'react';

export enum ActionType {
  SELECT_START,
  SELECT_END,
  CHANGE_YEAR,
  CHANGE_MONTH,
}

export interface AppContextType {
  weekStart: WeekStart;
  selectionStart: Date | null;
  selectionEnd: Date | null;
  currentDate: Date;
  dispatch: Dispatch<Action>;
}

export interface SelectStartAction {
  type: ActionType.SELECT_START;
  payload: Date | null;
}

export interface SelectEndAction {
  type: ActionType.SELECT_END;
  payload: Date | null;
}

export interface ChangeYearAction {
  type: ActionType.CHANGE_YEAR;
  payload: number;
}
export interface ChangeMonthAction {
  type: ActionType.CHANGE_MONTH;
  payload: number;
}

export type Action = ChangeYearAction | ChangeMonthAction | SelectStartAction | SelectEndAction;

export type ReducerState = Omit<AppContextType, 'dispatch'>;

export interface AppReducerType {
  (state: ReducerState, action: Action): typeof state;
}
