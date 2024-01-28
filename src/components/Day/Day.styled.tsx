import styled from 'styled-components';

const Day = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 700;
  padding: 10px;
  border-radius: 8px;
  border: none;
  height: 32px;
  width: 32px;
  box-sizing: border-box;
  user-select: none;
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
  cursor: pointer;
`;

export const SelectionEndDay = styled(Day)`
  background-color: ${({ theme }) => theme.selectionRangeEndDayBgColor};
  color: ${({ theme }) => theme.selectionRangeEndDayFontColor};
  border-bottom-left-radius: 0px;
  border-top-left-radius: 0px;
  cursor: pointer;
`;

export const SelectionInRangeDay = styled(Day)`
  background-color: ${({ theme }) => theme.selectionRangeDayBgColor};
  color: ${({ theme }) => theme.selectionRangeDayFontColor};
  border-radius: 0px;
  border: none;
  cursor: pointer;
`;
