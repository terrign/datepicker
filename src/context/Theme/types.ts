export enum PredefinedTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface ThemeObject {
  bgColor: string;
  fontColor: string;

  disabledDayBgColor: string;
  disabledDayFontColor: string;

  selectedDayBgColor: string;
  selectedDayFontColor: string;

  selectionRangeDayBgColor: string;
  selectionRangeDayFontColor: string;

  selectionRangeStartDayBgColor: string;
  selectionRangeStartDayFontColor: string;

  selectionRangeEndDayBgColor: string;
  selectionRangeEndDayFontColor: string;

  hoverBgColor?: string;
  hoverTextColor?: string;
}

export type Theme = ThemeObject | PredefinedTheme;
