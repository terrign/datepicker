import { font } from '@constants';
import styled from 'styled-components';

export const Container = styled.section<{ $hidden: boolean }>`
  ${font}

  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 8px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  width: 100%;
  max-width: 250px;
  display: ${({ $hidden }) => ($hidden ? 'none' : 'flex')};
  position: absolute;
  box-sizing: border-box;
  top: 48px;
  left: 0px;
  z-index: 200;
`;
