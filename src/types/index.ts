export type WeekStart = 'Sunday' | 'Monday';

export type PredefinedTheme = 'light' | 'dark';

export const enum DatePart {
  MONTH,
  YEAR,
  DAY,
}

export interface Todo {
  date: string;
  title: string;
  desc: string;
  id: string;
}

export interface ThemeObject {
  bgColor: string;
  fontColor: string;
  borderColor: string;
  borderRadius: number;
  hoverBgColor: string;
  hoverTextColor?: string;
  holidayBorderColor: string;

  disabledDayFontColor: string;

  selectedDayBgColor: string;
  selectedDayFontColor: string;

  selectionRangeDayBgColor: string;
  selectionRangeDayFontColor: string;

  selectionRangeStartDayBgColor: string;
  selectionRangeStartDayFontColor: string;

  selectionRangeEndDayBgColor: string;
  selectionRangeEndDayFontColor: string;

  contextMenuButtonColor: string;
  contextMenuButtonHoverBgColor: string;
  contextMenuButtonHoverColor: string;
  contextMenuBg: string;

  fontS: number;
  fontM: number;
  fontL: number;

  defaultPadding: number;
}

export type DateString = string;

export type DateStringOrNull = string | null;
