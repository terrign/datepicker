import { Color } from '@constants';

import { ThemeObject } from './types';

const defaultTheme: ThemeObject = {
  bgColor: Color.WHITE,
  fontColor: Color.BLACK,
  hoverBgColor: Color.LIGHT_GRAY_2,
  borderColor: Color.LIGHT_GRAY_4,

  disabledDayFontColor: Color.LIGHT_GRAY_1,

  selectedDayBgColor: Color.BLUE,
  selectedDayFontColor: Color.WHITE,

  selectionRangeDayBgColor: Color.PALE_BLUE_2,
  selectionRangeDayFontColor: Color.BLUE,

  selectionRangeStartDayBgColor: Color.PALE_BLUE_1,
  selectionRangeStartDayFontColor: Color.WHITE,

  selectionRangeEndDayBgColor: Color.BLUE,
  selectionRangeEndDayFontColor: Color.WHITE,
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
};
