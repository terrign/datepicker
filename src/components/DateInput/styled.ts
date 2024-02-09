import { flex, font } from '@constants';
import styled from 'styled-components';

export const StyledDateInput = styled.div`
  ${flex}

  position: relative;
  padding: 8px 7px;
  max-height: 24px;

  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: ${({ theme }) => theme.borderRadius}px;

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
