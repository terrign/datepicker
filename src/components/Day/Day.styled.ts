import { defaultBlock, font } from '@css';
import styled from 'styled-components';

const Day = styled.div`
  ${defaultBlock}
  ${font}
  cursor: pointer;
`;

export const DefaultDay = styled(Day)`
  background-color: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};

  &:hover {
    background-color: ${({ theme }) => theme.hoverBgColor};
  }
`;

export const DisabledDay = styled(Day)`
  color: ${({ theme }) => theme.disabledDayFontColor};
  cursor: default;
`;

export const SelectedDay = styled(Day)`
  background-color: ${({ theme }) => theme.selectedDayBgColor};
  color: ${({ theme }) => theme.selectedDayFontColor};
`;

export const SelectionStartDay = styled(Day)`
  background-color: ${({ theme }) => theme.selectionRangeStartDayBgColor};
  color: ${({ theme }) => theme.selectionRangeStartDayFontColor};
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
`;

export const SelectionEndDay = styled(Day)`
  background-color: ${({ theme }) => theme.selectionRangeEndDayBgColor};
  color: ${({ theme }) => theme.selectionRangeEndDayFontColor};
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
`;

export const SelectionInRangeDay = styled(Day)`
  background-color: ${({ theme }) => theme.selectionRangeDayBgColor};
  color: ${({ theme }) => theme.selectionRangeDayFontColor};
  border-radius: 0px;
  border: none;
`;
