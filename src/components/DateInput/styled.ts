import { flex, font } from '@css';
import styled, { css } from 'styled-components';

const noBottomBorder = css`
  border-bottom: none;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
`;

export const StyledDateInput = styled.div<{ $errorMessage?: string; $hideBottomBorder?: boolean }>`
  ${flex}
  position: relative;
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  padding: 8px 7px;
  min-height: 26px;
  border-radius: 8px;
  width: calc(100%-16px);
  ${({ $hideBottomBorder }) => $hideBottomBorder && noBottomBorder}

  input {
    ${font}
    font-weight: 500;
    position: relative;
    background-color: ${({ theme }) => theme.bgColor};
    border: none;
    outline: none;
    height: 16px;
    width: 100%;
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
  }
  &:has(:focus-visible)::after {
    content: ${({ $errorMessage }) => `'${$errorMessage}'`};
    position: absolute;
    top: 42px;
    left: 15px;
    color: red;
    font-size: 12px;
    font-weight: 300;
    height: 15px;
    width: 100%;
    z-index: 10;
  }
`;
