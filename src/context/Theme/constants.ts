import { Color } from '@constants';
import { ThemeObject } from '@types';

const defaultTheme: ThemeObject = {
  bgColor: Color.WHITE,
  fontColor: Color.BLACK,
  hoverBgColor: Color.LIGHT_GRAY_2,
  borderColor: Color.LIGHT_GRAY_4,
  borderRadius: 8,
  holidayBorderColor: Color.RED,

  disabledDayFontColor: Color.LIGHT_GRAY_1,

  selectedDayBgColor: Color.BLUE,
  selectedDayFontColor: Color.WHITE,

  selectionRangeDayBgColor: Color.PALE_BLUE_2,
  selectionRangeDayFontColor: Color.BLUE,

  selectionRangeStartDayBgColor: Color.PALE_BLUE_1,
  selectionRangeStartDayFontColor: Color.WHITE,

  selectionRangeEndDayBgColor: Color.BLUE,
  selectionRangeEndDayFontColor: Color.WHITE,

  contextMenuButtonColor: Color.BLACK,
  contextMenuButtonHoverBgColor: Color.BLUE,
  contextMenuButtonHoverColor: Color.WHITE,
  contextMenuBg: Color.WHITE,

  fontS: 5,
  fontM: 14,
  fontL: 20,

  defaultPadding: 10,
};

export const lightTheme: ThemeObject = {
  ...defaultTheme,
};

export const darkTheme: ThemeObject = {
  ...defaultTheme,
  bgColor: Color.BLACK,
  fontColor: Color.WHITE,
  hoverBgColor: Color.LIGHT_GRAY_1,
  borderColor: Color.LIGHT_GRAY_3,

  contextMenuButtonColor: Color.WHITE,
  contextMenuBg: Color.BLACK,
};
