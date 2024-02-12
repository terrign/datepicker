import { DateStringOrNull, WeekStart } from '@types';
import { Dispatch, RefObject } from 'react';

export enum ActionType {
  SET_DATE,
  CHANGE_YEAR,
  CHANGE_MONTH,
  SET_VIEW_DATE,
  HIDE_SHOW_CALENDAR,
  SET_CALENDAR_REF,
  SET_VALIDATION_ERROR,
}

export interface AppContextType {
  weekStart: WeekStart;
  disableWeekends: boolean;
  selectedDate: DateStringOrNull;
  firstDayOfTheViewMonth: string;
  calendarVisible: boolean;
  minDate?: DateStringOrNull;
  maxDate?: DateStringOrNull;
  onError?: (error: Error) => void;
  calendarContainerRef?: RefObject<HTMLDivElement>;
  from?: boolean;
  to?: boolean;
  validationError: string | null;
  dispatch: Dispatch<Action>;
  getDateChangeHandler: GetDatePartChangeHandlerType;
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

export type SetError = {
  type: ActionType.SET_VALIDATION_ERROR;
  payload: string | null;
};

export type Action =
  | ChangeYearAction
  | ChangeMonthAction
  | SetDateAction
  | HideShowCalendarAction
  | ChangeViewDateAction
  | SetCalendarRef
  | SetError;

export type ReducerState = Omit<AppContextType, 'dispatch'>;

export interface AppReducerType {
  (state: ReducerState, action: Action): typeof state;
}

export type GetDatePartChangeHandlerType = (
  datePart: Extract<ActionType, ActionType.CHANGE_MONTH | ActionType.CHANGE_YEAR>,
  changeAmount: 1 | -1,
) => () => void;
