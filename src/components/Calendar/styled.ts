import { DEFAULT_PADDING, font } from '@constants';
import styled from 'styled-components';

export const Container = styled.section<{ $hidden: boolean }>`
  ${font}

  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 6px;
  padding: ${DEFAULT_PADDING}px;
  width: 100%;
  max-width: 250px;
  position: absolute;
  box-sizing: border-box;
  top: 48px;
  left: 0px;
  z-index: 200;

  border-radius: ${({ theme }) => theme.borderRadius}px;
  background-color: ${({ theme }) => theme.bgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  display: ${({ $hidden }) => ($hidden ? 'none' : 'flex')};
`;
