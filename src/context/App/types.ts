import { WeekStart } from '@types';
import { Dispatch } from 'react';

export enum ActionType {
  SET_DATE,
  CHANGE_YEAR,
  CHANGE_MONTH,
  SET_VIEW_DATE,
  HIDE_SHOW_CALENDAR,
}

export interface AppContextType {
  weekStart: WeekStart;
  selectedDate: Date | null;
  firstDayOfTheViewMonth: Date;
  calendarVisible: boolean;
  minDate?: string;
  maxDate?: string;
  // clientOnSelectHandler?: (date: string) => void;
  dispatch: Dispatch<Action>;
}

export type SetDateAction = {
  type: ActionType.SET_DATE;
  payload: Date | null;
};

export type ChangeYearAction = {
  type: ActionType.CHANGE_YEAR;
  payload: number;
};
export type ChangeMonthAction = {
  type: ActionType.CHANGE_MONTH;
  payload: number;
};

export type HideShowCalendarAction = {
  type: ActionType.HIDE_SHOW_CALENDAR;
  payload: boolean;
};

export type ChangeViewDateAction = {
  type: ActionType.SET_VIEW_DATE;
  payload: Date;
};

export type Action =
  | ChangeYearAction
  | ChangeMonthAction
  | SetDateAction
  | HideShowCalendarAction
  | ChangeViewDateAction;

export type ReducerState = Omit<AppContextType, 'dispatch'>;

export interface AppReducerType {
  (state: ReducerState, action: Action): typeof state;
}
