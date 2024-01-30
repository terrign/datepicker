import { css } from 'styled-components';

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
`;

export const font = css`
  font-family: Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.fontColor};
  font-size: 14px;
  font-weight: 600;
`;

export const flex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
