type DatePickerType = 'range' | 'date';

enum Day {
  MONDAY = 'Mo',
  TUESDAY = 'Tu',
  WEDNESDAY = 'We',
  THURSDAY = 'Th',
  FRIDAY = 'Fr',
  SATURDAY = 'Sa',
  SUNDAY = 'Su',
}

export enum WeekStart {
  SUNDAY = 'Sunday',
  MONDAY = 'Monday',
}

interface HolidaysConfig {
  weekEnds: Day[];
  holidays: Date | string[];
}

type DatePickerTheme = 'light' | 'dark';

type DatePickerCustomStyle = Record<string, string>;

export interface BaseDatePickerConfig {
  type?: DatePickerType;
  maxDate?: Date | string;
  minDate?: Date | string;
  theme?: DatePickerTheme;
  style?: DatePickerCustomStyle;
  weekStart?: Day.MONDAY | Day.SUNDAY;
  dateFormat?: 'yyyy-mm-dd' | 'mm/dd/yyyy';
  onSelect?: () => void;
  holidays: HolidaysConfig;
}
