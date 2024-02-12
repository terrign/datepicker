import { css } from 'styled-components';

export enum Color {
  WHITE = '#FFFFFF',
  BLACK = '#333333',
  RED = '#ff0000',
  LIGHT_GRAY_1 = '#AAAAAA',
  LIGHT_GRAY_2 = '#F1F1F1',
  LIGHT_GRAY_3 = '#656565',
  LIGHT_GRAY_4 = '#DDDDDD',

  BLUE = '#2F80ED',
  PALE_BLUE_1 = '#2F80ED99',
  PALE_BLUE_2 = '#2F80ED1A',
}

export const defaultBlock = css`
  border-radius: ${({ theme }) => theme.borderRadius}px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border: none;
  outline: none;
  height: 32px;
  width: 32px;
  box-sizing: border-box;
  user-select: none;
`;

export const font = css`
  color: ${({ theme }) => theme.fontColor};
  font-size: ${({ theme }) => theme.fontM}px;

  font-family: 'Open Sans', Helvetica, sans-serif;
  font-weight: 600;
`;

export const flex = css`
  display: flex;

  align-items: center;
`;

export const border = css`
  border: 1px solid ${({ theme }) => theme.borderColor};
`;

export const input = css`
  ${font}

  font-weight: 500;
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  border: none;
  outline: none;
  height: 16px;
  display: inline-block;
  -moz-appearance: textfield;
  appearance: textfield;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const appearAnimation = css`
  animation: 0.1s ease-in-out 0s 1 alternate appear;

  @keyframes appear {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
`;
