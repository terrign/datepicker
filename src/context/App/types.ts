import { WeekStart } from '@types';
import { Dispatch, RefObject } from 'react';

export enum ActionType {
  SET_DATE,
  CHANGE_YEAR,
  CHANGE_MONTH,
  SET_VIEW_DATE,
  HIDE_SHOW_CALENDAR,
  SET_CALENDAR_REF,
}

export interface AppContextType {
  weekStart: WeekStart;
  disableWeekends: boolean;
  selectedDate: string | null;
  firstDayOfTheViewMonth: string;
  calendarVisible: boolean;
  minDate?: string;
  maxDate?: string;
  onError?: (error: Error) => void;
  calendarContainerRef?: RefObject<HTMLDivElement>;
  from?: boolean;
  to?: boolean;
  dispatch: Dispatch<Action>;
}

export type SetDateAction = {
  type: ActionType.SET_DATE;
  payload: string | null;
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
  payload: string;
};
export type SetCalendarRef = {
  type: ActionType.SET_CALENDAR_REF;
  payload: RefObject<HTMLDivElement>;
};

export type Action =
  | ChangeYearAction
  | ChangeMonthAction
  | SetDateAction
  | HideShowCalendarAction
  | ChangeViewDateAction
  | SetCalendarRef;

export type ReducerState = Omit<AppContextType, 'dispatch'>;

export interface AppReducerType {
  (state: ReducerState, action: Action): typeof state;
}
