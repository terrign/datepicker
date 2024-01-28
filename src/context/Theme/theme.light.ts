import { Color } from '@constants';

import { ThemeObject } from './types';

export const lightTheme: ThemeObject = {
  bgColor: Color.WHITE,
  fontColor: Color.BLACK,
  hoverBgColor: Color.LIGHT_GRAY_2,

  disabledDayBgColor: Color.WHITE,
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
