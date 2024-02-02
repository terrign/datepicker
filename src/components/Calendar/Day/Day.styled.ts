import { defaultBlock, font } from '@css';
import { DayType } from 'components/Calendar/Day/types';
import styled, { css } from 'styled-components';

const defaultDay = css`
  background: none;
  color: ${({ theme }) => theme.fontColor};

  &:hover {
    background-color: ${({ theme }) => theme.hoverBgColor};
  }
`;

const disabledDay = css`
  background: none;
  color: ${({ theme }) => theme.disabledDayFontColor};
  cursor: default;
`;

const selectedDay = css`
  background-color: ${({ theme }) => theme.selectedDayBgColor};
  color: ${({ theme }) => theme.selectedDayFontColor};
`;

const selectionStartDay = css`
  background-color: ${({ theme }) => theme.selectionRangeStartDayBgColor};
  color: ${({ theme }) => theme.selectionRangeStartDayFontColor};
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
`;

const selectionEndDay = css`
  background-color: ${({ theme }) => theme.selectionRangeEndDayBgColor};
  color: ${({ theme }) => theme.selectionRangeEndDayFontColor};
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
`;

const selectionInRangeDay = css`
  background-color: ${({ theme }) => theme.selectionRangeDayBgColor};
  color: ${({ theme }) => theme.selectionRangeDayFontColor};
  border-radius: 0px;
  border: none;
`;

const holiday = css`
  ${defaultDay}

  border: 1px solid ${({ theme }) => theme.holidayBorderColor};
`;

const typeStyleMapper = (type: DayType) => {
  switch (type) {
    case DayType.SELECTED:
      return selectedDay;
    case DayType.DEFAULT:
      return defaultDay;
    case DayType.DISABLED:
      return disabledDay;
    case DayType.SELECTION_START:
      return selectionStartDay;
    case DayType.SELECTION_END:
      return selectionEndDay;
    case DayType.SELECTION_IN_RANGE:
      return selectionInRangeDay;
    case DayType.HOLIDAY:
      return holiday;
  }
};

export const StyledDay = styled.button<{ $type: DayType; $hidden?: boolean }>`
  ${defaultBlock}
  ${font}
  cursor: pointer;
  ${({ $type }) => typeStyleMapper($type)}
`;
