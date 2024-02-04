import { WeekStart } from '@types';
import { CalendarConfig } from 'components/Calendar';
import { PredefinedTheme, ThemeObject } from 'context/Theme/types';
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
  onDateSelect?: (date: string) => void;
  /**
   * Callback to run on date input error;
   */
  onError?: (error: Error) => void;
  /**
   * Default selected date in yyyy-mm-dd format
   */
  defaultSelectedDate?: string;
  /**
   * Custom colors provided as ThemeObject
   */
  customStyles?: Partial<ThemeObject>;
  /**
   * Maximum date available for selection in yyyy-mm-dd format
   */
  maxDate?: string;
  /**
   * Minimum date available for selection in yyyy-mm-dd format
   */
  minDate?: string;
  calendarConfig?: CalendarConfig;
  locale?: string;
  to?: boolean;
}

export type DatePickerInputProps = DatePickerProps &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onError'>;
