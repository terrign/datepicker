import { font } from '@constants';
import styled from 'styled-components';

export const MonthYear = styled.p`
  max-width: 110px;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  margin-top: 2px;

  button {
    ${font}

    background: none;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    display: inline-block;

    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.selectedDayBgColor};
    }
  }
`;

export const PickerGrid = styled.section<{ $cols: number }>`
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);

  display: grid;
  align-items: center;
  max-height: 220px;
  margin: 0 auto;
  height: 100%;
  padding: 10px;
`;

export const DatePartSelectButton = styled.button`
  ${font}

  border: none;
  outline: none;
  padding: 5px;
  cursor: pointer;
  background: none;
  border-radius: 8px;

  &:hover {
    background: ${({ theme }) => theme.hoverBgColor};
    color: ${({ theme }) => theme.hoverTextColor};
  }

  &:disabled {
    background: ${({ theme }) => theme.selectedDayBgColor};
    color: ${({ theme }) => theme.selectedDayFontColor};
  }
`;
