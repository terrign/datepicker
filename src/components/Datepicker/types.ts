import { DateStringOrNull, PredefinedTheme, ThemeObject, WeekStart } from '@types';
import { CalendarConfig } from 'components/Calendar';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface DatePickerProps {
  /**
   * First day of the week
   */
  weekStart?: WeekStart;
  /**
   * Predefined color scheme
   */
  theme?: PredefinedTheme;
  /**
   * Callback to run on date selection, selected date in yyyy-mm-dd is provided as first argument
   */
  onDateSelect?: (date: DateStringOrNull) => void;
  /**
   * Default selected date in yyyy-mm-dd format
   */
  defaultSelectedDate?: DateStringOrNull;
  /**
   * Custom colors provided as ThemeObject
   */
  customStyles?: Partial<ThemeObject>;
  /**
   * Maximum date available for selection in yyyy-mm-dd format
   */
  maxDate?: DateStringOrNull;
  /**
   * Minimum date available for selection in yyyy-mm-dd format
   */
  minDate?: DateStringOrNull;
  calendarConfig?: CalendarConfig;
}

export type DatePickerInputProps = DatePickerProps &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onError'>;
