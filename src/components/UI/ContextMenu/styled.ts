import { flex, font } from '@constants';
import styled from 'styled-components';

interface Props {
  $x: number;
  $y: number;
}

export const StyledContextMenu = styled.div<Props>`
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  ${flex}

  gap: 5px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  flex-direction: column;
  background: ${({ theme }) => theme.modalBg};
  z-index: 201;

  button {
    ${font}
    border: none;
    outline: none;
    padding: 5px;
    background: ${({ theme }) => theme.modalBg};
    color: ${({ theme }) => theme.modalButtonColor};
    white-space: nowrap;

    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.modalButtonHoverBgColor};
      color: ${({ theme }) => theme.modalButtonHoverColor};
    }
  }
`;
