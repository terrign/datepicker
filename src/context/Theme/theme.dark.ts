import { Color } from '@constants';

import { ThemeObject } from './types';

export const darkTheme: ThemeObject = {
  bgColor: Color.BLACK,
  fontColor: Color.WHITE,
  hoverBgColor: Color.LIGHT_GRAY_2,

  disabledDayBgColor: Color.BLACK,
  disabledDayFontColor: Color.LIGHT_GRAY_1,

  selectedDayBgColor: Color.BLUE,
  selectedDayFontColor: Color.WHITE,

  selectionRangeDayBgColor: Color.PALE_BLUE_2,
  selectionRangeDayFontColor: Color.BLUE,

  selectionRangeStartDayBgColor: Color.PALE_BLUE_1,
  selectionRangeStartDayFontColor: Color.BLACK,

  selectionRangeEndDayBgColor: Color.BLUE,
  selectionRangeEndDayFontColor: Color.WHITE,
};
