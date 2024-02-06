import { css } from 'styled-components';

export enum Color {
  WHITE = '#FFFFFF',
  BLACK = '#333333',
  RED = '#c92b2b',
  LIGHT_GRAY_1 = '#AAAAAA',
  LIGHT_GRAY_2 = '#F1F1F1',
  LIGHT_GRAY_3 = '#656565',
  LIGHT_GRAY_4 = '#DDDDDD',

  BLUE = '#2F80ED',
  PALE_BLUE_1 = '#2F80ED99',
  PALE_BLUE_2 = '#2F80ED1A',
}

export const defaultBlock = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  border: none;
  outline: none;
  height: 32px;
  width: 32px;
  box-sizing: border-box;
  user-select: none;
  transition: background 0.1s ease-in-out;
`;

export const font = css`
  font-family: 'Open Sans', Helvetica, sans-serif;
  color: ${({ theme }) => theme.fontColor};
  font-size: 14px;
  font-weight: 600;
`;

export const flex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
