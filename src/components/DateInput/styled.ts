import { apperAnimation, Color, DEFAULT_FONT_SIZE, flex, font } from '@constants';
import styled from 'styled-components';

export const StyledDateInput = styled.div<{ $errorMessage: string }>`
  ${flex}

  position: relative;
  padding: 8px 7px;
  max-height: 24px;
  transition: border 0.3s ease;

  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme, $errorMessage }) => (Boolean($errorMessage) ? Color.RED : theme.borderColor)};
  border-radius: ${({ theme }) => theme.borderRadius}px;

  &::after {
    ${font}
    ${apperAnimation}

    ${({ $errorMessage }) => `content: '${$errorMessage}'`};
    ${({ $errorMessage }) => Boolean($errorMessage) && 'padding: 5px'};

    border-radius: ${({ theme }) => theme.borderRadius}px;
    background-color: ${({ theme }) => theme.bgColor};
    display: ${({ $errorMessage }) => (Boolean($errorMessage) ? 'block' : 'none')};

    border: 1px solid ${Color.RED};
    font-size: ${DEFAULT_FONT_SIZE};
    font-weight: 500;
    position: absolute;
    box-sizing: border-box;
    left: 15px;
    max-width: calc(100% - 30px);
    top: 32px;
    color: ${Color.RED};
    z-index: 203;
  }

  input {
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
  }
`;
