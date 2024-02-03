import { flex, font } from '@css';
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
  border-radius: 8px;
  gap: 5px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  flex-direction: column;
  background: ${({ theme }) => theme.modalBg};

  button {
    ${font}
    border: none;
    outline: none;
    padding: 5px;
    background: ${({ theme }) => theme.modalBg};
    color: ${({ theme }) => theme.modalButtonColor};

    &:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.modalButtonHoverBgColor};
      color: ${({ theme }) => theme.modalButtonHoverColor};
    }
  }
`;
