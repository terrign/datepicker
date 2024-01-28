import { WeekStart } from '@types';
import { Dispatch } from 'react';

export enum ActionType {
  SELECT_START,
  SELECT_END,
  MONTH,
  YEAR,
}

export interface AppContextType {
  weekStart: WeekStart;
  selectionStart: Date | null;
  selectionEnd: Date | null;
  currentMonth: number;
  currentYear: number;
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

export interface NavAction {
  type: ActionType.MONTH | ActionType.YEAR;
  payload: 1 | -1;
}

export type Action = NavAction | SelectStartAction | SelectEndAction;

export type ReducerState = Omit<AppContextType, 'dispatch'>;

export interface AppReducerType {
  (state: ReducerState, action: Action): typeof state;
}
