export type PredefinedTheme = 'light' | 'dark';

export interface ThemeObject {
  bgColor: string;
  fontColor: string;
  borderColor: string;
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

  modalButtonColor: string;
  modalButtonHoverBgColor: string;
  modalButtonHoverColor: string;
  modalBg: string;
}
