import { Button } from '@components/UI/Button';
import { flex, font } from '@constants';
import styled from 'styled-components';

export const StyledCalendarModal = styled.section`
  ${font}
  ${flex}

  background: ${({ theme }) => theme.bgColor};
  border-radius: ${({ theme }) => theme.borderRadius}px;

  position: absolute;
  max-width: 400px;
  width: 100%;
  height: 100%;
  max-height: 320px;
  left: 0;
  top: 0;
  flex-direction: column;
  z-index: 202;
`;

export const CalendarModalCloseButton = styled(Button)`
  ${font}
  ${flex}

  position: absolute;
  background-color: transparent;
  top: 10px;
  left: calc(100% - 42px);
  outline: none;
  font-size: ${({ theme }) => theme.fontS}px;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
`;
